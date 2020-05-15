import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Objects } from "./Objects";
import { Units } from "./Units";
import { VariableValue } from "./VariableValue";

@Index("variable_pk", ["id"], { unique: true })
@Index("variable_id_uindex", ["id"], { unique: true })
@Entity("Variable", { schema: "sky" })
export class Variable {
  @PrimaryGeneratedColumn({ type: "integer", name: "Id" })
  id: number;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("real", { name: "Value", precision: 24 })
  value: number;

  @Column("text", { name: "Description", nullable: true })
  description: string | null;

  @ManyToOne(() => Objects, (objects) => objects.variables)
  @JoinColumn([{ name: "Objects_fk", referencedColumnName: "id" }])
  objectsFk: Objects;

  @ManyToOne(() => Units, (units) => units.variables)
  @JoinColumn([{ name: "Unit_fk", referencedColumnName: "id" }])
  unitFk: Units;

  @OneToMany(() => VariableValue, (variableValue) => variableValue.variableFk)
  variableValues: VariableValue[];
}
