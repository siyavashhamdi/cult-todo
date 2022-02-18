import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class EndUsersTodosUpdateInput {
  @Is(a.boolean().nullable())
  isChecked: boolean;

  @Is(a.number().nullable())
  position?: number;
}
