import * as express from 'express';
import {
  interfaces,
  controller,
  httpGet,
  httpPost,
  request,
  response,
  requestParam,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Bus, BUS_SYMBOLS } from '@node-ts/bus-core';
import { SassinApi } from '../../libs/api/sassin';
import { SassinChangeLineState } from '../../messages';
import { SassinChangeLineStateCommand } from '../../types/sassin/changeLineStateCommand';
import { SassinAdapter } from '../../adapters/sassin';

@controller('/sassin')
export class SassinController implements interfaces.Controller {
  private sassinAdapter: any;

  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
  ) {
    // TODO: add dependency container
    const sassinApi = new SassinApi(
      '5f487b6001d41816ccfbc7e8',
      'dd488516cd84484f9a511c9e5f9db4a3',
    );
    this.sassinAdapter = new SassinAdapter(sassinApi);
  }

  // TODO: add 'device offline' procesing
  @httpPost('/change-line-state')
  private async changeLineState(
  @request() req: express.Request,
    @response() res: express.Response,
  ) {
    const sassinChangeLineStateCommand: SassinChangeLineStateCommand = {
      deviceUuid: req.body.uuidDevice,
      lineNumber: req.body.lineNumber,
      state: req.body.active,
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

  @httpGet('/device')
  private async getDevicesList(
  @request() req: express.Request,
    @response() res: express.Response,
  ) {
    try {
      const devices = await this.sassinAdapter.getDevices();
      res.status(200).send(devices);
    } catch (ex) {
      console.log(ex);
      res.sendStatus(500);
    }
  }

  @httpGet('/device/serial/:serialNumber')
  private async getDeviceInfo(
  @requestParam('serialNumber') serialNumber: string,
    @request() req: express.Request,
    @response() res: express.Response,
  ) {
    try {
      const deviceInfo = await this.sassinAdapter.getDeviceInfo(serialNumber);
      res.status(200).send(deviceInfo);
    } catch (ex) {
      console.log(ex);
      res.sendStatus(500);
    }
  }

  @httpGet('/device/:uuid/metrics')
  private async getMetrics(
  @requestParam('uuid') deviceUuid: string,
    @request() req: express.Request,
    @response() res: express.Response,
  ) {
    const { timestampFrom } = req.query;
    const { timestampTo } = req.query;

    if (!timestampFrom || !timestampTo) {
      res.status(400).send({ errors: ['timestampFrom or timestampTo not set'] });
      return;
    }

    try {
      const deviceInfo = await this.sassinAdapter
        .getMeasurementsTimestampRange(
          deviceUuid,
          Number(timestampFrom),
          Number(timestampTo),
        );
      res.status(200).send(deviceInfo);
    } catch (ex) {
      console.log(ex);
      res.sendStatus(500);
    }
  }
}
