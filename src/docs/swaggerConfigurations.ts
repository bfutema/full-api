import swaggerDefinitionDev from './swagger-dev.json';
import swaggerDefinitionPrd from './swagger-prd.json';
import swaggerDefinitionStg from './swagger-stg.json';
import { customCss } from './theme/customCss';

const ENVIRONMENT = process.env.NODE_ENV;

const swaggerDefinition = {
  develop: swaggerDefinitionDev,
  testing: swaggerDefinitionDev,
  staging: swaggerDefinitionStg,
  production: swaggerDefinitionPrd,
};

export const definitions = {
  swaggerDefinition: swaggerDefinition[ENVIRONMENT],
  apis: [`./${process.env.ENTITIES_ROOT_PATH}/**/*.yaml`],
};

export const options = { customCss };
