import { SassinApi } from 'libs/api/sassin';

class SassinAdapter {
  private api: SassinApi;

  constructor(sassinApi: SassinApi) {
    this.api = sassinApi;
  }

  // public async getDevices(uuidController:string, lineNumber:number, state:boolean) {
  //   const response = await this.api.getDevices(uuidController, lineNumber, state);
  //   return response;
  // }

  // public async getDeviceInfo(uuidController:string, lineNumber:number, state:boolean) {
  //   const response = await this.api.changeLineState(uuidController, lineNumber, state);
  //   return response;
  // }

  public async changeLineState(uuidController:string, lineNumber:number, state:boolean) {
    const response = await this.api.changeLineState(uuidController, lineNumber, state);
    return response;
  }

  // public async getPowerDataTimestamp(uuidController:string, lineNumber:number, state:boolean) {
  //   const response = await this.api.changeLineState(uuidController, lineNumber, state);
  //   return response;
  // }
}

export { SassinAdapter };
