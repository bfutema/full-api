import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import { IMailTemplateProvider } from '@shared/providers/MailTemplateProvider/models/IMailTemplateProvider';

import ISendMailDTO from '../contracts/ISendMailDTO';
import { IMailProvider } from '../models/IMailProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {}

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: { user: account.user, pass: account.pass },
    });

    this.client = transporter;

    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe Full',
        address: from?.email || 'equipe@full.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.info('Message sent: $s', message.messageId);
    console.info('Preview URL: $s', nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
