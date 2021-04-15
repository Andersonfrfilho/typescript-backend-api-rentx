import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { ISendMailDTO } from "@shared/container/providers/MailProvider/dtos/ISendMailDTO";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure, // true for 465, false for other ports
          auth: {
            user: account.user, // generated ethereal user
            pass: account.pass, // generated ethereal password
          },
        });
        this.client = transporter;
      })
      .catch((err) => console.error(err));
  }
  async sendMail({ to, subject, body }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreplay@rentx.com.br>",
      subject,
      text: body,
      html: body,
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
