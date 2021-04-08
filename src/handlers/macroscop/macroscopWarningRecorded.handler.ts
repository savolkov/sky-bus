import { HandlesMessage } from '@node-ts/bus-core';
import { Logger, LOGGER_SYMBOLS } from '@node-ts/logger-core';
import { inject } from 'inversify';
import { MacroscopWarningRecorded } from '../../messages/macroscop/macroscop-warning-recorded.event';
import { VirtualCuratorsApi } from '../../libs/api/virtualCuratorsApi';

@HandlesMessage(MacroscopWarningRecorded)
export class MacroscopWarningRecordedHandler {
  constructor(
    @inject(LOGGER_SYMBOLS.Logger) private readonly logger : Logger,
  ) {
  }

  async handleFireDetectedEvent(macroscopEvent: MacroscopWarningRecorded) {
    const virtualCuratorsApi = new VirtualCuratorsApi(
      process.env.VIRTUAL_CURATORS_HOST || '',
      process.env.VIRTUAL_CURATORS_USERNAME || '',
      process.env.VIRTUAL_CURATORS_PASSWORD || '',
    );

    await virtualCuratorsApi.sendEvent(macroscopEvent);
  }

  async handle(macroscopWarningRecorded : MacroscopWarningRecorded) {
    const { macroscopEvent } = macroscopWarningRecorded;

    this.logger.info(`MacroscopWarningRecorded handled, accident name ${macroscopEvent.accidentName}`);

    if (macroscopEvent.accidentName === 'Fire detected') {
      await this.handleFireDetectedEvent(macroscopWarningRecorded);
    }
  }
}
