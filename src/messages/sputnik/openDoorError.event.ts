import { Event } from '@node-ts/bus-messages';
import { SputnikDoorTriedToOpen } from '../../types/sputnik/doorTriedToOpen';

export class SputnikOpenDoorError extends Event {
  static readonly NAME = 'sputnik/open-door-error';

  readonly $name = SputnikOpenDoorError.NAME;

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
