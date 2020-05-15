import { getConnection } from "typeorm";
import { Space } from "./entities/Space";

const getSpacesRepository = () => {
  const conn = getConnection();
  return conn.getRepository(Space);
}

export default getSpacesRepository;
