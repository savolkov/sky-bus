import { SassinApi } from 'libs/api/sassin';

class SassinAdapter {
  private api: SassinApi;

  constructor(sassinApi: SassinApi) {
    this.api = sassinApi;
  }

  public async getDevices() {
    const response = await this.api.getDevices();
    return response;
  }

  public async getDeviceInfo(serialNumber:string) {
    const response = await this.api.getDeviceInfo(serialNumber);
    return response;
  }

  public async changeLineState(uuidController:string, lineNumber:number, state:boolean) {
    const response = await this.api.changeLineState(uuidController, lineNumber, state);
    return response;
  }

  public async getMeasurementsTimestampRange(
    uuidDevice:string,
    timestampFrom: number,
    timestampTo: number,
  ) {
    const response = await this.api
      .getMeasurementsTimestampRange(uuidDevice, timestampFrom, timestampTo);
    return response;
  }
}

export { SassinAdapter };
