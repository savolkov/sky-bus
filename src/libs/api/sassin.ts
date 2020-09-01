import axios, { AxiosInstance } from 'axios';

class SassinApi {
  private userId: string;
  private secret: string;
  private token: string;
  
  private api: AxiosInstance;

  constructor(userId: string, secret: string) {
    this.userId = userId;
    this.secret = secret;
    this.api = axios.create({
      baseURL: 'http://ex-api.jalasmart.com/'
    });

    // TODO: get new token
  }

  private getRandomLetterSequence(length:number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  private async getToken(uuidLine:string, state:boolean) {
    // TODO:

    let res = {};
    return res;
  }

  private async makeSignature(params, nonce, timestamp, userId, token) {
    // TODO:

    let res = {};
    return res;
  }
  
  private async makeAuth(params, userId, token) {
    // TODO:

    let res = {};
    return res;
  }

  
  public async getDevices(userId) {
    // TODO:

    let res = {};
    return res;
  }

  
  public async getDeviceInfo(serialNumber) {
    // TODO:

    let res = {};
    return res;
  }

  public async changeLineState(controllerId, lineNumber, lineStatus) {
    // TODO:

    let res = {};
    return res;
  }

  public async getPowerDataTimestamp(deviceId, timestamp) {
    // TODO:

    let res = {};
    return res;
  }
}

export { SassinApi };