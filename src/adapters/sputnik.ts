import { SputnikApi } from 'libs/api/sputnik';

class SputnikAdapter {
  private api: SputnikApi;

  constructor(sputnikApi: SputnikApi) {
    this.api = sputnikApi;
  }

  public async openDoor(uuid: string) {
    const response = await this.api.openDoor(uuid);
    return response;
  }
}

export { SputnikAdapter };
