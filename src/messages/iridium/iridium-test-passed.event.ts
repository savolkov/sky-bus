import { Event } from '@node-ts/bus-messages'
import { IridiumTest } from '../../types/iridumTest'

export class IridiumTestPassedEvent extends Event {

  static readonly NAME = 'iridium/test-passed'
  readonly $name = IridiumTestPassedEvent.NAME
  readonly $version = 0

  /**
   * Event is triggered when bus recorded warning message.
   * @param message A warning message
   */
  constructor (
    readonly iridiumEvent: IridiumTest
  ) {
    super()
  }

}
