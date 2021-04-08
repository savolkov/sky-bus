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
import { IridiumDeviceConnectionChanged } from '../../messages/iridium/iridiumDeviceConnectionChanged.event';

@controller('/iridium')
export class IridiumEventsController implements interfaces.Controller {
  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
  ) {
  }

  @httpPost('/device-connection-changed')
  private async postDeviceConnectionChanged(
  @request() req: express.Request,
    @response() res: express.Response,
  ) {
    const iridiumDeviceConnectionChanged = new IridiumDeviceConnectionChanged(req.body.deviceUuid,
      req.body.deviceName, req.body.connected);

    this.bus.publish(iridiumDeviceConnectionChanged);
    res.sendStatus(200);
  }
}
