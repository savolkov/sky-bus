import { SassinApi } from 'libs/api/sassin';

class SassinAdapter {
  private api: SassinApi;

  constructor(sassinApi: SassinApi) {
    this.api = sassinApi;
  }

  // TODO:
  public async getDevices(uuidController:string, uuidLine:string, state:boolean) {
    const response = await this.api.changeLineState(uuidController, uuidLine, state);
    return response;
  }

  // TODO:
  public async getDeviceInfo(uuidController:string, uuidLine:string, state:boolean) {
    const response = await this.api.changeLineState(uuidController, uuidLine, state);
    return response;
  }

  public async changeLineState(uuidController:string, uuidLine:string, state:boolean) {
    const response = await this.api.changeLineState(uuidController, uuidLine, state);
    return response;
  }

  // TODO:
  public async getPowerDataTimestamp(uuidController:string, uuidLine:string, state:boolean) {
    const response = await this.api.changeLineState(uuidController, uuidLine, state);
    return response;
  }
}

export { SassinAdapter };