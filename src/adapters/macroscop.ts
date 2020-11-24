import { MacroscopApi } from 'libs/api/macroscop';

class MacroscopAdapter {
  private api: MacroscopApi;

  constructor(api: MacroscopApi) {
    this.api = api;
  }

  public async getCameras() {
    const cameras = await this.api.getCamerasList();
    return cameras;
  }

  public async getCameraInfo(id: string) {
    const camera = await this.api.getCameraInfo(id);
    return camera;
  }
}

export { MacroscopAdapter };
