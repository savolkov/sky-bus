import { getConnection } from 'typeorm';
import { AutomaticSwitchEvent } from './entities/AutomaticSwitchEvent';

const getAutomaticSwitchEventRepository = () => {
  const conn = getConnection();
  const automaticSwitchEventRepository = conn.getRepository(AutomaticSwitchEvent);
  return automaticSwitchEventRepository;
};

export default getAutomaticSwitchEventRepository;
