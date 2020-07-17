import 'reflect-metadata';
import * as bodyParser from 'body-parser';

import { BUS_SYMBOLS, ApplicationBootstrap } from '@node-ts/bus-core';
import { WINSTON_SYMBOLS } from '@node-ts/logger-winston';

import { WorkflowRegistry, BUS_WORKFLOW_SYMBOLS } from '@node-ts/bus-workflow';
import { InversifyExpressServer } from 'inversify-express-utils';
import { LoggerConfiguration } from './configuration';
import { ApplicationContainer } from './application-container';

import './endpoints/ping.controller';
import './endpoints/macroscop.controller';
import './endpoints/iridium.controller';
import {
  IridiumTestWorkflow,
  IridiumTestWorkflowData,
  MacroscopWarningWorkflow,
  MacroscopWarningWorkflowData,
} from './workflows';
import { MacroscopWarningRecievedHandler } from './handlers';
import { IridiumTestRecievedHandler } from './handlers/iridium/iridium-test-recieved.handler';

const container = new ApplicationContainer();
container.rebind(WINSTON_SYMBOLS.WinstonConfiguration).to(LoggerConfiguration);

async function initialize(): Promise<void> {
  // express

  // create server
  const server = new InversifyExpressServer(container);
  server.setConfig((app) => {
    app.use(bodyParser.json());
  });

  const app = server.build();
  app.listen(3000);

  // bus
  const workflowRegistry = container.get<WorkflowRegistry>(BUS_WORKFLOW_SYMBOLS.WorkflowRegistry);
  workflowRegistry.register(MacroscopWarningWorkflow, MacroscopWarningWorkflowData);
  workflowRegistry.register(IridiumTestWorkflow, IridiumTestWorkflowData);
  await workflowRegistry.initializeWorkflows();

  const bootstrap = container.get<ApplicationBootstrap>(BUS_SYMBOLS.ApplicationBootstrap);
  bootstrap.registerHandler(MacroscopWarningRecievedHandler);
  bootstrap.registerHandler(IridiumTestRecievedHandler);

  await bootstrap.initialize(container);
}

initialize()
  .then(() => console.log('started'))
  .catch((err) => {
    console.error(err);
  });
