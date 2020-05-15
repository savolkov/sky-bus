import { AsyncContainerModule } from 'inversify';
import { getDbConnection } from '../dbConnection';
import { Repository } from 'typeorm';
import { Accident } from '../repositories/entities/Accident';
import { TYPE } from '../repositories/types';
import getAccidentsRepository from '../repositories/AccidentsRepository';
import getUnitsRepository from '../repositories/UnitsRepository';
import { Units } from '../repositories/entities/Units';
import { AccidentType } from '../repositories/entities/AccidentType';
import getAccidentTypeRepository from '../repositories/AccidentTypesRepository';
import { ObjectHasObject } from '../repositories/entities/ObjectHasObject';
import { SpaceType } from '../repositories/entities/SpaceType';
import { States } from '../repositories/entities/States';
import { Variable } from '../repositories/entities/Variable';
import { VariableValue } from '../repositories/entities/VariableValue';
import { Space } from '../repositories/entities/Space';
import getVariableValuesRepository from '../repositories/VariableValuesRepository';
import getVariablesRepository from '../repositories/VariablesRepository';
import getStatesRepository from '../repositories/StatesRepository';
import getSpaceTypesRepository from '../repositories/SpaceTypesRepository';
import getSpacesRepository from '../repositories/SpacesRepository';
import getObjectHasObjectRepository from '../repositories/ObjectHasObjectRepository';
import getObjectsRepository from '../repositories/ObjectsRepository';
import { Objects } from '../repositories/entities/Objects';

const TypeormModule = new AsyncContainerModule(async (bind) => {
  await getDbConnection();

  bind<Repository<Accident>>(TYPE.AccidentRepository).toDynamicValue(() => getAccidentsRepository()).inRequestScope();
  bind<Repository<AccidentType>>(TYPE.AccidentTypesRepository).toDynamicValue(() => getAccidentTypeRepository()).inRequestScope();
  bind<Repository<ObjectHasObject>>(TYPE.ObjectHasObjectRepository).toDynamicValue(() => getObjectHasObjectRepository()).inRequestScope();
  bind<Repository<Space>>(TYPE.SpacesRepository).toDynamicValue(() => getSpacesRepository()).inRequestScope();
  bind<Repository<SpaceType>>(TYPE.SpaceTypesRepository).toDynamicValue(() => getSpaceTypesRepository()).inRequestScope();
  bind<Repository<States>>(TYPE.StatesRepository).toDynamicValue(() => getStatesRepository()).inRequestScope();
  bind<Repository<Units>>(TYPE.UnitsRepository).toDynamicValue(() => getUnitsRepository()).inRequestScope();
  bind<Repository<Variable>>(TYPE.VariablesRepository).toDynamicValue(() => getVariablesRepository()).inRequestScope();
  bind<Repository<VariableValue>>(TYPE.VariableValuesRepository).toDynamicValue(() => getVariableValuesRepository()).inRequestScope();

  bind<Repository<Objects>>(TYPE.ObjectsRepository).toDynamicValue(() => getObjectsRepository()).inRequestScope();
});

export default TypeormModule;
