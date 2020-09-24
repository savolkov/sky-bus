import { Event } from '@node-ts/bus-messages';
import { SassinChangeLineStateCommand } from '../../types/sassin/changeLineStateCommand';

export class SassinChangeLineState extends Event {
  static readonly NAME = 'sassin/change-line-state-command';

  readonly $name = SassinChangeLineState.NAME;

  readonly $version = 0;

  /**
   * Event
   * @param message
   */
  constructor(
    readonly sassinEvent: SassinChangeLineStateCommand,
  ) {
    super();
  }
}
