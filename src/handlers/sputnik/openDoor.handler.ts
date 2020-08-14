import { HandlesMessage, BUS_SYMBOLS, Bus } from '@node-ts/bus-core';
import { inject } from 'inversify';
import { LOGGER_SYMBOLS, Logger } from '@node-ts/logger-core';
import { SputnikOpenDoor } from '../../messages';
import { SputnikAdapter } from '../../adapters/sputnik';
import { SputnikApi } from '../../libs/api/sputnik';
import { SputnikOpenDoorError } from '../../messages/sputnik/openDoorError.event';
import { SputnikDoorOpened } from '../../messages/sputnik/doorOpened.event';
import { SputnikDoorTriedToOpen } from '../../types/sputnik/doorTriedToOpen';

@HandlesMessage(SputnikOpenDoor)
export class SputnikOpenDoorHandler {
  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
    @inject(LOGGER_SYMBOLS.Logger) private readonly logger: Logger,
  ) {
  }

  async handle(sputnikEvent: SputnikOpenDoor): Promise<void> {
    this.logger.info(
      `SputnikOpenDoor event received, device uuid: ${sputnikEvent.sputnikEvent.deviceUuid}\n`,
      sputnikEvent,
    );

    const sputnikApi = new SputnikApi(sputnikEvent.sputnikEvent.token);
    const sputnikAdapter = new SputnikAdapter(sputnikApi);

    const sputnikDoorTriedToOpen: SputnikDoorTriedToOpen = {
      deviceUuid: sputnikEvent.sputnikEvent.deviceUuid,
      timestamp: new Date(),
    };

    let res = {};
    try {
      res = (await sputnikAdapter.openDoor(sputnikEvent.sputnikEvent.deviceUuid)).data;
      await this.bus.publish(new SputnikDoorOpened(sputnikDoorTriedToOpen));
    } catch (err) {
      sputnikDoorTriedToOpen.errors = err.response.data;
      await this.bus.publish(new SputnikOpenDoorError(sputnikDoorTriedToOpen));
    }

    this.logger.info(
      'Sputnik open door api response ',
      res,
    );
  }
}
