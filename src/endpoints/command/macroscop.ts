import * as express from 'express';
import {
  interfaces,
  controller,
  request,
  response,
  httpGet,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Bus, BUS_SYMBOLS } from '@node-ts/bus-core';
import { config } from 'dotenv';
import { MacroscopApi } from '../../libs/api/macroscop';
import { MacroscopAdapter } from '../../adapters/macroscop';

config();

@controller('/macroscop')
export class MacroscopController implements interfaces.Controller {
  private macroscopAdapter: any;

  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
  ) {
    const macroscopApi = new MacroscopApi(
      process.env.MACROSCOP_HOST || '',
    );
    this.macroscopAdapter = new MacroscopAdapter(macroscopApi);
  }

  @httpGet('/cameras')
  private async list(@request() req: express.Request, @response() res: express.Response) {
    try {
      const cameras = await this.macroscopAdapter.getCameras();
      res.status(200).send(cameras);
    } catch (ex) {
      console.log(ex);
      res.sendStatus(500);
    }
  }

  @httpGet('/cameras/:uuid')
  private async info(@request() req: express.Request, @response() res: express.Response) {
    const { uuid } = req.params;
    try {
      const camera = await this.macroscopAdapter.getCameraInfo(uuid);
      res.status(200).send(camera);
    } catch (ex) {
      console.log(ex);
      res.sendStatus(500);
    }
  }
}
