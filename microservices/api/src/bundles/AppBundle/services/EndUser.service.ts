import { Service, ContainerInstance } from "@bluelibs/core";
import { SecurityService } from "@bluelibs/security-bundle";
import {
  RegistrationInput,
  XPasswordService,
} from "@bluelibs/x-password-bundle";
import { UserRole } from "../collections";

@Service()
export class EndUserService {
  constructor(
    protected readonly container: ContainerInstance,
    protected readonly xPasswordService: XPasswordService,
    protected readonly securityService: SecurityService
  ) {}

  public async register(input: RegistrationInput) {
    const { email, password, firstName, lastName } = input;

    const { userId, token } = await this.xPasswordService.register({
      email,
      password,
      firstName,
      lastName,
    });

    await this.securityService.setRoles(userId, [UserRole.END_USER]);

    return { token };
  }
}
