import { container } from 'tsyringe';

import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import { IMailProvider } from './models/IMailProvider';

export const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  // ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[process.env.MAIL_DRIVER],
);
