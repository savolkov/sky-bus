import { HandlesMessage, BUS_SYMBOLS, Bus } from '@node-ts/bus-core';
import { inject } from 'inversify';
import { LOGGER_SYMBOLS, Logger } from '@node-ts/logger-core';
import { SputnikOpenDoor } from '../../messages';
import { SputnikAdapter } from '../../adapters/sputnik';
import { SputnikApi } from '../../libs/api/sputnik';

@HandlesMessage(SputnikOpenDoor)
export class SputnikOpenDoorHandler {
  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
    @inject(LOGGER_SYMBOLS.Logger) private readonly logger: Logger,
  ) {
  }

  async handle(sputnikEvent: SputnikDoorTriedToOpen): Promise<void> {
    this.logger.info(
      `SputnikOpenDoor event received, device uuid: ${sputnikEvent.sputnikEvent.deviceUuid}\n`,
      sputnikEvent,
    );

    const sputnikApi = new SputnikApi(sputnikEvent.sputnikEvent.token);
    const sputnikAdapter = new SputnikAdapter(sputnikApi);
    const res = await sputnikAdapter.openDoor(sputnikEvent.sputnikEvent.deviceUuid);
    
    this.logger.info(
      `Sputnik api response`,
      res,
    );
  }
}
