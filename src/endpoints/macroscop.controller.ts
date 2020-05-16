import * as express from 'express';
import {
  interfaces,
  controller,
  httpGet,
  httpPost,
  request,
  response,
} from "inversify-express-utils";
import { inject } from "inversify";
import { Logger, LOGGER_SYMBOLS } from '@node-ts/logger-core';
import { Bus, BUS_SYMBOLS } from '@node-ts/bus-core';
import { MacroscopWarningRecieved } from '../messages';

@controller("/macroscop")
export class MacroscopController implements interfaces.Controller {

  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus
  ) {
  }

  @httpPost("/")
  private async create(@request() req: express.Request, @response() res: express.Response) {
    this.bus.publish(new MacroscopWarningRecieved('achtung')).then(
      () => res.sendStatus(204)
    )
    .catch(() => res.sendStatus(500));

  }
}
