/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class Todo {
  @Is(an.objectId())
  _id?: ObjectId;

  /**
   * @description Represents the date when this object was created
   */
  @Is(a.date().required())
  createdAt: Date;

  @Is(a.boolean().nullable())
  isChecked?: boolean = false;

  /**
   * @description This field is used to identify if this object has been soft-deleted
   */
  @Is(a.boolean().nullable())
  isDeleted?: boolean;

  @Is(a.string().required())
  title: string;

  /**
   * @description Represents the last time when the object was updated
   */
  @Is(a.date().required())
  updatedAt: Date;
}
