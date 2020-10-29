import { HandlesMessage, BUS_SYMBOLS, Bus } from '@node-ts/bus-core';
import { inject } from 'inversify';
import { LOGGER_SYMBOLS, Logger } from '@node-ts/logger-core';
import { Repository } from 'typeorm';
import { AutomaticSwitchEvent } from 'repositories/entities/AutomaticSwitchEvent';
import { SassinChangeLineState } from '../../messages';
import { SassinAdapter } from '../../adapters/sassin';
import { SassinLineStateChangeError } from '../../messages/sassin/lineStateChangeError.event';
import { SassinLineStateChanged } from '../../messages/sassin/lineStateChanged.event';
import { SassinLineStateTriedToChange } from '../../types/sassin/lineStateTriedToChange';

import { ADAPTERS, REPOSITORIES } from '../../repositories/types';

@HandlesMessage(SassinChangeLineState)
export class SassinChangeLineStateHandler {
  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
    @inject(LOGGER_SYMBOLS.Logger) private readonly logger: Logger,
    @inject(REPOSITORIES.AutomaticSwitchEventRepository)
    private readonly eventRepository: Repository<AutomaticSwitchEvent>,
    @inject(ADAPTERS.Sassin)
    private readonly adapter: SassinAdapter,
  ) {
  }

  private async createAutomaticSwitchEvent( // TODO: вынести функцию для доступа из других файлов
    deviceId: string,
    lineId: number,
    isTurnedOn: boolean,
    timestamp: number,
    is_succeed: boolean = true,
  ): Promise<AutomaticSwitchEvent> {
    const draft = this.eventRepository.create();
    draft.deviceId = deviceId;
    draft.lineId = lineId;
    draft.isTurnedOn = isTurnedOn;
    draft.timestamp = timestamp;
    draft.isSucceed = is_succeed;
    return this.eventRepository.save(draft);
  }

  async handle(sassinEvent: SassinChangeLineState): Promise<void> {
    const {
      deviceUuid,
      lineNumber,
      state,
      timestamp,
    } = sassinEvent.sassinEvent;

    this.logger.info(
      `SassinChangeLineState event received, device uuid: ${deviceUuid}\n`,
      sassinEvent.sassinEvent,
    );

    const sassinLineStateTriedToChange: SassinLineStateTriedToChange = {
      deviceUuid,
      lineNumber,
      timestamp,
    };

    let res = {};
    try {
      res = await this.adapter.changeLineState(
        deviceUuid,
        lineNumber,
        state,
      );

      await this.createAutomaticSwitchEvent(
        deviceUuid,
        lineNumber,
        state,
        timestamp,
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

      await this.createAutomaticSwitchEvent(
        deviceUuid,
        lineNumber,
        state,
        timestamp,
        false,
      );

      await this.bus.publish(new SassinLineStateChangeError(sassinLineStateTriedToChange));
    }
  }
}
