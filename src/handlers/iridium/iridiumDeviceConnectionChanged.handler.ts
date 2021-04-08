import { HandlesMessage } from '@node-ts/bus-core';
import { inject } from 'inversify';
import { LOGGER_SYMBOLS, Logger } from '@node-ts/logger-core';
import { IridiumDeviceConnectionChanged } from '../../messages/iridium/iridiumDeviceConnectionChanged.event';
import { VirtualCuratorsApi } from '../../libs/api/virtualCuratorsApi';

@HandlesMessage(IridiumDeviceConnectionChanged)
export class IridiumDeviceConnectionChangedHandler {
  constructor(
    @inject(LOGGER_SYMBOLS.Logger) private readonly logger: Logger,
  ) {
  }

  async handle(iridiumDeviceConnectionChanged: IridiumDeviceConnectionChanged):
  Promise<void> {
    this.logger.info(
      `IridiumDeviceConnectionChanged event received, deviceUuid ${iridiumDeviceConnectionChanged.deviceName}, deviceName`,
      iridiumDeviceConnectionChanged,
    );

    const virtualCuratorsApi = new VirtualCuratorsApi(
      process.env.VIRTUAL_CURATORS_HOST || '',
      process.env.VIRTUAL_CURATORS_USERNAME || '',
      process.env.VIRTUAL_CURATORS_PASSWORD || '',
    );

    virtualCuratorsApi.sendEvent(iridiumDeviceConnectionChanged);
  }
}
