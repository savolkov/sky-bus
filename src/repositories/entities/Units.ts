import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Variable } from "./Variable";

@Index("units_pk", ["id"], { unique: true })
@Index("units_id_uindex", ["id"], { unique: true })
@Entity("Units", { schema: "sky" })
export class Units {
  @PrimaryGeneratedColumn({ type: "integer", name: "Id" })
  id: number;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("text", { name: "Description", nullable: true })
  description: string | null;

  @OneToMany(() => Variable, (variable) => variable.unitFk)
  variables: Variable[];
}
