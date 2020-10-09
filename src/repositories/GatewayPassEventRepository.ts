import { getConnection } from 'typeorm';
import { GatewayPassEvent } from './entities/GatewayPassEvent';

const getGatewayPassEventRepository = () => {
  const conn = getConnection();
  const GatewayPassEventRepository = conn.getRepository(GatewayPassEvent);
  return GatewayPassEventRepository;
};

export default getGatewayPassEventRepository;
