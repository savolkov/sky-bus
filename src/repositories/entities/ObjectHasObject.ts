import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Objects } from "./Objects";

@Index("object_has_object_pk", ["id"], { unique: true })
@Index("object_has_object_id_uindex", ["id"], { unique: true })
@Entity("Object_Has_Object", { schema: "sky" })
export class ObjectHasObject {
  @PrimaryGeneratedColumn({ type: "integer", name: "Id" })
  id: number;

  @ManyToOne(() => Objects, (objects) => objects.objectHasObjects)
  @JoinColumn([{ name: "Child", referencedColumnName: "id" }])
  child: Objects;

  @ManyToOne(() => Objects, (objects) => objects.objectHasObjects2)
  @JoinColumn([{ name: "Parent", referencedColumnName: "id" }])
  parent: Objects;
}
