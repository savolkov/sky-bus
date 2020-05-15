import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Variable } from "./Variable";

@Index("variablevalue_pk", ["id"], { unique: true })
@Index("variablevalue_id_uindex", ["id"], { unique: true })
@Entity("VariableValue", { schema: "sky" })
export class VariableValue {
  @PrimaryGeneratedColumn({ type: "integer", name: "Id" })
  id: number;

  @Column("real", { name: "Value", precision: 24 })
  value: number;

  @Column("timestamp without time zone", { name: "Timestamp" })
  timestamp: Date;

  @ManyToOne(() => Variable, (variable) => variable.variableValues)
  @JoinColumn([{ name: "Variable_fk", referencedColumnName: "id" }])
  variableFk: Variable;
}
