import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('switch_event_pk', ['id'], { unique: true })
@Index('switch_event_id_uindex', ['id'], { unique: true })
@Entity('switch_event', { schema: 'sky' })
export class AutomaticSwitchEvent {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 's_device_id', nullable: true })
  deviceId: string;

  @Column('integer', { name: 'line_id' })
  lineId: number | null;

  @Column('boolean', { name: 'is_turned_on' })
  isTurnedOn: boolean;

  @Column('boolean', { name: 'is_succeed' })
  isSucceed: boolean;

  @Column('integer', { name: 'timestamp' })
  timestamp: number;
}
