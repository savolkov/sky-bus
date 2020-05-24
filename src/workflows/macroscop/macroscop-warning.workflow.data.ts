import { WorkflowData } from '@node-ts/bus-workflow'
import { MacroscopWarning } from '../../types/macroscopWarning';

export class MacroscopWarningWorkflowData extends WorkflowData {
  $name = 'macroscop/warning-data'

  macroscopEvent: MacroscopWarning
  logsWritten: boolean
}
