import { HandlesMessage } from '@node-ts/bus-core';
import { inject } from 'inversify';
import { LOGGER_SYMBOLS, Logger } from '@node-ts/logger-core';
import { SputnikIntercomCallReceived } from '../../messages/sputnik/intercomCallReceived.event';
import { VirtualCuratorsApi } from '../../libs/api/virtualCuratorsApi';

@HandlesMessage(SputnikIntercomCallReceived)
export class SpuntikIntercomCallReceivedHandler {
  constructor(
    @inject(LOGGER_SYMBOLS.Logger) private readonly logger: Logger,
  ) {
  }

  async handle(intercomCallReceived: SputnikIntercomCallReceived): Promise<void> {
    this.logger.info(
      `IntercomCallReceived event received, device uuid: ${intercomCallReceived.deviceUuid}, flat number: ${intercomCallReceived.flatId}\n`,
      intercomCallReceived,
    );

    const virtualCuratorsApi = new VirtualCuratorsApi(
      process.env.VIRTUAL_CURATORS_HOST || '',
      process.env.VIRTUAL_CURATORS_USERNAME || '',
      process.env.VIRTUAL_CURATORS_PASSWORD || '',
    );

    await virtualCuratorsApi.sendEvent(intercomCallReceived);
  }
}
