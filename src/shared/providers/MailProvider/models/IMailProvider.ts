import ISendMailDTO from '../contracts/ISendMailDTO';

export interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
