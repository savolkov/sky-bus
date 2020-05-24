import { Event } from '@node-ts/bus-messages'
import { MacroscopWarning } from '../../types/macroscopWarning';

export class MacroscopWarningRecieved extends Event {

  static readonly NAME = 'macroscop/warning-recieved'
  readonly $name = MacroscopWarningRecieved.NAME
  readonly $version = 0

  /**
   * Event is triggered when endpoint recieves warning message.
   * @param message A warning message
   */
  constructor (
    readonly macroscopEvent: MacroscopWarning,
  ) {
    super()
  }

}
