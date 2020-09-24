import { Event } from '@node-ts/bus-messages';
import { SputnikDoorTriedToOpen } from '../../types/sputnik/doorTriedToOpen';

export class SputnikDoorOpened extends Event {
  static readonly NAME = 'sputnik/open-door-success';

  readonly $name = SputnikDoorOpened.NAME;

  readonly $version = 0;

  /**
   * Event
   * @param message
   */
  constructor(
    readonly sputnikEvent: SputnikDoorTriedToOpen,
  ) {
    super();
  }
}
