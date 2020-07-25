import { getConnection } from 'typeorm';
import { SpaceType } from './entities/SpaceType';

const getSpaceTypesRepository = () => {
  const conn = getConnection();
  return conn.getRepository(SpaceType);
};

export default getSpaceTypesRepository;
