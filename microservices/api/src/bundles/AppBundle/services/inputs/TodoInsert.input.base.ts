/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class TodoInsertInput {
  @Is(a.boolean().nullable())
  isChecked?: boolean = false;

  @Is(a.string().required())
  title: string;
}
