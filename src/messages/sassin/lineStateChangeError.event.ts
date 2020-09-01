import { Event } from '@node-ts/bus-messages';
import { SassinLineStateTriedToChange } from '../../types/sassin/lineStateTriedToChange';

export class SassinLineStateChangeError extends Event {
  static readonly NAME = 'sassin/line-state-change-error';

  readonly $name = SassinLineStateChangeError.NAME;

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
