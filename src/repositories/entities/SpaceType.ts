import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Space } from "./Space";

@Index("spacetype_pk", ["id"], { unique: true })
@Index("spacetype_id_uindex", ["id"], { unique: true })
@Entity("SpaceType", { schema: "sky" })
export class SpaceType {
  @PrimaryGeneratedColumn({ type: "integer", name: "Id" })
  id: number;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("text", { name: "Description", nullable: true })
  description: string | null;

  @OneToMany(() => Space, (space) => space.typeFk)
  spaces: Space[];
}
