const config = {
  mongodb: {
    url: buildMongoUrl(
      process.env.MONGO_HOST,
      process.env.MONGO_USER,
      process.env.MONGO_PWD,
    ),
    databaseName: process.env.MONGO_DBNAME,
    options: {
      connectTimeoutMS: 3600000,
      socketTimeoutMS: 3600000,
    },
  },
  migrationsDir: 'mongo/migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.cjs',
  useFileHash: false,
  moduleSystem: 'commonjs',
};

function buildMongoUrl(uri, user, password) {
  const [protocol, host] = uri.split('://');
  return `${protocol}://${user}:${password}@${host}`;
}

export default config;
