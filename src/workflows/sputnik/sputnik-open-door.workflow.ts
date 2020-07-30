import { Workflow, StartedBy, Handles } from '@node-ts/bus-workflow';
import { inject } from 'inversify';
import { BUS_SYMBOLS, Bus } from '@node-ts/bus-core';
import { SputnikOpenDoorCommandData } from './sputnik-open-door.workflow.data';
import { SputnikOpenDoor } from '../../messages/sputnik/open-door.event';

export class SputnikOpenDoorWorkflow extends Workflow<SputnikOpenDoorCommandData> {
  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
  ) {
    super();
  }

  @StartedBy<SputnikOpenDoor, SputnikOpenDoorCommandData, 'handlesSputnikOpenDoor'>(SputnikOpenDoor)
  handlesSputnikOpenDoor({ sputnikEvent }: SputnikOpenDoor): Partial<SputnikOpenDoorCommandData> {
    return this.complete();
  }
}
