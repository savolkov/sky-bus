import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Objects } from "./Objects";

@Index("states_id_uindex", ["id"], { unique: true })
@Index("states_pk", ["id"], { unique: true })
@Entity("States", { schema: "sky" })
export class States {
  @PrimaryGeneratedColumn({ type: "integer", name: "Id" })
  id: number;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("integer", { name: "Description", nullable: true })
  description: number | null;

  @Column("double precision", { name: "Value", nullable: true, precision: 53 })
  value: number | null;

  @Column("timestamp without time zone", {
    name: "TimeChanged",
    nullable: true,
  })
  timeChanged: Date | null;

  @ManyToOne(() => Objects, (objects) => objects.states)
  @JoinColumn([{ name: "Objects_fk", referencedColumnName: "id" }])
  objectsFk: Objects;
}
