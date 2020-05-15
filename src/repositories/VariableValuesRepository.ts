import { getConnection } from "typeorm";
import { VariableValue } from "./entities/VariableValue";

const getVariableValuesRepository = () => {
  const conn = getConnection();
  return conn.getRepository(VariableValue);
}

export default getVariableValuesRepository;
