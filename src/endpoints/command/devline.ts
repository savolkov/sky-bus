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
import { DevlineApi } from '../../libs/api/devline';
import { DevlineAdapter } from '../../adapters/devline';

config();

@controller('/devline')
export class DevlineController implements interfaces.Controller {
  private devlineAdapter: any;

  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
  ) {
    const devlineApi = new DevlineApi(
      process.env.DEVLINE_HOST || '',
      process.env.DEVLINE_USER || '',
      process.env.DEVLINE_PASSWORD || '',
    );
    this.devlineAdapter = new DevlineAdapter(devlineApi);
  }

  @httpGet('/cameras')
  private async list(@request() req: express.Request, @response() res: express.Response) {
    try {
      const cameras = await this.devlineAdapter.getCameras();
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
      const camera = await this.devlineAdapter.getCameraInfo(uuid);
      res.status(200).send(camera);
    } catch (ex) {
      console.log(ex);
      res.sendStatus(500);
    }
  }
}
