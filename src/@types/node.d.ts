declare namespace NodeJS {
  export interface ProcessEnv {
    HOST: string;
    PORT: number;
    NODE_ENV: 'develop' | 'testing' | 'staging' | 'production';

    APP_API_URL: string;
    APP_WEB_URL: string;

    MYSQL_DB_CONN: string;
    MYSQL_DB_HOST: string;
    MYSQL_DB_PORT: number;
    MYSQL_DB_USER: string;
    MYSQL_DB_PASS: string;
    MYSQL_DB_DATABASE: string;

    MONGO_DB_CONN: string;
    MONGO_DB_HOST: string;
    MONGO_DB_PORT: number;
    MONGO_DB_USER: string;
    MONGO_DB_PASS: string;
    MONGO_DB_DATABASE: string;

    REDIS_DB_HOST: string;
    REDIS_DB_PORT: number;
    REDIS_DB_PASS: string;

    ENTITIES_ROOT_PATH: 'src' | 'dist';
    ENTITIES_EXTENSION: 'ts' | 'js';

    JWT_SECRET_TOKEN: string;
    JWT_EXPIRES_IN_TOKEN: string;
    JWT_SECRET_REFRESH_TOKEN: string;
    JWT_EXPIRES_IN_REFRESH_TOKEN: string;

    STORAGE_DRIVER: 'disk' | 's3';
    STORAGE_BUCKET: string;

    MAIL_DRIVER: 'ethereal' | 'ses';

    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
  }
}
