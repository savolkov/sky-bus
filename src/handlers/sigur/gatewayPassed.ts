import { HandlesMessage, BUS_SYMBOLS, Bus } from '@node-ts/bus-core';
import { inject } from 'inversify';
import { LOGGER_SYMBOLS, Logger } from '@node-ts/logger-core';
import { SigurGatewayPassed } from '../../messages/sigur';

@HandlesMessage(SigurGatewayPassed)
export class SigurGatewayPassedHandler {
  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
    @inject(LOGGER_SYMBOLS.Logger) private readonly logger: Logger,
  ) {
  }

  async handle(sigurMessage: SigurGatewayPassed): Promise<void> {
    this.logger.info(
      `SigurGatewayPassed event received, device uuid: ${sigurMessage.sigurEvent.gatewayId}\n`,
      sigurMessage,
    );

    // TODO: handle event
  }
}
