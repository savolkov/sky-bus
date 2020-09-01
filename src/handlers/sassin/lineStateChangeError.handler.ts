import { HandlesMessage, BUS_SYMBOLS, Bus } from '@node-ts/bus-core';
import { inject } from 'inversify';
import { LOGGER_SYMBOLS, Logger } from '@node-ts/logger-core';
import { SassinLineStateChangeError } from '../../messages';

@HandlesMessage(SassinLineStateChangeError)
export class SassinLineStateChangeErrorHandler {
  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
    @inject(LOGGER_SYMBOLS.Logger) private readonly logger: Logger,
  ) {
  }

  async handle(sassinEvent: SassinLineStateChangeError): Promise<void> {
    this.logger.info(
      `SassinLineStateChangeError event received, device uuid: ${sassinEvent.sassinEvent.deviceUuid}\n`,
      sassinEvent,
    );

    this.logger.info(
      'Sassin line state change error',
    );
  }
}
