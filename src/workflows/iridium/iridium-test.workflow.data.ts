import { WorkflowData } from '@node-ts/bus-workflow';
import { IridiumTest } from '../../types/iridumTest';

export class IridiumTestWorkflowData extends WorkflowData {
  $name = 'iridium/test-data';

  iridiumEvent: IridiumTest;

  logsWritten: boolean;
}
