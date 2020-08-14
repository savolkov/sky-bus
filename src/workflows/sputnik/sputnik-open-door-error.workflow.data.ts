import { WorkflowData } from '@node-ts/bus-workflow';
import { SputnikDoorTriedToOpen } from '../../types/sputnik/doorTriedToOpen';

export class SputnikOpenDoorErrorCommandData extends WorkflowData {
  $name = 'sputnik/open-door-error';

  sputnikEvent: SputnikDoorTriedToOpen;

  logsWritten: boolean;
}
