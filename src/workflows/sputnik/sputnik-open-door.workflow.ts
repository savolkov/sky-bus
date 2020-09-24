import { Workflow, StartedBy, Handles } from '@node-ts/bus-workflow';
import { inject } from 'inversify';
import { BUS_SYMBOLS, Bus } from '@node-ts/bus-core';
import { SputnikOpenDoorCommandData } from './sputnik-open-door.workflow.data';
import { SputnikDoorOpenedCommandData } from './sputnik-door-opened.workflow.data';
import { SputnikOpenDoorErrorCommandData } from './sputnik-open-door-error.workflow.data';
import { SputnikOpenDoor } from '../../messages/sputnik/openDoor.event';
import { SputnikDoorOpened } from '../../messages/sputnik/doorOpened.event';
import { SputnikOpenDoorError } from '../../messages/sputnik/openDoorError.event';

export class SputnikOpenDoorWorkflow extends Workflow<SputnikOpenDoorCommandData> {
  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
  ) {
    super();
  }

  // eslint-disable-next-line max-len
  @StartedBy<SputnikOpenDoor, SputnikOpenDoorCommandData, 'handlesSputnikOpenDoor'>(SputnikOpenDoor)
  handlesSputnikOpenDoor({ sputnikEvent }: SputnikOpenDoor): Partial<SputnikOpenDoorCommandData> {
    return {
      sputnikEvent,
    };
  }

  @Handles<SputnikDoorOpened, SputnikDoorOpenedCommandData, 'handlesSputnikDoorOpened'>(
    SputnikDoorOpened,
    (event) => event.$name,
    'sputnikEvent',
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handlesSputnikDoorOpened(_: SputnikDoorOpened):
  Promise<Partial<SputnikDoorOpenedCommandData>> {
    return this.complete();
  }

  @Handles<SputnikOpenDoorError, SputnikOpenDoorErrorCommandData, 'handlesSputnikOpenDoorError'>(
    SputnikOpenDoorError,
    (event) => event.$name,
    'sputnikEvent',
  )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handlesSputnikOpenDoorError(_: SputnikOpenDoorError):
  Promise<Partial<SputnikOpenDoorErrorCommandData>> {
    return this.complete();
  }
}
