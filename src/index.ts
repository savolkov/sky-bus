import 'reflect-metadata'
import * as bodyParser from 'body-parser';

import { ApplicationContainer } from './application-container'
import { BUS_SYMBOLS, Bus, ApplicationBootstrap } from '@node-ts/bus-core'
import { generateUuid } from './messages/uuid'
import { WINSTON_SYMBOLS } from '@node-ts/logger-winston'
import { LoggerConfiguration } from './configuration'

import { StartSirenTest } from './messages'
import { StartSirenTestHandler, EmailMaintenanceTeamHandler } from './handlers'
import { WorkflowRegistry, BUS_WORKFLOW_SYMBOLS } from '@node-ts/bus-workflow'
import { SirenTestWorkflowData, SirenTestWorkflow } from './workflows'
import { InversifyExpressServer } from 'inversify-express-utils';

import './endpoints/ping.controller';
import { bindLogger, LoggerModule } from '@node-ts/logger-core';
import { PingController } from './endpoints/ping.controller';
import { LOGGER_SYMBOLS } from '@node-ts/logger-core/src/logger-symbols';
import { LoggerFactory } from '@node-ts/logger-core/src/logger-factory';

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
  workflowRegistry.register(SirenTestWorkflow, SirenTestWorkflowData)
  await workflowRegistry.initializeWorkflows()

  const bootstrap = container.get<ApplicationBootstrap>(BUS_SYMBOLS.ApplicationBootstrap)
  bootstrap.registerHandler(StartSirenTestHandler)
  bootstrap.registerHandler(EmailMaintenanceTeamHandler)

  await bootstrap.initialize(container)
}

async function runDemo (): Promise<void> {
  const bus = container.get<Bus>(BUS_SYMBOLS.Bus)
  await bus.send(new StartSirenTest(generateUuid()))
}

initialize()
  .then(runDemo)
  .catch(err => {
    console.error(err)
  })
