import { HandlesMessage, BUS_SYMBOLS, Bus } from '@node-ts/bus-core';
import { inject } from 'inversify';
import { LOGGER_SYMBOLS, Logger } from '@node-ts/logger-core';
import { Repository } from 'typeorm';
import { SigurGatewayPassed } from '../../messages/sigur';
import { GatewayPassEvent } from '../../repositories/entities/GatewayPassEvent';
import { REPOSITORIES } from '../../repositories/types';

@HandlesMessage(SigurGatewayPassed)
export class SigurGatewayPassedHandler {
  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
    @inject(LOGGER_SYMBOLS.Logger) private readonly logger: Logger,
    @inject(REPOSITORIES.GatewayPassEventRepository)
    private readonly gatewayPassEventRepository: Repository<GatewayPassEvent>,
  ) {
  }

  private async createGatewayPassEvent( // TODO: вынести функцию для доступа из других файлов
    extenalId: number | null,
    isPassed: boolean,
    gatewayId: number,
    isIngoingDirection: boolean,
    personeId: string | null,
    passCardUuid: string | null,
    timestamp: number,
  ): Promise<GatewayPassEvent> {
    const { gatewayPassEventRepository } = this;
    const draft = gatewayPassEventRepository.create();
    draft.extenalId = extenalId;
    draft.isPassed = isPassed;
    draft.gatewayId = gatewayId;
    draft.isIngoingDirection = isIngoingDirection;
    draft.personeId = personeId;
    draft.passCardId = passCardUuid;
    draft.timestamp = timestamp;
    return gatewayPassEventRepository.save(draft);
  }

  async handle(sigurMessage: SigurGatewayPassed): Promise<void> {
    const { sigurEvent: event } = sigurMessage;

    this.createGatewayPassEvent(
      event.gatewayId,
      event.isGatewayPassed,
      event.gatewayId,
      event.isIngoingDirection,
      event.uuidPersone,
      event.passCardId,
      event.timestamp,
    );

    this.logger.info(
      `SigurGatewayPassed event received, device uuid: ${sigurMessage.sigurEvent.gatewayId}\n`,
      sigurMessage,
    );
  }
}
