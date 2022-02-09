import { Service } from "@bluelibs/core";
import { UserId } from "@bluelibs/security-bundle";
import {
  RegistrationInput,
  XPasswordService as XPS,
} from "@bluelibs/x-password-bundle";
import { UserRole } from "../collections/Users/enums/UserRole.enum";

@Service()
export class XPasswordService extends XPS {
  async register(
    input: RegistrationInput
  ): Promise<{ token: string; userId: UserId }> {
    const resRegister = await super.register(input);

    await this.securityService.setRoles(resRegister.userId, [
      UserRole.END_USER,
    ]);

    return resRegister;
  }
}
