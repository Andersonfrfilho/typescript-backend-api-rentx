import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/In-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

let userRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");
    await userRepositoryInMemory.create({
      driver_license: "664168",
      email: "e@mail.com",
      name: "Blanche Curry",
      password: "1234",
    });
    await sendForgotPasswordMailUseCase.execute("e@mail.com");
    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("e@mail.com")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to send a forgot password mail to user", async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");
    await userRepositoryInMemory.create({
      driver_license: "664168",
      email: "e@mail.com",
      name: "Blanche Curry",
      password: "1234",
    });
    await sendForgotPasswordMailUseCase.execute("e@mail.com");
    expect(generateTokenMail).toHaveBeenCalled();
  });
});
