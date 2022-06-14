interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: { email: string; name: string };
    to: { email: string; name: string };
  };
}

const mailConfig: IMailConfig = {
  driver: process.env.MAIL_DRIVER,
  defaults: {
    from: {
      email: 'bruno.futema@outlook.com',
      name: 'Bruno da Devxperience',
    },
    to: {
      email: 'bruno.futema@outlook.com',
      name: 'Bruno da Devxperience',
    },
  },
};

export { mailConfig };
