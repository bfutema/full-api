const rootPath = process.env.ENTITIES_ROOT_PATH;
const extension = process.env.ENTITIES_EXTENSION;

module.exports = [
  {
    name: 'default',
    type: process.env.MYSQL_DB_CONN,
    host: process.env.MYSQL_DB_HOST,
    port: process.env.MYSQL_DB_PORT,
    username: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASS,
    database: process.env.MYSQL_DB_DATABASE,
    entities: [`./${rootPath}/modules/**/app/typeorm/entities/*.${extension}`],
    migrations: [`./${rootPath}/shared/infra/typeorm/migrations/*.${extension}`],
    seeds: [`./${rootPath}/shared/infra/typeorm/seeds/*.${extension}`],
    factories: [`./${rootPath}/shared/infra/typeorm/factories/*.${extension}`],
    cli: { migrationsDir: `./${rootPath}/shared/infra/typeorm/migrations` },
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 100000,
    options: { enableArithAbort: true },
    autoLoadEntities: true,
    logging: false,
  },
  {
    name: "mongo",
    type: process.env.MONGO_DB_CONN,
    host: process.env.MONGO_DB_HOST,
    port: process.env.MONGO_DB_PORT,
    database: process.env.MONGO_DB_DATABASE,
    useUnifiedTopology: true,
    entities: [`./${rootPath}/modules/**/app/typeorm/schemas/*.${extension}`],
  },
];
