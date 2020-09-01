import { HandlesMessage, BUS_SYMBOLS, Bus } from '@node-ts/bus-core';
import { inject } from 'inversify';
import { LOGGER_SYMBOLS, Logger } from '@node-ts/logger-core';
import { SassinChangeLineState } from '../../messages';
import { SassinAdapter } from '../../adapters/sassin';
import { SassinApi } from '../../libs/api/sassin';
import { SassinLineStateChangeError } from '../../messages/sassin/lineStateChangeError.event';
import { SassinLineStateChanged } from '../../messages/sassin/lineStateChanged.event';
import { SassinLineStateTriedToChange } from '../../types/sassin/lineStateTriedToChange';

@HandlesMessage(SassinChangeLineState)
export class SassinChangeLineStateHandler {
  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
    @inject(LOGGER_SYMBOLS.Logger) private readonly logger: Logger,
  ) {
  }

  async handle(sassinEvent: SassinChangeLineState): Promise<void> {
    this.logger.info(
      `SassinChangeLineState event received, device uuid: ${sassinEvent.sassinEvent.deviceUuid}\n`,
      sassinEvent,
    );

    const sputnikApi = new SassinApi(
      // TODO: add .env storage
      '5f487b6001d41816ccfbc7e8',
      'dd488516cd84484f9a511c9e5f9db4a3'
    );
    const sassinAdapter = new SassinAdapter(sputnikApi);

    const sassinLineStateTriedToChange: SassinLineStateTriedToChange = {
      deviceUuid: sassinEvent.sassinEvent.deviceUuid,
      lineNumber: sassinEvent.sassinEvent.lineNumber,
      timestamp: new Date(),
    };

    let res = {};
    try {
      res = await sassinAdapter.changeLineState(
        sassinEvent.sassinEvent.deviceUuid,
        sassinEvent.sassinEvent.lineNumber,
        sassinEvent.sassinEvent.state,
      );

      this.logger.info(
        'Sassin line status change api response ',
        res,
      );

      await this.bus.publish(new SassinLineStateChanged(sassinLineStateTriedToChange));
    } catch (err) {
      sassinLineStateTriedToChange.errors = err.response.data;
      this.logger.info(
        'Sassin line status change error api response ',
        err,
      );
      await this.bus.publish(new SassinLineStateChangeError(sassinLineStateTriedToChange));
      
    }
  }
}
