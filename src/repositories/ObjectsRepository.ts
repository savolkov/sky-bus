import { getConnection } from 'typeorm';
import { Objects } from './entities/Objects';

const getObjectsRepository = () => {
  const conn = getConnection();
  return conn.getRepository(Objects);
};

export default getObjectsRepository;
