import 'reflect-metadata';
import * as bodyParser from 'body-parser';

import { BUS_SYMBOLS, ApplicationBootstrap } from '@node-ts/bus-core';
import { WINSTON_SYMBOLS } from '@node-ts/logger-winston';

import { WorkflowRegistry, BUS_WORKFLOW_SYMBOLS } from '@node-ts/bus-workflow';
import { InversifyExpressServer } from 'inversify-express-utils';
import { LoggerConfiguration } from './configuration';
import { ApplicationContainer } from './application-container';

import './endpoints/command/ping';
import './endpoints/command/macroscop';
import './endpoints/command/sputnik';
import './endpoints/command/sassin';
import './endpoints/event/sigur';
import {
  MacroscopWarningRecievedHandler,
} from './handlers';

import { SputnikOpenDoorHandler } from './handlers/sputnik/openDoor.handler';

import './endpoints/command/iridium';
import {
  MacroscopWarningWorkflow,
  MacroscopWarningWorkflowData,
} from './workflows';

import { IridiumTestWorkflow } from './workflows/iridium/iridium-test.workflow';
import { IridiumTestWorkflowData } from './workflows/iridium/iridium-test.workflow.data';

import { IridiumTestRecievedHandler } from './handlers/iridium/iridium-test-recieved.handler';
import { SassinChangeLineStateHandler } from './handlers/sassin/changeLineState.handler';
import { SassinLineStateChangedHandler } from './handlers/sassin/lineStateChanged.handler';
import { SassinLineStateChangeErrorHandler } from './handlers/sassin/lineStateChangeError.handler';

import {
  SigurGatewayAccessDeniedHandler,
  SigurGatewayAccessRequiredHandler,
  SigurGatewayPassedHandler,
} from './handlers/sigur';

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
  const PORT = 3000;
  app.listen(PORT);
  console.log('==========================================');
  console.log(`Server started at http://localhost:${PORT}`);
  console.log('==========================================\n');

  // bus
  const workflowRegistry = container.get<WorkflowRegistry>(BUS_WORKFLOW_SYMBOLS.WorkflowRegistry);
  workflowRegistry.register(MacroscopWarningWorkflow, MacroscopWarningWorkflowData);
  workflowRegistry.register(IridiumTestWorkflow, IridiumTestWorkflowData);
  await workflowRegistry.initializeWorkflows();

  const bootstrap = container.get<ApplicationBootstrap>(BUS_SYMBOLS.ApplicationBootstrap);
  bootstrap.registerHandler(MacroscopWarningRecievedHandler);
  bootstrap.registerHandler(SputnikOpenDoorHandler);
  bootstrap.registerHandler(IridiumTestRecievedHandler);
  bootstrap.registerHandler(SassinChangeLineStateHandler);
  bootstrap.registerHandler(SassinLineStateChangedHandler);
  bootstrap.registerHandler(SassinLineStateChangeErrorHandler);

  bootstrap.registerHandler(SigurGatewayAccessDeniedHandler);
  bootstrap.registerHandler(SigurGatewayAccessRequiredHandler);
  bootstrap.registerHandler(SigurGatewayPassedHandler);

  await bootstrap.initialize(container);
}

initialize()
  .then(() => console.log('started'))
  .catch((err) => {
    console.error(err);
  });
