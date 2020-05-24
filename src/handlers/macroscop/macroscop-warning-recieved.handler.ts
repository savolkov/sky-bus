import { HandlesMessage, BUS_SYMBOLS, Bus } from '@node-ts/bus-core'
import { inject } from 'inversify'
import { LOGGER_SYMBOLS, Logger } from '@node-ts/logger-core'
import { MacroscopWarningRecieved } from '../../messages';
import { REPOSITORIES } from '../../repositories/types';
import { Repository } from 'typeorm';
import { Accident } from '../../repositories/entities/Accident';
import { AccidentType } from '../../repositories/entities/AccidentType';
import { MacroscopWarningRecorded } from '../../messages/macroscop/macroscop-warning-recorded.event';
import { Objects } from '../../repositories/entities/Objects';
import { circularDependencyToException } from 'inversify/dts/utils/serialization';
import { States } from '../../repositories/entities/States';

@HandlesMessage(MacroscopWarningRecieved)
export class MacroscopWarningRecievedHandler {

  constructor (
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
    @inject(LOGGER_SYMBOLS.Logger) private readonly logger: Logger,
    @inject(REPOSITORIES.AccidentsRepository) private readonly accidentsRepository: Repository<Accident>,
    @inject(REPOSITORIES.AccidentTypesRepository) private readonly accidentTypesRepository: Repository<AccidentType>,
    @inject(REPOSITORIES.ObjectsRepository) private readonly objectsRepository: Repository<Objects>,
    @inject(REPOSITORIES.StatesRepository) private readonly statesRepository: Repository<States>
  ) {
  }

  private async createAccidentType(
    accidentName: string | undefined,
    accidentDescription?: string | undefined,
  ): Promise<AccidentType> {
    const { accidentTypesRepository } = this;
    const draftT = accidentTypesRepository.create()
    draftT.description = accidentDescription || 'n/a';
    draftT.name = accidentName || 'n/a';
    return accidentTypesRepository.save(draftT);
  }

  private async createNewDevice(
    deviceName: string | undefined,
  ): Promise<Objects> {
    const { objectsRepository } = this;
    const draft = objectsRepository.create()
    draft.name = deviceName || 'n/a';
    return objectsRepository.save(draft);
  }

  private async createNewState(
    state: string | undefined,
    timestamp: Date,
    device: Objects
  ): Promise<States> {
    const { statesRepository } = this;
    const draft = statesRepository.create()
    draft.name = state || 'unknown';
    draft.timeChanged = timestamp;
    draft.objectsFk = device;
    return statesRepository.save(draft);
  }

  async handle ({ macroscopEvent }: MacroscopWarningRecieved): Promise<void> {
    const {
      accidentsRepository,
      accidentTypesRepository,
      objectsRepository,
      statesRepository,
    } = this;
    this.logger.info(
      `MacroscopWarningRecieved event received, msg ${macroscopEvent.accidentName}...`,
      { macroscopEvent }
    );
    const draftA = accidentsRepository.create();
    try {
      if (!macroscopEvent.accidentTypeId) {
          let type = await accidentTypesRepository.findOne({ where: { name: macroscopEvent.accidentType} });
          if (!type) {
            type = await this.createAccidentType(macroscopEvent.accidentName);
          }
          draftA.accidentTypeFk = type;
      } else {
        let types = await accidentTypesRepository.findByIds([ macroscopEvent.accidentTypeId ]);
        if (types.length !== 0) {
          draftA.accidentTypeFk = types[0];
        } else {
          draftA.accidentTypeFk = await this.createAccidentType(macroscopEvent.accidentName);
        }
      }

      if (!macroscopEvent.deviceId) {
        draftA.objectsFk = await this.createNewDevice(macroscopEvent.deviceName);
      } else {
        let objects = await objectsRepository.findByIds([ macroscopEvent.deviceId ]);
        if (objects.length !== 0) {
          draftA.objectsFk = objects[0];
        } else {
          draftA.objectsFk = await this.createNewDevice(macroscopEvent.deviceName);
        }
      }
      this.createNewState(
        macroscopEvent.deviceState,
        macroscopEvent.timestamp,
        draftA.objectsFk,
      )
      draftA.timestamp = macroscopEvent.timestamp;
      await accidentsRepository.save(draftA);
    } catch (e) {
      this.logger.info(e);
    }
    await this.bus.publish(new MacroscopWarningRecorded(macroscopEvent));
  }

}
