import { HandlesMessage, BUS_SYMBOLS, Bus } from '@node-ts/bus-core';
import { inject } from 'inversify';
import { LOGGER_SYMBOLS, Logger } from '@node-ts/logger-core';
import { SputnikDoorOpened } from '../../messages/sputnik/doorOpened.event';

@HandlesMessage(SputnikDoorOpened)
export class SputnikDoorOpenedHandler {
  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
    @inject(LOGGER_SYMBOLS.Logger) private readonly logger: Logger,
  ) {
  }

  async handle(sputnikEvent: SputnikDoorOpened): Promise<void> {
    this.logger.info(
      `SputnikDoorOpened event received, device uuid: ${sputnikEvent.sputnikEvent.deviceUuid}\n`,
      sputnikEvent,
    );
  }
}
