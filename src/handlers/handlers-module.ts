import { ContainerModule } from 'inversify';
import { bindLogger } from '@node-ts/logger-core';
import { MacroscopWarningRecievedHandler } from './macroscop/macroscop-warning-recieved.handler';
import { SputnikOpenDoorHandler } from './sputnik/open-door.handler';

export class HandlersModule extends ContainerModule {
  constructor() {
    super((bind) => {
      bindLogger(bind, MacroscopWarningRecievedHandler);
      bindLogger(bind, SputnikOpenDoorHandler);
    });
  }
}
