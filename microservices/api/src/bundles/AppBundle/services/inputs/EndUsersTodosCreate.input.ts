import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class EndUsersTodosCreateInput {
  @Is(a.string().required())
  title: string;
}
