import { ISendMailDTO } from "@shared/container/providers/MailProvider/dtos/ISendMailDTO";

interface IMailProvider {
  sendMail({ to, subject, variables, path }: ISendMailDTO): Promise<void>;
}

export { IMailProvider };
