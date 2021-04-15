import { ISendMailDTO } from "@shared/container/providers/MailProvider/dtos/ISendMailDTO";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";

class MailProviderInMemory implements IMailProvider {
  private message: any[] = [];
  async sendMail({
    to,
    subject,
    variables,
    path,
  }: ISendMailDTO): Promise<void> {
    this.message.push({ to, subject, variables, path });
  }
}

export { MailProviderInMemory };
