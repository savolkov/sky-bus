import { WorkflowData } from '@node-ts/bus-workflow';
import { SputnikDoorTriedToOpen } from '../../types/sputnik/doorTriedToOpen';

export class SputnikDoorOpenedCommandData extends WorkflowData {
  $name = 'sputnik/open-door-success';

  sputnikEvent: SputnikDoorTriedToOpen;

  logsWritten: boolean;
}
