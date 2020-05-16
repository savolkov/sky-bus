import 'reflect-metadata'
import * as bodyParser from 'body-parser';

import { ApplicationContainer } from './application-container'
import { BUS_SYMBOLS, Bus, ApplicationBootstrap } from '@node-ts/bus-core'
import { WINSTON_SYMBOLS } from '@node-ts/logger-winston'
import { LoggerConfiguration } from './configuration'

import { WorkflowRegistry, BUS_WORKFLOW_SYMBOLS } from '@node-ts/bus-workflow'
import { InversifyExpressServer } from 'inversify-express-utils';

import './endpoints/ping.controller';
import './endpoints/macroscop.controller';
import { MacroscopWarningWorkflow, MacroscopWarningWorkflowData } from './workflows';
import { MacroscopWarningRecievedHandler } from './handlers';

const container = new ApplicationContainer()
container.rebind(WINSTON_SYMBOLS.WinstonConfiguration).to(LoggerConfiguration)

async function initialize(): Promise<void> {
  // express

  // create server
  let server = new InversifyExpressServer(container);
  server.setConfig((app) => {
    app.use(bodyParser.json())
  });

  let app = server.build();
  app.listen(3000);

  // bus
  const workflowRegistry = container.get<WorkflowRegistry>(BUS_WORKFLOW_SYMBOLS.WorkflowRegistry)
  workflowRegistry.register(MacroscopWarningWorkflow, MacroscopWarningWorkflowData)
  await workflowRegistry.initializeWorkflows()

  const bootstrap = container.get<ApplicationBootstrap>(BUS_SYMBOLS.ApplicationBootstrap)
  bootstrap.registerHandler(MacroscopWarningRecievedHandler)

  await bootstrap.initialize(container)
}

initialize()
  .then(() => console.log('started'))
  .catch(err => {
    console.error(err)
  })
