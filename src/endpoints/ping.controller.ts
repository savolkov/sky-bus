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

@controller("/ping")
export class PingController implements interfaces.Controller {

  constructor() {
  }

  @httpGet("/")
  private index(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.send('PONG GET');
  }

  @httpPost("/")
  private async create(@request() req: express.Request, @response() res: express.Response) {
    res.send('POST PONG')
  }
}
