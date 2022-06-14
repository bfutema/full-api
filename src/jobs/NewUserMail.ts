import '@shared/providers';

import { providers } from '@shared/providers/MailProvider';

class NewUserMail {
  get key() {
    return 'NewUserMail';
  }

  async handle({ data }): Promise<void> {
    const { createdUser, file } = data;

    const mailProvider = providers[process.env.MAIL_DRIVER];

    await mailProvider.sendMail({
      to: { name: createdUser.name, email: createdUser.email },
      subject: '[Devxperience] Confirme seu e-mail!',
      templateData: {
        file,
        variables: {
          name: createdUser.name,
          link: `${process.env.APP_WEB_URL}/email_confirmation`,
        },
      },
    });
  }
}

export { NewUserMail };
