import { Event } from '@node-ts/bus-messages';
import axios, { AxiosInstance } from 'axios';

export class VirtualCuratorsApi {
  private api: AxiosInstance;

  constructor(host: string, username: string, password: string) {
    this.api = axios.create({
      baseURL: host,
      headers: {
        get: {
          Accept: 'application/json',
        },
      },
      auth: {
        username,
        password,
      },
    });
  }

  public async sendEvent(event: Event) {
    await this.api.post('/event', event)
      .catch((error) => {
        console.log(error);
      });
  }
}
