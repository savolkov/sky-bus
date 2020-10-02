import * as express from 'express';
import {
  interfaces,
  controller,
  httpPost,
  request,
  response,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Bus, BUS_SYMBOLS } from '@node-ts/bus-core';
import { SputnikOpenDoor } from '../../messages';
import { SputnikOpenDoorCommand } from '../../types/sputnik/openDoorCommand';

@controller('/sputnik')
export class SputnikController implements interfaces.Controller {
  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
  ) {
  }

  @httpPost('/open')
  private async open(@request() req: express.Request, @response() res: express.Response) {
    const sputnikOpenDoorCommand: SputnikOpenDoorCommand = {
      deviceUuid: req.body.uuid,
      token: 'da118336.eyJhbGciOiJIUzI1NiJ9.eyJlbnRpdHlfdXVpZCI6IjExNTciLCJlbnRpdHlfdHlwZSI6InVzZXIiLCJlbnRpdHlfcmVmX3V1aWQiOiI4ZmFkZGM5YS05OWJiLTQ2MDgtYjlkYy01YzA1MzcxYzgzYzkiLCJlbnRpdHlfbmFtZSI6bnVsbCwic2FsdCI6ImRhMTE4MzM2In0.RPzC5O1oIj6lI9Wzb4jJVY_TE0NvT0g24cDf1vmq-2Q', // eslint-disable-line max-len
      timestamp: new Date(),
    };
    try {
      await this.bus.send(new SputnikOpenDoor(sputnikOpenDoorCommand));
      res.sendStatus(204);
    } catch (ex) {
      console.log(ex);
      res.sendStatus(500);
    }
  }

  // Inform people with audio file in selected time
  @httpPost('/inform')
  private async inform(@request() req: express.Request, @response() res: express.Response) {
    // const {
    // uuid, dateFrom, dateEnd, audioFileUrl,
    // } = req.body;

    // const sputnikPollCommand: SputnikPollCommand = {
    //   deviceUuid: uuid,
    //   dateFrom,
    //   dateEnd,
    //   audioFileUrl,
    // timestamp: new Date(),
    // };
    try {
      // await this.bus.send(new SputnikSetPoll(sputnikPollCommand));
      res.send('not_implemented');
      res.sendStatus(404);
    } catch (ex) {
      console.log(ex);
      res.sendStatus(500);
    }
  }

  // TODO:
  // Poll people in selected time
  @httpPost('/inform')
  private async poll(@request() req: express.Request, @response() res: express.Response) {
    // const {
    // uuid, dateStart, dateEnd, audioFileUrl,
    // } = req.body;

    // const sputnikPollCommand: SputnikPollCommand = {
    //   deviceUuid: uuid,
    //   dateStart,
    //   dateEnd,
    //   audioFileUrl,
    //   timestamp: new Date(),
    // };
    try {
      // await this.bus.send(new SputnikSetPoll(sputnikPollCommand));
      res.send('not_implemented');
      res.sendStatus(404);
    } catch (ex) {
      console.log(ex);
      res.sendStatus(500);
    }
  }
}
