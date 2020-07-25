/* eslint max-len: 0 */
import { AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';
import { getDbConnection } from '../repositories/dbConnection';
import { Accident } from '../repositories/entities/Accident';
import { REPOSITORIES } from '../repositories/types';
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

  bind<Repository<Accident>>(REPOSITORIES.AccidentsRepository).toDynamicValue(() => getAccidentsRepository()).inRequestScope();
  bind<Repository<AccidentType>>(REPOSITORIES.AccidentTypesRepository).toDynamicValue(() => getAccidentTypeRepository()).inRequestScope();
  bind<Repository<ObjectHasObject>>(REPOSITORIES.ObjectHasObjectRepository).toDynamicValue(() => getObjectHasObjectRepository()).inRequestScope();
  bind<Repository<Space>>(REPOSITORIES.SpacesRepository).toDynamicValue(() => getSpacesRepository()).inRequestScope();
  bind<Repository<SpaceType>>(REPOSITORIES.SpaceTypesRepository).toDynamicValue(() => getSpaceTypesRepository()).inRequestScope();
  bind<Repository<States>>(REPOSITORIES.StatesRepository).toDynamicValue(() => getStatesRepository()).inRequestScope();
  bind<Repository<Units>>(REPOSITORIES.UnitsRepository).toDynamicValue(() => getUnitsRepository()).inRequestScope();
  bind<Repository<Variable>>(REPOSITORIES.VariablesRepository).toDynamicValue(() => getVariablesRepository()).inRequestScope();
  bind<Repository<VariableValue>>(REPOSITORIES.VariableValuesRepository).toDynamicValue(() => getVariableValuesRepository()).inRequestScope();

  bind<Repository<Objects>>(REPOSITORIES.ObjectsRepository).toDynamicValue(() => getObjectsRepository()).inRequestScope();
});

export default TypeormModule;
