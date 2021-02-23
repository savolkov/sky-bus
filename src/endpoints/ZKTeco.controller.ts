import * as express from 'express';
import {
  controller, httpPost, interfaces, request, response,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Bus, BUS_SYMBOLS } from '@node-ts/bus-core';
import ZKTecoMessageReceived from '../messages/ZKTeco/ZKTeco-message-received.event';
import { ZKTEvent } from '../types/ZKTeco/ZKTEvent';
import { ZKTEventType } from '../types/ZKTeco/ZKTEventType';

@controller('/ZKT')
export default class ZKTecoController implements interfaces.Controller {
  constructor(@inject(BUS_SYMBOLS.Bus) private readonly bus: Bus) {
  }

  @httpPost('/added-employee')
  private async create(@request() req: express.Request, @response() res: express.Response) {
    const event: ZKTEvent = { eventType: ZKTEventType.EmployeeAdded, subject: req.body };
    this.bus.publish(new ZKTecoMessageReceived(event))
      .then(() => res.sendStatus(204))
      .catch(() => res.sendStatus(500));
  }
}
