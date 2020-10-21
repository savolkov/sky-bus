import { DevlineApi } from 'libs/api/devline';

class DevlineAdapter {
  private api: DevlineApi;

  constructor(api: DevlineApi) {
    this.api = api;
  }

  private addHostToUri(uri:string) {
    return (this.api.getHost() + uri).replace('//', '/');
  }

  private normalizeCameraObject(camera:any) {
    const splitted = camera.uri.split('/');

    return {
      id: splitted[splitted.length - 1],
      name: camera.name,
      width: camera.width,
      height: camera.height,
      pixelAspectRatioX: camera.pixelAspectRatioX,
      pixelAspectRatioY: camera.pixelAspectRatioY,
      uri: this.addHostToUri(camera.uri),
      imageUri: this.addHostToUri(camera['image-uri']),
      videoUri: this.addHostToUri(camera['video-uri']),
      streamingUri: this.addHostToUri(camera['streaming-uri']),
      osdUri: this.addHostToUri(camera['osd-uri']),
    };
  }

  public async getCameras() {
    const cameras = await this.api.getCamerasList();

    for (let i = 0; i < cameras.length; i++) {
      cameras[i] = this.normalizeCameraObject(cameras[i]);
    }

    return cameras;
  }

  public async getCameraInfo(id: string) {
    const camera = await this.api.getCameraInfo(id);

    return this.normalizeCameraObject(camera);
  }
}

export { DevlineAdapter };
