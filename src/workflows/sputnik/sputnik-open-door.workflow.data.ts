import { WorkflowData } from '@node-ts/bus-workflow';
import { SputnikOpenDoorCommand } from '../../types/sputnik/openDoorCommand';
import { SputnikDoorTriedToOpen } from '../../types/sputnik/doorTriedToOpen';

export class SputnikOpenDoorCommandData extends WorkflowData {
  $name = 'sputnik/open-door';

  sputnikEvent: SputnikOpenDoorCommand;

  logsWritten: boolean;
}

export class SputnikOpenDoorErrorCommandData extends WorkflowData {
  $name = 'sputnik/open-door-error';

  sputnikEvent: SputnikDoorTriedToOpen;

  logsWritten: boolean;
}

export class SputnikDoorOpenedCommandData extends WorkflowData {
  $name = 'sputnik/open-door-success';

  sputnikEvent: SputnikDoorTriedToOpen;

  logsWritten: boolean;
}
