import * as express from 'express';
import {
  interfaces,
  controller,
  httpGet,
  httpPost,
  request,
  response,
} from 'inversify-express-utils';

@controller('/ping')
export class PingController implements interfaces.Controller {
  @httpGet('/')
  private index(req: express.Request, res: express.Response) {
    res.send('PONG GET');
  }

  @httpPost('/')
  private async create(@request() req: express.Request, @response() res: express.Response) {
    res.send('POST PONG');
  }
}
