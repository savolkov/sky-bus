import { Event } from '@node-ts/bus-messages';
import { IridiumTest } from '../../types/iridumTest';

export class IridiumTestRecievedEvent extends Event {
  static readonly NAME = 'iridium/test-recieved';

  readonly $name = IridiumTestRecievedEvent.NAME;

  readonly $version = 0;

  /**
   * Event is triggered when endpoint recieves warning message.
   * @param message A warning message
   */
  constructor(
    readonly iridiumEvent: IridiumTest,
  ) {
    super();
  }
}
