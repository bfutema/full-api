import { jobs } from '@jobs/index';
import Bee, { Job } from 'bee-queue';

import { redisConfig } from '@config/redis';

interface IJob {
  key: string;
  handle: () => void;
}

class Queue {
  private queues = {};

  constructor() {
    this.queues = {};

    this.init();
  }

  private init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = { bee: new Bee(key, { redis: redisConfig }), handle };
    });
  }

  public add(queue: string, job: Object) {
    return this.queues[queue].bee.createJob(job).save();
  }

  public processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  private handleFailure(job: Job<IJob>, err: Error) {
    console.info(`Queue ${job.queue.name}: FAILED`, err);
  }
}

const INSTANCE = new Queue();

export { INSTANCE as Queue };
