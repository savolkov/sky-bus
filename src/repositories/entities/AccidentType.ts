import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Accident } from "./Accident";

@Index("accidenttype_pk", ["id"], { unique: true })
@Index("accidenttype_id_uindex", ["id"], { unique: true })
@Entity("AccidentType", { schema: "sky" })
export class AccidentType {
  @PrimaryGeneratedColumn({ type: "integer", name: "Id" })
  id: number;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("text", { name: "Description", nullable: true })
  description: string | null;

  @OneToMany(() => Accident, (accident) => accident.accidentTypeFk)
  accidents: Accident[];
}
