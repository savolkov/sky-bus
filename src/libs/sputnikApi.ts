import axios, { AxiosInstance } from 'axios';

class SputnikApi {
  private token: string;

  private api: AxiosInstance;

  constructor(token: string) {
    this.token = token;
    this.api = axios.create({
      baseURL: 'https://api.sputnik.systems/api/v1/',
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  public async openDoor(uuid: string) {
    let res = { data: {} };
    try {
      res = await this.api.get(`/account/devices/intercoms/${uuid}/open_door`);
    } catch (err) {
      // TODO: add typed errors
      return err.response.data;
    }

    return res.data;
  }
}

export { SputnikApi };
