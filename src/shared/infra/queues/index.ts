import 'reflect-metadata';
import 'dotenv/config';
import '@shared/containers';

import { Queue } from './queue';

Queue.processQueue();
