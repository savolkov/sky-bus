import { Workflow, StartedBy, Handles } from '@node-ts/bus-workflow';
import { inject } from 'inversify';
import { BUS_SYMBOLS, Bus } from '@node-ts/bus-core';
import { MacroscopWarningWorkflowData } from './macroscop-warning.workflow.data';
import { MacroscopWarningRecieved } from '../../messages';
import { MacroscopWarningRecorded } from '../../messages/macroscop/macroscop-warning-recorded.event';

export class MacroscopWarningWorkflow extends Workflow<MacroscopWarningWorkflowData> {
  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
  ) {
    super();
  }

  @StartedBy<MacroscopWarningRecieved, MacroscopWarningWorkflowData, 'handlesMacroscopWarningRecieved'>(MacroscopWarningRecieved)
  handlesMacroscopWarningRecieved(
    { macroscopEvent }: MacroscopWarningRecieved,
  ): Partial<MacroscopWarningWorkflowData> {
    return {
      macroscopEvent,
    };
  }

  @Handles<MacroscopWarningRecorded, MacroscopWarningWorkflowData, 'handlesMacroscopWarningRecorded'>(
    MacroscopWarningRecorded,
    (event) => event.macroscopEvent.accidentName,
    'macroscopEvent',
  )
  async handlesMacroscopWarningRecorded(): Promise<Partial<MacroscopWarningWorkflowData>> {
    return this.complete();
  }
}
