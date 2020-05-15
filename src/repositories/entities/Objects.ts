import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Accident } from "./Accident";
import { ObjectHasObject } from "./ObjectHasObject";
import { Space } from "./Space";
import { States } from "./States";
import { Variable } from "./Variable";

@Index("objects_id_uindex", ["id"], { unique: true })
@Index("objects_pk", ["id"], { unique: true })
@Entity("Objects", { schema: "sky" })
export class Objects {
  @PrimaryGeneratedColumn({ type: "integer", name: "Id" })
  id: number;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("text", { name: "Description", nullable: true })
  description: string | null;

  @Column("integer", { name: "State_fk", nullable: true })
  stateFk: number | null;

  @OneToMany(() => Accident, (accident) => accident.objectsFk)
  accidents: Accident[];

  @OneToMany(() => ObjectHasObject, (objectHasObject) => objectHasObject.child)
  objectHasObjects: ObjectHasObject[];

  @OneToMany(() => ObjectHasObject, (objectHasObject) => objectHasObject.parent)
  objectHasObjects2: ObjectHasObject[];

  @ManyToOne(() => Space, (space) => space.objects)
  @JoinColumn([{ name: "Space_fk", referencedColumnName: "id" }])
  spaceFk: Space;

  @OneToMany(() => States, (states) => states.objectsFk)
  states: States[];

  @OneToMany(() => Variable, (variable) => variable.objectsFk)
  variables: Variable[];
}
