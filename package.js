Package.describe({
  name: 'numtel:mysql',
  summary: 'MySQL support with Reactive Select Subscriptions',
  version: '1.0.3',
  git: 'https://github.com/numtel/meteor-mysql.git'
});

Npm.depends({
  'mysql': '2.8.0',
  'mysql-live-select': '1.0.3'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use([
    'underscore',
    'ddp',
    'tracker'
  ]);

  api.addFiles('lib/LiveMysql.js', 'server');
  api.export('LiveMysql', 'server');

  api.addFiles('lib/MysqlSubscription.js');
  api.export('MysqlSubscription');
});

Package.onTest(function(api) {
  api.use([
    'tinytest',
    'templating',
    'underscore',
    'autopublish',
    'insecure',
    'http',
    'grigio:babel@0.1.1',
    'simple:rest@0.2.3',
    'numtel:mysql',
    'numtel:benchmark-packages@0.0.1',
    'mongo', // for benchmark
    'thinksoftware:mongo-direct@1.0.2' // for benchmark
  ]);
  api.use('test-helpers'); // Did not work concatenated above
  api.addFiles([
    'test/helpers/expectResult.js',
    'test/helpers/randomString.js'
  ]);

  api.addFiles([
    'test/fixtures/tpl.html',
    'test/fixtures/tpl.js'
  ], 'client');

  api.addFiles([
    'test/helpers/queryEx.js',
    'test/helpers/querySequence.js',
    'test/index.es6'
  ], 'server');

  api.addFiles([
    'test/MysqlSubscription.js',
    'test/simple_rest.js'
  ]);


  // Benchmark databases
  api.addFiles([
    'test/benchmark/server.mongo.js',
    'test/benchmark/server.mysql.js'
  ], 'server');

  // Benchmarks
  api.addFiles([
    'test/benchmark/insertMany.js'
  ], 'client');
  api.addFiles([
    'test/benchmark/maxVsOrderBy.js'
  ]);
});
