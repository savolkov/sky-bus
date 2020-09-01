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
import { SassinChangeLineState } from '../messages';
import { SassinChangeLineStateCommand } from '../types/sassin/changeLineStateCommand';

@controller('/sassin')
export class SassinController implements interfaces.Controller {
  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
  ) {
  }

  @httpPost('/change-line-state')
  private async changeLineState(
  @request() req: express.Request,
    @response() res: express.Response,
  ) {
    const sassinChangeLineStateCommand: SassinChangeLineStateCommand = {
      deviceUuid: req.body.uuidDevice,
      lineNumber: req.body.lineNumber,
      state: req.body.state,
      timestamp: new Date(),
    };
    try {
      await this.bus.send(new SassinChangeLineState(sassinChangeLineStateCommand));
      res.sendStatus(204);
    } catch (ex) {
      console.log(ex);
      res.sendStatus(500);
    }
  }
}
