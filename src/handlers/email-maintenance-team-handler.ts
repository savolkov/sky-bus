import { HandlesMessage, Bus, BUS_SYMBOLS } from '@node-ts/bus-core'
import { EmailMaintenanceTeam, MaintenanceTeamEmailed } from '../messages'
import { inject } from 'inversify'
import { LOGGER_SYMBOLS, Logger } from '@node-ts/logger-core'
import { TYPE } from '../repositories/types';
import { Repository } from 'typeorm';
import { Units } from '../repositories/entities/Units';

@HandlesMessage(EmailMaintenanceTeam)
export class EmailMaintenanceTeamHandler {

  constructor (
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
    @inject(LOGGER_SYMBOLS.Logger) private readonly logger: Logger,
    @inject(TYPE.UnitsRepository) private readonly units: Repository<Units>
  ) {
  }

  async handle ({ message, sirenId }: EmailMaintenanceTeam): Promise<void> {
    this.logger.info('Sending email to maintenance team to fix siren', { message, sirenId })
    // Send the email
    const u = this.units.create();
    u.name = sirenId;
    u.description = 'email';
    this.units.save(u)
      .then(() => console.log('AAAAAAA'))
      .catch((err) => this.logger.error(err));
    const maintenanceTeamEmailed = new MaintenanceTeamEmailed(sirenId)
    await this.bus.publish(maintenanceTeamEmailed)
  }
}
