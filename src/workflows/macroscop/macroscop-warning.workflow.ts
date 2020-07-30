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
<<<<<<< HEAD
  handlesMacroscopWarningRecieved(
    { macroscopEvent }: MacroscopWarningRecieved,
  ): Partial<MacroscopWarningWorkflowData> {
=======
  handlesMacroscopWarningRecieved({ macroscopEvent }: MacroscopWarningRecieved): Partial<MacroscopWarningWorkflowData> {
>>>>>>> Add: basic integration with Sputnik && eslint auto fix
    return {
      macroscopEvent,
    };
  }

  @Handles<MacroscopWarningRecorded, MacroscopWarningWorkflowData, 'handlesMacroscopWarningRecorded'>(
    MacroscopWarningRecorded,
    (event) => event.macroscopEvent.accidentName,
    'macroscopEvent',
  )
<<<<<<< HEAD
  async handlesMacroscopWarningRecorded(): Promise<Partial<MacroscopWarningWorkflowData>> {
=======
  async handlesMacroscopWarningRecorded(_: MacroscopWarningRecorded): Promise<Partial<MacroscopWarningWorkflowData>> {
>>>>>>> Add: basic integration with Sputnik && eslint auto fix
    return this.complete();
  }
}
