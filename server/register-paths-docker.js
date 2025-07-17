const tsConfigPaths = require('tsconfig-paths');
const path = require('path');
const fs = require('fs');

const tsConfigPath = path.resolve(__dirname, 'tsconfig.runtime.json');

if (!fs.existsSync(tsConfigPath)) {
  console.error(`Error: tsconfig.runtime.json not found at ${tsConfigPath}`);
  process.exit(1);
}

const tsConfig = require(tsConfigPath);

const baseUrl = path.resolve(process.cwd(), tsConfig.compilerOptions.baseUrl);

tsConfigPaths.register({
  baseUrl: baseUrl,
  paths: tsConfig.compilerOptions.paths
});

