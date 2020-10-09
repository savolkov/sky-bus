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
import {
  SigurGatewayPassed,
  SigurGatewayAccessDenied,
} from '../../messages/sigur';
import { SigurGatewayEvent } from '../../types/sigur';

@controller('/sigur')
export class SigurController implements interfaces.Controller {
  constructor(@inject(BUS_SYMBOLS.Bus) private readonly bus: Bus) {}

  @httpPost('/event')
  private async event(
  @request() req: express.Request,
    @response() res: express.Response,
  ) {
    const events = req.body.d;
    for (let i = 0; i < events.length; i++) { // eslint-disable-line no-plusplus
      const gatewayEvent: SigurGatewayEvent = {
        passIndex: events[i].i,
        isGatewayPassed: events[i].type === 1,
        gatewayId: events[i].ap,
        uuidPersone: req.body.e,
        timestamp: events[i].t,
        isIngoingDirection: events[i].d !== 1,
        passCardId: events[i].keyHex,
      };

      if (gatewayEvent.isGatewayPassed) {
        this.bus.publish(new SigurGatewayPassed(gatewayEvent));
      } else {
        this.bus.publish(new SigurGatewayAccessDenied(gatewayEvent));
      }
    }

    const lastIndex = events[events.length - 1].i;

    res.status(200).send({ i: lastIndex });
  }
}
