import IParseMailTemplateDTO from '../contracts/IParseMailTemplateDTO';

export interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
