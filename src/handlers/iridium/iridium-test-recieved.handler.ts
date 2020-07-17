import { HandlesMessage, BUS_SYMBOLS, Bus } from '@node-ts/bus-core'
import { inject } from 'inversify'
import { LOGGER_SYMBOLS, Logger } from '@node-ts/logger-core'
import { IridiumTestPassedEvent, IridiumTestRecievedEvent } from '../../messages'
import axios from 'axios'

@HandlesMessage(IridiumTestRecievedEvent)
export class IridiumTestRecievedHandler {

  constructor (
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
    @inject(LOGGER_SYMBOLS.Logger) private readonly logger: Logger
  ) {
  }

  async handle ({ iridiumEvent }: IridiumTestRecievedEvent): Promise<void> {
    this.logger.info(
      `IridiumTestEvent event received, desc ${iridiumEvent.description}...`,
      { iridiumEvent }
    )

    let data = {}
    if (iridiumEvent.dvarNumber && iridiumEvent.dvarState) {
      data = {
        dvarNumber: iridiumEvent.dvarNumber,
        dvarState: iridiumEvent.dvarState
      }
    }

    if (iridiumEvent.relayState && iridiumEvent.relayNumber) {
      data = {
        relayState: iridiumEvent.relayState,
        relayNumber: iridiumEvent.relayNumber
      }
    }

    axios.post('localhost:1234', data)
      .then(res => {
        this.logger.info(res.data)
        this.bus.publish(new IridiumTestPassedEvent(iridiumEvent))
      })
      .catch(e => {
        this.logger.error(e)
      })
  }

}
