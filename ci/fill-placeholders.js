#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

if (!process.argv.includes('--ci')) {
  console.error('fill-placeholders rewrites app.json in place; run it only in a throwaway CI workspace, with --ci.');
  process.exit(1);
}

const root = path.resolve(__dirname, '..');
const appJsonPath = path.join(root, 'app.json');
const packageName = 'com.example.expodemomw.ci';

const dummies = {
  YOUR_BUNDLE_IDENTIFIER: packageName,
  YOUR_PACKAGE_NAME: packageName,
  // Becomes the insider<partner> URL scheme, so it must stay lowercase letters only.
  YOUR_PARTNER_NAME: 'cidummypartner',
  YOUR_APP_GROUP: `group.${packageName}`,
  YOUR_DEVELOPMENT_TEAM: 'CIDUMMY000',
};

let appJson = fs.readFileSync(appJsonPath, 'utf8');
for (const [key, value] of Object.entries(dummies)) {
  appJson = appJson.replaceAll(`{${key}}`, value);
}
const leftover = appJson.match(/\{YOUR_[A-Z_]+\}/g);
if (leftover) {
  console.error(`Unhandled placeholders in app.json: ${[...new Set(leftover)].join(', ')}`);
  process.exit(1);
}
fs.writeFileSync(appJsonPath, appJson);

// Generated rather than committed so the fake Firebase config can never drift from the dummy package name.
const googleServices = {
  project_info: {
    project_number: '000000000000',
    project_id: 'ci-dummy-project',
    storage_bucket: 'ci-dummy-project.appspot.com',
  },
  client: [
    {
      client_info: {
        mobilesdk_app_id: '1:000000000000:android:0000000000000000',
        android_client_info: { package_name: packageName },
      },
      oauth_client: [],
      api_key: [{ current_key: 'ci-dummy-api-key' }],
      services: { appinvite_service: { other_platform_oauth_client: [] } },
    },
  ],
  configuration_version: '1',
};
const googleServicesPath = path.resolve(root, JSON.parse(appJson).expo.android.googleServicesFile);
fs.writeFileSync(googleServicesPath, `${JSON.stringify(googleServices, null, 2)}\n`);

console.log(`Filled ${Object.keys(dummies).length} placeholders in app.json and wrote ${path.relative(root, googleServicesPath)}.`);
