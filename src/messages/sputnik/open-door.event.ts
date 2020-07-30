import { Event } from '@node-ts/bus-messages';
import { SputnikOpenDoorCommand } from '../../types/sputnikOpenDoorCommand';

export class SputnikOpenDoor extends Event {
  static readonly NAME = 'sputnik/open-door';

  readonly $name = SputnikOpenDoor.NAME;

  readonly $version = 0;

  /**
   * Event is triggered when endpoint recieves warning message.
   * @param message A warning message
   */
  constructor(
    readonly sputnikEvent: SputnikOpenDoorCommand,
  ) {
    super();
  }
}
