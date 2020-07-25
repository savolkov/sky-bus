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
import { MacroscopWarningRecieved } from '../messages';
import { MacroscopWarning } from '../types/macroscopWarning';

@controller('/macroscop')
export class MacroscopController implements interfaces.Controller {
  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
  ) {
  }

  @httpPost('/')
  private async create(@request() req: express.Request, @response() res: express.Response) {
    const registeredMacroscopEvent: MacroscopWarning = { ...req.body, timestamp: new Date() };
    this.bus.publish(new MacroscopWarningRecieved(registeredMacroscopEvent)).then(
      () => res.sendStatus(204),
    )
      .catch(() => res.sendStatus(500));
  }
}
