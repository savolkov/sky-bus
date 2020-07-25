import { getConnection } from 'typeorm';
import { Units } from './entities/Units';

const getUnitsRepository = () => {
  const conn = getConnection();
  return conn.getRepository(Units);
};

export default getUnitsRepository;
