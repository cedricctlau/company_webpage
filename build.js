const { build } = require("esbuild");
const { dependencies } = require('./package.json')

const { Generator } = require('npm-dts');
new Generator({
  entry: 'server.ts',
  output: 'server.d.ts',
}).generate();

const sharedConfig = {
  entryPoints: ["./server.ts"],
  bundle: true,
  minify: true,
  external:["better-sqlite3","mysql","sqlite3","tedious","pg-native","mysql2","oracledb","pg-query-stream"]
};

build({
  ...sharedConfig,
  platform: 'node', // for CJS
  outfile: "server/server.js",
});
//--------------------------//
const sharedConfig2 = {
    entryPoints: ["knex.tools.ts"],
    bundle: true,
    minify: true,
    external:["better-sqlite3","mysql","sqlite3","tedious","pg-native","mysql2","oracledb","pg-query-stream"]
};

build({
    ...sharedConfig2,
    platform: 'node', // for CJS
    outfile: "server/migrate.js",
  });
  