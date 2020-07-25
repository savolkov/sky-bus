import { getConnection } from 'typeorm';
import { Variable } from './entities/Variable';

const getVariablesRepository = () => {
  const conn = getConnection();
  return conn.getRepository(Variable);
};

export default getVariablesRepository;
