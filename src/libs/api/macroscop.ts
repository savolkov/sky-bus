import axios, { AxiosInstance } from 'axios';

class MacroscopApi {
  private api: AxiosInstance;

  private host: String;

  // username: string, password: string
  constructor(host: string) {
    this.host = host;
    this.api = axios.create({
      baseURL: host,
      headers: {
        get: {
          Accept: 'application/json',
        },
      },
      // auth: {
      //   username,
      //   password,
      // },
    });
  }

  public getHost() {
    return this.host;
  }

  public async getCamerasList() {
    const res = await this.api.get('/channels');
    return res.data;
  }

  public async getCameraInfo(id: string) {
    const res = await this.api.get(`/channels/${id}`);
    return res.data;
  }
}

export { MacroscopApi };
