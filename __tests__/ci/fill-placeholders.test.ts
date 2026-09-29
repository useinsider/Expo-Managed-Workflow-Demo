import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const scriptSource = path.resolve(__dirname, '../../ci/fill-placeholders.js');

let workspace: string;
let appJsonPath: string;

// The script resolves app.json from its own location, so it runs from a copy inside a throwaway workspace.
function createWorkspace(appJson: string): void {
  workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'fill-placeholders-'));
  fs.mkdirSync(path.join(workspace, 'ci'));
  fs.copyFileSync(scriptSource, path.join(workspace, 'ci', 'fill-placeholders.js'));
  appJsonPath = path.join(workspace, 'app.json');
  fs.writeFileSync(appJsonPath, appJson);
}

function runScript(args: string[]) {
  return spawnSync(process.execPath, [path.join(workspace, 'ci', 'fill-placeholders.js'), ...args], {
    encoding: 'utf8',
  });
}

function fixture(extra: string): string {
  return `${JSON.stringify(
    {
      expo: {
        ios: { bundleIdentifier: '{YOUR_BUNDLE_IDENTIFIER}' },
        android: { package: '{YOUR_PACKAGE_NAME}', googleServicesFile: './google-services.json' },
        extra: { note: extra },
      },
    },
    null,
    2,
  )}\n`;
}

afterEach(() => {
  fs.rmSync(workspace, { recursive: true, force: true });
});

test('refuses to run without --ci and leaves app.json untouched', () => {
  const original = fixture('none');
  createWorkspace(original);

  const result = runScript([]);

  expect(result.status).toBe(1);
  expect(result.stderr).toContain('run it only in a throwaway CI workspace');
  expect(fs.readFileSync(appJsonPath, 'utf8')).toBe(original);
});

test('fails on an unknown placeholder without rewriting app.json', () => {
  const original = fixture('{YOUR_UNKNOWN}');
  createWorkspace(original);

  const result = runScript(['--ci']);

  expect(result.status).toBe(1);
  expect(result.stderr).toContain('Unhandled placeholders in app.json: {YOUR_UNKNOWN}');
  expect(fs.readFileSync(appJsonPath, 'utf8')).toBe(original);
  expect(fs.existsSync(path.join(workspace, 'google-services.json'))).toBe(false);
});
