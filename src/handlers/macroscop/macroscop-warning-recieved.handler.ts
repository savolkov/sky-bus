import { HandlesMessage, BUS_SYMBOLS, Bus } from '@node-ts/bus-core'
import { inject } from 'inversify'
import { LOGGER_SYMBOLS, Logger } from '@node-ts/logger-core'
import { MacroscopWarningRecieved } from '../../messages';
import { REPOSITORIES } from '../../repositories/types';
import { Repository } from 'typeorm';
import { Accident } from '../../repositories/entities/Accident';
import { AccidentType } from '../../repositories/entities/AccidentType';
import { MacroscopWarningRecorded } from '../../messages/macroscop/macroscop-warning-recorded.event';

@HandlesMessage(MacroscopWarningRecieved)
export class MacroscopWarningRecievedHandler {

  constructor (
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
    @inject(LOGGER_SYMBOLS.Logger) private readonly logger: Logger,
    @inject(REPOSITORIES.AccidentsRepository) private readonly accidentsRepository: Repository<Accident>,
    @inject(REPOSITORIES.AccidentTypesRepository) private readonly accidentTypesRepository: Repository<AccidentType>
  ) {
  }

  async handle ({ message }: MacroscopWarningRecieved): Promise<void> {
    const { accidentsRepository, accidentTypesRepository } = this;
    this.logger.info(`MacroscopWarningRecieved event received, msg ${message}...`, { message })
    try {
      let type = await accidentTypesRepository.findOne({ where: { name: 'Macroscop warning'} });
      if (!type) {
        const draftT = accidentTypesRepository.create()
        draftT.description = "Macroscop accident";
        draftT.name = "Macroscop warning";
        type = await accidentTypesRepository.save(draftT);
      }
      const draftA = accidentsRepository.create();
      draftA.timestamp = new Date();
      draftA.accidentTypeFk = type;
      await accidentsRepository.save(draftA);
    } catch (e) {
      this.logger.info(e);
    }
    await this.bus.publish(new MacroscopWarningRecorded(message));
  }

}
