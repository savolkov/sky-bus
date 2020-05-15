import { StartSirenTest, SirenTestFailed, SirenTestPassed, SirenTestStarted } from '../messages'
import { HandlesMessage, BUS_SYMBOLS, Bus } from '@node-ts/bus-core'
import { inject } from 'inversify'
import { LOGGER_SYMBOLS, Logger } from '@node-ts/logger-core'
import { Uuid } from '../messages/uuid'
import { TYPE } from '../repositories/types';
import { Repository } from 'typeorm';
import { Units } from '../repositories/entities/Units';

const MAX_SIREN_TEST_DURATION = 5000
const TEST_FAILURE_THRESHOLD = 0.5

@HandlesMessage(StartSirenTest)
export class StartSirenTestHandler {

  constructor (
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
    @inject(LOGGER_SYMBOLS.Logger) private readonly logger: Logger,
    @inject(TYPE.UnitsRepository) private readonly units: Repository<Units>
  ) {
  }

  async handle ({ sirenId }: StartSirenTest): Promise<void> {
    this.logger.info('StartSirenTest command received, starting siren test...', { sirenId })
    const u = this.units.create();
    u.name = sirenId;
    u.description = 'handler';
    this.units.save(u)
      .then(() => console.log('AAAAAAA'))
      .catch((err) => this.logger.error(err));
    setTimeout(async () => testSiren(this.bus, this.logger, sirenId), MAX_SIREN_TEST_DURATION)
    await this.bus.publish(new SirenTestStarted(sirenId))
  }

}

async function testSiren (bus: Bus, logger: Logger, sirenId: Uuid): Promise<void> {
  const testFailed = Math.random() > TEST_FAILURE_THRESHOLD
  logger.info('Siren test completed, publishing event', { sirenId, testFailed })
  if (testFailed) {
    await bus.publish(new SirenTestFailed(sirenId))
  } else {
    await bus.publish(new SirenTestPassed(sirenId))
  }
}
