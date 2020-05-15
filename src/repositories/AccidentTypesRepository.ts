import { getConnection } from "typeorm";
import { AccidentType } from "./entities/AccidentType";

const getAccidentTypeRepository = () => {
  const conn = getConnection();
  const accidentRepository = conn.getRepository(AccidentType);
  return accidentRepository;
}


export default getAccidentTypeRepository;
