import { container } from 'tsyringe';

import { BCryptHashProvider } from './implementations/BCryptHashProvider';
import { IHashProvider } from './models/IHashProvider';

export const providers = {
  bcrypt: container.resolve(BCryptHashProvider),
};

container.registerInstance<IHashProvider>('HashProvider', providers.bcrypt);
