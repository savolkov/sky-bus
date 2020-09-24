import { Event } from '@node-ts/bus-messages';
import { SputnikOpenDoorCommand } from '../../types/sputnik/openDoorCommand';

export class SputnikOpenDoor extends Event {
  static readonly NAME = 'sputnik/open-door';

  readonly $name = SputnikOpenDoor.NAME;

  readonly $version = 0;

  /**
   * Event
   * @param message
   */
  constructor(
    readonly sputnikEvent: SputnikOpenDoorCommand,
  ) {
    super();
  }
}
