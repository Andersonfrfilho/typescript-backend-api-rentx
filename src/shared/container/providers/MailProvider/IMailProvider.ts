import { ISendMailDTO } from "@shared/container/providers/MailProvider/dtos/ISendMailDTO";

interface IMailProvider {
  sendMail({ to, subject, body }: ISendMailDTO): Promise<void>;
}

export { IMailProvider };
