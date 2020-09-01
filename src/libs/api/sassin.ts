import axios, { AxiosInstance } from 'axios';
import * as md5 from 'md5';
import * as moment from 'moment';

class SassinApi {
  private userId: string;

  private secret: string;

  private token: string = '';

  private api: AxiosInstance;

  constructor(userId: string, secret: string) {
    this.userId = userId;
    this.secret = secret;
    this.api = axios.create({
      baseURL: 'http://ex-api.jalasmart.com/',
    });
  }

  private async checkAndGetToken(){
    if (this.token.length < 1){
      const resp = await this.getToken();
      this.token = resp.data.Data;
    }
  }

  private getRandomLetterSequence(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  private async getToken() {
    const res = await this.api.put('/api/v2/Platform/Token', {
      ID: this.userId,
      Secret: this.secret,
    });
    return res;
  }

  private makeSignature(
    params: { [id: string] : Object },
    nonce: string,
    timestamp: number,
    userId: string,
    token: string,
  ) {
    const oldKeys = Object.keys(params);
    const signObject: { [id: string] : Object } = {};

    for (let i = 0; i < oldKeys.length; i += 1) {
      signObject[oldKeys[i]] = params[oldKeys[i]];
    }

    signObject.Nonce = nonce;
    signObject.TimeStamp = timestamp;
    signObject.UserID = userId;

    const keys = Object.keys(signObject);
    keys.sort();

    let signString = '';

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = signObject[key];
      if (typeof value !== 'string') {
        signString += `${key}=${JSON.stringify(signObject[key])}&`;
      } else {
        signString += `${key}=${signObject[key]}&`;
      }
    }
    signString += `Token=${token}`;
    return md5(signString);
  }

  private async makeAuth(params: { [id: string] : Object }, userId: string, token: string) {
    const nonce = this.getRandomLetterSequence(6);
    const timestamp = moment().unix();
    const signature = this.makeSignature(params, nonce, timestamp, userId, token);
    const authObj = {
      UserID: userId,
      Nonce: nonce,
      TimeStamp: timestamp.toString(),
      Signature: signature,
    };

    const authString = JSON.stringify(authObj);
    const buff = Buffer.from(authString, 'ascii');
    return buff.toString('base64');
  }

  // public async getDevices(userId: string) {
  // const auth = getAuth({}, userId, token);

  // axios.get(url + 'api/v2/devices/' + userId, {
  //   headers: {
  //     Authorization: auth
  //   }
  // }).then(res => {
  //   console.log(res.data)
  //   console.log('========= res')
  // }).catch(err => {
  //   console.log(err.response.data)
  //   console.log('========= err')
  // })
  // }

  // public async getDeviceInfo(serialNumber: string) {
  // const params = {
  //   'SN': serialNumber
  // }

  // const auth = getAuth(params, userId, token);

  // axios.get(url + 'api/v2/devices/' + serialNumber, {
  //   headers: {
  //     Authorization: auth
  //   }
  // }).then(res => {
  //   console.log(res.data)
  //   console.log('========= res')
  // }).catch(err => {
  //   console.log(err.response.data)
  //   console.log('========= err')
  // })
  // }

  public async changeLineState(controllerId: string, lineNumber: number, lineStatus: boolean) {
    await this.checkAndGetToken();

    const body = {
      ControllerID: controllerId,
      Lines: [
        {
          LineNo: lineNumber,
          Status: lineStatus ? 1 : 0,
        },
      ],
    };

    const auth = await this.makeAuth(body, this.userId, this.token);
    const reqUrl = `/api/v2/status/${controllerId}`;

    const res = await this.api.put(reqUrl, body,
      {
        headers: {
          Authorization: auth,
        },
      });

    return res.data;
  }

  // public async getPowerDataTimestamp(deviceId: string, timestamp: number) {
  // timestamp = 1598874321;

  // if (!Number.isFinite(timestamp)){
  //   timestamp = moment().unix();
  // }
  // const params = {
  //   DeviceID: deviceId,
  //   Time: timestamp
  // }

  // const auth = getAuth(params, userId, token);

  // axios.get(url + `api/v2/energy/${deviceId}/${timestamp}`, {
  //   headers: {
  //     Authorization: auth
  //   }
  // }).then(res => {
  //   console.log(res.data.Data[0])
  //   console.log('========= res')

  //   // const arr = [];
  //   // for (let i = 0; i < res.data.Data.length; i++){
  //   //   arr.push({
  //   //     data: moment(res.data.Data[i].TimeStamp),
  //   //     value: res.data.Data[i].Lines[0].Energy
  //   //   });
  //   // }
  //   // console.log(arr)

  // }).catch(err => {
  //   console.log(err.response.data)
  //   console.log('========= err')
  // })
  // }
}

export { SassinApi };
