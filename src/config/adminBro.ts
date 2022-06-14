import AdminBroExpress from '@admin-bro/express';
import { Database, Resource } from '@admin-bro/typeorm';
import AdminBro from 'admin-bro';
import { Router } from 'express';

import { connect } from '@shared/infra/typeorm';

AdminBro.registerAdapter({ Database, Resource });

interface IResponse {
  rootPath: string;
  router: Router;
}

async function configureAdminBro(): Promise<IResponse> {
  const connection = await connect();

  const adminBro = new AdminBro({
    databases: [connection],
    rootPath: '/admin',
  });

  const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
      if (email === 'bruno.futema@outlook.com' && password === 'root') {
        return true;
      }

      return false;
    },
    cookiePassword: 'session Key',
  });

  return { rootPath: adminBro.options.rootPath, router };
}

export { configureAdminBro };
