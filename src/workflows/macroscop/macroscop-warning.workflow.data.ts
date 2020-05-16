import { WorkflowData } from '@node-ts/bus-workflow'

export class MacroscopWarningWorkflowData extends WorkflowData {
  $name = 'macroscop/warning-data'

  message: string
  logsWritten: boolean
}
