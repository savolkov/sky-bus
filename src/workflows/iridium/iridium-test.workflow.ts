import { Workflow, StartedBy, Handles } from '@node-ts/bus-workflow';
import { inject } from 'inversify';
import { BUS_SYMBOLS, Bus } from '@node-ts/bus-core';
import { IridiumTestWorkflowData } from './iridium-test.workflow.data';
import { IridiumTestPassedEvent, IridiumTestRecievedEvent } from '../../messages';

export class IridiumTestWorkflow extends Workflow<IridiumTestWorkflowData> {
  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
  ) {
    super();
  }

  @StartedBy<IridiumTestRecievedEvent, IridiumTestWorkflowData, 'handlesIridiumTestRecieved'>(IridiumTestRecievedEvent)
  handlesIridiumTestRecieved(
    { iridiumEvent }: IridiumTestRecievedEvent,
  ): Partial<IridiumTestWorkflowData> {
    return {
      iridiumEvent,
    };
  }

  @Handles<IridiumTestPassedEvent, IridiumTestWorkflowData, 'handlesIridiumTestPassed'>(
    IridiumTestPassedEvent,
    (event) => event.iridiumEvent.description,
    'iridiumEvent',
  )
  async handlesIridiumTestPassed(): Promise<Partial<IridiumTestWorkflowData>> {
    return this.complete();
  }
}
