import { getConnection } from 'typeorm';
import { ObjectHasObject } from './entities/ObjectHasObject';

const getObjectHasObjectRepository = () => {
  const conn = getConnection();
  return conn.getRepository(ObjectHasObject);
};

export default getObjectHasObjectRepository;
