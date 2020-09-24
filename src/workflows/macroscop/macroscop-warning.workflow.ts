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

  // eslint-disable-next-line max-len
  @StartedBy<MacroscopWarningRecieved, MacroscopWarningWorkflowData, 'handlesMacroscopWarningRecieved'>(MacroscopWarningRecieved)
  handlesMacroscopWarningRecieved(
    { macroscopEvent }: MacroscopWarningRecieved,
  ): Partial<MacroscopWarningWorkflowData> {
    return {
      macroscopEvent,
    };
  }

  // eslint-disable-next-line max-len
  @Handles<MacroscopWarningRecorded, MacroscopWarningWorkflowData, 'handlesMacroscopWarningRecorded'>(
    MacroscopWarningRecorded,
    (event) => event.macroscopEvent.accidentName,
    'macroscopEvent',
  )
  async handlesMacroscopWarningRecorded(
    _: MacroscopWarningRecorded, // eslint-disable-line @typescript-eslint/no-unused-vars
  ):
    Promise<Partial<MacroscopWarningWorkflowData>> {
    return this.complete();
  }
}
