import axios, { AxiosInstance } from 'axios';

class DevlineApi {
  private api: AxiosInstance;

  private host: String;

  constructor(host: string) {
    this.host = host;
    this.api = axios.create({
      baseURL: host,
      headers: {
        get: {
          Accept: 'application/json',
        },
      },
    });
  }

  public getHost() {
    return this.host;
  }

  public async getCamerasList() {
    const res = await this.api.get('/cameras');
    return res.data;
  }

  public async getCameraInfo(id: string) {
    const res = await this.api.get(`/cameras/${id}`);
    return res.data;
  }
}

export { DevlineApi };
