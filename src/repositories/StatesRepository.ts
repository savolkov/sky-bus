import { getConnection } from 'typeorm';
import { States } from './entities/States';

const getStatesRepository = () => {
  const conn = getConnection();
  return conn.getRepository(States);
};

export default getStatesRepository;
