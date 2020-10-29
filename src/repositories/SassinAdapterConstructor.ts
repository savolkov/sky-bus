import { config } from 'dotenv';
import { SassinApi } from '../libs/api/sassin';
import { SassinAdapter } from '../adapters/sassin';

const getSassinAdapter = () => {
  config();

  const api = new SassinApi(
    process.env.SASSIN_USER_ID || '',
    process.env.SASSIN_SECRET || '',
    process.env.SASSIN_HOST || '',
  );

  return new SassinAdapter(api);
};

export default getSassinAdapter;
