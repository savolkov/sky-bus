import { Event } from '@node-ts/bus-messages';
import { SassinLineStateTriedToChange } from '../../types/sassin/lineStateTriedToChange';

export class SassinLineStateChanged extends Event {
  static readonly NAME = 'sassin/line-state-changed';

  readonly $name = SassinLineStateChanged.NAME;

  readonly $version = 0;

  /**
   * Event
   * @param message
   */
  constructor(
    readonly sassinEvent: SassinLineStateTriedToChange,
  ) {
    super();
  }
}
