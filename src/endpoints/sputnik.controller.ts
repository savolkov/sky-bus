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
import { SputnikOpenDoor } from '../messages';
import { SputnikOpenDoorCommand } from '../types/sputnik/openDoorCommand';

@controller('/sputnik')
export class SputnikController implements interfaces.Controller {
  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
  ) {
  }

  @httpPost('/open')
  private async open(@request() req: express.Request, @response() res: express.Response) {
    const sputnikOpenDoorCommand: SputnikOpenDoorCommand = {
      deviceUuid: req.body.uuid,
      token: 'da118336.eyJhbGciOiJIUzI1NiJ9.eyJlbnRpdHlfdXVpZCI6IjExNTciLCJlbnRpdHlfdHlwZSI6InVzZXIiLCJlbnRpdHlfcmVmX3V1aWQiOiI4ZmFkZGM5YS05OWJiLTQ2MDgtYjlkYy01YzA1MzcxYzgzYzkiLCJlbnRpdHlfbmFtZSI6bnVsbCwic2FsdCI6ImRhMTE4MzM2In0.RPzC5O1oIj6lI9Wzb4jJVY_TE0NvT0g24cDf1vmq-2Q',
      timestamp: new Date(),
    };
    try {
      await this.bus.send(new SputnikOpenDoor(sputnikOpenDoorCommand));
      res.sendStatus(204);
    } catch (ex) {
      console.log(ex);
      res.sendStatus(500);
    }
  }
}
