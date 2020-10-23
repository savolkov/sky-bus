import * as express from 'express';
import * as moment from 'moment';

import {
  interfaces,
  controller,
  request,
  response,
  httpPost,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Bus, BUS_SYMBOLS } from '@node-ts/bus-core';
import { config } from 'dotenv';
import { Connection, getConnection } from 'typeorm';
import { GatewayPassEvent } from '../../repositories/entities/GatewayPassEvent';

config();

@controller('/sigur')
export class SigurCommandController implements interfaces.Controller {
  private connection: Connection;

  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
  ) {
    this.connection = getConnection();
  }

  @httpPost('/work-duration')
  private async workDuration(@request() req: express.Request, @response() res: express.Response) {
    const {
      from,
      to = moment().unix(),
      cardId,
    } = req.body;

    const errors = [];

    if (!from) {
      errors.push('from.notFound');
    }
    if (!cardId) {
      errors.push('cardId.notFound');
    }

    if (errors.length !== 0) {
      res.status(400).send({ errors });
      return;
    }

    const repos = this.connection.getRepository(GatewayPassEvent);

    const events = await repos
      .createQueryBuilder('gateway_pass_event')
      .orderBy('gateway_pass_event.timestamp', 'ASC')
      .where('timestamp < :to', { to })
      .andWhere('timestamp > :from', { from })
      .andWhere('s_card_id = :cardId', { cardId })
      .andWhere('is_passed = true')
      .getMany();

    let timeIn = 0;
    let isPersoneIn = false;
    let timestampIn = -1;

    for (let i = 0; i < events.length; i++) {
      if (!isPersoneIn && events[i].isIngoingDirection) {
        timestampIn = events[i].timestamp;
        isPersoneIn = true;
      }

      if (isPersoneIn && !events[i].isIngoingDirection) {
        timeIn += events[i].timestamp - timestampIn;
        isPersoneIn = false;
      }
    }

    // if persone still inside
    if (isPersoneIn) {
      timeIn += moment().unix() - timestampIn;
    }

    res.status(200).send({ timeIn });
  }

  @httpPost('/is-persone-inside')
  private async isPersoneInside(
  @request() req: express.Request,
    @response() res: express.Response,
  ) {
    const { cardId } = req.body;

    if (!cardId) {
      res.status(400).send({ errors: ['cardId.notFound'] });
      return;
    }

    const repos = this.connection.getRepository(GatewayPassEvent);

    const event = await repos
      .createQueryBuilder('gateway_pass_event')
      .orderBy('gateway_pass_event.timestamp', 'DESC')
      .andWhere('s_card_id = :cardId', { cardId })
      .andWhere('is_passed = true')
      .getOne();

    if (event && event.isIngoingDirection) {
      res.status(200).send({ isPersoneInside: true });
    } else {
      res.status(200).send({ isPersoneInside: false });
    }
  }

  @httpPost('/open-door/:uuidGateway')
  private async openDoor(@request() req: express.Request, @response() res: express.Response) {
    // const { uuidGateway } = req.params;

    // TODO:

    // try {
    //   const camera = await this.devlineAdapter.getCameraInfo(uuid);
    //   res.status(200).send(camera);
    // } catch (ex) {
    //   console.log(ex);
    res.sendStatus(500);
    // }
  }
}
