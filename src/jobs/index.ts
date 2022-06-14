import { container } from 'tsyringe';

import { NewUserMail } from './NewUserMail';

export const newUserMail = container.resolve(NewUserMail);

export const jobs = [newUserMail];
