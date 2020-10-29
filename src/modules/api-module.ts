/* eslint max-len: 0 */
import { AsyncContainerModule } from 'inversify';
import { SassinAdapter } from 'adapters/sassin';
import { ADAPTERS } from '../repositories/types';
import getSassinAdapter from '../repositories/SassinAdapterConstructor';

const ApiModule = new AsyncContainerModule(async (bind) => {
  bind<SassinAdapter>(ADAPTERS.Sassin).toDynamicValue(() => getSassinAdapter()).inRequestScope();
});

export default ApiModule;
