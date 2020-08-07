import { HandlesMessage, BUS_SYMBOLS, Bus } from '@node-ts/bus-core';
import { inject } from 'inversify';
import { LOGGER_SYMBOLS, Logger } from '@node-ts/logger-core';
import { SputnikOpenDoorError } from 'messages/sputnik/openDoorError.event';

@HandlesMessage(SputnikOpenDoorError)
export class SputnikOpenDoorErrorHandler {
  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
    @inject(LOGGER_SYMBOLS.Logger) private readonly logger: Logger,
  ) {
  }

  async handle(sputnikEvent: SputnikOpenDoorError): Promise<void> {
    this.logger.info(
      `SputnikOpenDoorError event received, device uuid: ${sputnikEvent.sputnikEvent.deviceUuid}\n`,
      sputnikEvent.sputnikEvent.errors,
    );
  }
}
