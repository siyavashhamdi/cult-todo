/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class TodoUpdateInput {
  @Is(a.boolean().nullable())
  isChecked?: boolean;

  @Is(a.string().nullable())
  title?: string;
}
