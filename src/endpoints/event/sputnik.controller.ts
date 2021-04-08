import * as express from 'express';
import {
  interfaces,
  controller,
  request,
  response,
  httpPost,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Bus, BUS_SYMBOLS } from '@node-ts/bus-core';
import { SputnikIntercomCallReceived } from '../../messages/sputnik/intercomCallReceived.event';

@controller('/sputnik')
export class SputnikEventsController implements interfaces.Controller {
  constructor(@inject(BUS_SYMBOLS.Bus) private readonly bus: Bus) { }

  @httpPost('/intercom-call')
  private async intercomCall(
  @request() req: express.Request,
    @response() res: express.Response,
  ) {
    const intercomCallReceived = new SputnikIntercomCallReceived(req.body.deviceUuid,
      req.body.timestamp, req.body.flatId);

    this.bus.publish(intercomCallReceived);
    res.status(200).send({ message: 'all good!' });
  }
}
