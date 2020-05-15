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
import { SpaceType } from "./SpaceType";

@Index("space_pk", ["id"], { unique: true })
@Index("space_id_uindex", ["id"], { unique: true })
@Entity("Space", { schema: "sky" })
export class Space {
  @PrimaryGeneratedColumn({ type: "integer", name: "Id" })
  id: number;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("text", { name: "Description", nullable: true })
  description: string | null;

  @OneToMany(() => Objects, (objects) => objects.spaceFk)
  objects: Objects[];

  @ManyToOne(() => SpaceType, (spaceType) => spaceType.spaces)
  @JoinColumn([{ name: "Type_fk", referencedColumnName: "id" }])
  typeFk: SpaceType;
}
