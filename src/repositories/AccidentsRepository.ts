import { getConnection } from "typeorm";
import { Accident } from "./entities/Accident";

const getAccidentsRepository = () => {
  const conn = getConnection();
  const accidentRepository = conn.getRepository(Accident);
  return accidentRepository;
}


export default getAccidentsRepository;
