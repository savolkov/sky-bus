import { HandlesMessage, BUS_SYMBOLS, Bus } from '@node-ts/bus-core';
import { inject } from 'inversify';
import { LOGGER_SYMBOLS, Logger } from '@node-ts/logger-core';
import axios from 'axios';
import { IridiumTestPassedEvent } from '../../messages/iridium/iridium-test-passed.event';
import { IridiumTestRecievedEvent } from '../../messages/iridium/iridium-test-recieved.event';

@HandlesMessage(IridiumTestRecievedEvent)
export class IridiumTestRecievedHandler {
  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
    @inject(LOGGER_SYMBOLS.Logger) private readonly logger: Logger,
  ) {
  }

  async handle({ iridiumEvent }: IridiumTestRecievedEvent): Promise<void> {
    this.logger.info(
      `IridiumTestEvent event received, desc ${iridiumEvent.description}...`,
      { iridiumEvent },
    );

    let data = {};
    if ('dvarNumber' in iridiumEvent && 'dvarState' in iridiumEvent) {
      data = {
        dvarNumber: iridiumEvent.dvarNumber,
        dvarState: iridiumEvent.dvarState,
      };
    }

    if ('relayState' in iridiumEvent && 'relayNumber' in iridiumEvent) {
      data = {
        relayState: iridiumEvent.relayState,
        relayNumber: iridiumEvent.relayNumber,
      };
    }

    try {
      const result = await axios.post('localhost:1234', data);
      this.logger.info(result.data);
      this.bus.publish(new IridiumTestPassedEvent(iridiumEvent));
    } catch (err) {
      console.log(err);
      this.logger.error(err);
    }
  }
}
