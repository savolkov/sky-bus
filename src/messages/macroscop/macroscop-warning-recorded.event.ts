import { Event } from '@node-ts/bus-messages';
import { MacroscopWarning } from '../../types/macroscopWarning';

export class MacroscopWarningRecorded extends Event {
  static readonly NAME = 'macroscop/warning-recorded';

  readonly $name = MacroscopWarningRecorded.NAME;

  readonly $version = 0;

  /**
   * Event is triggered when bus recorded warning message.
   * @param message A warning message
   */
  constructor(
    readonly macroscopEvent: MacroscopWarning,
  ) {
    super();
  }
}
