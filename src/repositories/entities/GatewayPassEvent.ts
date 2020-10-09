import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('gateway_pass_event_pk', ['id'], { unique: true })
@Index('gateway_pass_event_id_uindex', ['id'], { unique: true })
@Entity('gateway_pass_event', { schema: 'sky' })
export class GatewayPassEvent {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'ext_id', nullable: true })
  extenalId: number | null;

  @Column('boolean', { name: 'is_passed' })
  isPassed: boolean;

  @Column('integer', { name: 'gateway_id' })
  gatewayId: number;

  @Column('boolean', { name: 'is_in_direction' })
  isIngoingDirection: boolean;

  @Column('character varying', { name: 's_persone_id' })
  personeId: string | null;

  @Column('character varying', { name: 's_card_id' })
  passCardId: string | null;

  @Column('timestamp without time zone', { name: 'timestamp' })
  timestamp: number;
}
