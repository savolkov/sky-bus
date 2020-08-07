import { Workflow, StartedBy } from '@node-ts/bus-workflow';
import { inject } from 'inversify';
import { BUS_SYMBOLS, Bus } from '@node-ts/bus-core';
import { 
  SputnikOpenDoorCommandData, 
  SputnikDoorOpenedCommandData, 
  SputnikOpenDoorErrorCommandData 
} from './sputnik-open-door.workflow.data';
import { SputnikOpenDoor } from '../../messages/sputnik/openDoor.event';
import { SputnikDoorOpened } from '../../messages/sputnik/doorOpened.event';
import { SputnikOpenDoorError } from '../../messages/sputnik/openDoorError.event';

export class SputnikOpenDoorWorkflow extends Workflow<SputnikOpenDoorCommandData> {
  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
  ) {
    super();
  }

  @StartedBy<SputnikOpenDoor, SputnikOpenDoorCommandData, 'handlesSputnikOpenDoor'>(SputnikOpenDoor)
  handlesSputnikOpenDoor(): Partial<SputnikOpenDoorCommandData> {

    return this.complete();
  }

  @Handles<SputnikDoorOpened, SputnikDoorOpenedCommandData, 'handlesSputnikDoorOpened'>(SputnikDoorOpened)
  async handlesSputnikDoorOpened(_: SputnikDoorOpened): Promise<Partial<SputnikDoorOpenedCommandData>> {
    // TODO: понять что ему не нравится
    // понять где отлавливаются события и делаются действия
    // return this.complete();
  }

  @Handles<SputnikOpenDoorError, SputnikOpenDoorErrorCommandData, 'handlesSputnikOpenDoorError'>(SputnikOpenDoorError)
  async handlesSputnikOpenDoorError(_: SputnikOpenDoorError): Promise<Partial<SputnikOpenDoorErrorCommandData>> {
    // return this.complete();
  }
}
