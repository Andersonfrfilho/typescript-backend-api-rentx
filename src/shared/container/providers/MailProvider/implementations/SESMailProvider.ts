import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import { SES } from 'aws-sdk';
import fs from 'fs';

import { ISendMailDTO } from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';

class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.createClient();
  }

  private async createClient() {
    try {
      this.client = nodemailer.createTransport({
        SES: new SES({
          apiVersion: '2010-12-01',
          region: process.env.AWS_DEFAULT_REGION,
        }),
      });
    } catch (err) {
      console.error(`EtherealMailProvider - Error:\n${err}`);
    }
  }

  async sendMail({
    to,
    subject,
    variables,
    path,
  }: ISendMailDTO): Promise<void> {
    const templateFileContent = fs.readFileSync(path, 'utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: 'AdA <admin@adatechnology.dev>',
      subject,
      html: templateHTML,
    });
  }
}

export { SESMailProvider };