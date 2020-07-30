import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccidentType } from './AccidentType';
import { Objects } from './Objects';

@Index('accident_pk', ['id'], { unique: true })
@Index('accident_id_uindex', ['id'], { unique: true })
@Entity('Accident', { schema: 'sky' })
export class Accident {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'Id' })
  id: number;

  @Column('integer', { name: 'Data', nullable: true })
  data: number | null;

  @Column('timestamp without time zone', { name: 'Timestamp' })
  timestamp: Date;

  @ManyToOne(() => AccidentType, (accidentType) => accidentType.accidents)
  @JoinColumn([{ name: 'AccidentType_fk', referencedColumnName: 'id' }])
  accidentTypeFk: AccidentType;

  @ManyToOne(() => Objects, (objects) => objects.accidents)
  @JoinColumn([{ name: 'Objects_fk', referencedColumnName: 'id' }])
  objectsFk: Objects;
}
