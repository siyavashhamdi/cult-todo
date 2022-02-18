/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class TodoInsertInput {
  @Is(an.objectId().nullable())
  createdById?: ObjectId;

  @Is(a.boolean().required())
  isChecked: boolean;

  @Is(a.number().required())
  position: number;

  @Is(a.string().required())
  title: string;
}
