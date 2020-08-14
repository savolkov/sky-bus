import { ContainerModule } from 'inversify';
import { bindLogger } from '@node-ts/logger-core';
import { MacroscopWarningRecievedHandler } from './macroscop/macroscop-warning-recieved.handler';
import { SputnikOpenDoorHandler } from './sputnik/openDoor.handler';
import { SputnikDoorOpenedHandler } from './sputnik/doorOpened.handler';
import { SputnikOpenDoorErrorHandler } from './sputnik/openDoorError.handler';
import { IridiumTestRecievedHandler } from './iridium/iridium-test-recieved.handler';

export class HandlersModule extends ContainerModule {
  constructor() {
    super((bind) => {
      bindLogger(bind, MacroscopWarningRecievedHandler);
      bindLogger(bind, SputnikOpenDoorHandler);
      bindLogger(bind, SputnikDoorOpenedHandler);
      bindLogger(bind, SputnikOpenDoorErrorHandler);
      bindLogger(bind, IridiumTestRecievedHandler);
    });
  }
}
