import { Event } from '@node-ts/bus-messages';

export class IridiumDeviceConnectionChanged extends Event {
  static readonly NAME: string = 'iridium/device-connection-changed';

  public readonly $name: string = IridiumDeviceConnectionChanged.NAME;

  public readonly $version: number = 0;

  /**
   * Event is triggered when endpoint receives Connection Changed event from iRidium
   * @param message A warning message
   */
  constructor(readonly deviceUuid: string,
    readonly deviceName: string,
    readonly connected: boolean) {
    super();
  }
}
