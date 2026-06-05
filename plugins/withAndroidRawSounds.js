const { withDangerousMod } = require('expo/config-plugins');
const fs = require('fs');
const path = require('path');

// Android raw resource names: lowercase letters, digits, and underscores only.
const RAW_NAME_REGEX = /^[a-z0-9_]+$/;

/**
 * Copies every *.mp3 from <projectRoot>/assets/sounds into
 * android/app/src/main/res/raw during `expo prebuild`.
 *
 * Managed-workflow safe: android/ is a regenerated artifact, so this runs on
 * every prebuild and repopulates res/raw even after `--clean`.
 */
const withAndroidRawSounds = (config) => {
  return withDangerousMod(config, [
    'android',
    (cfg) => {
      const { projectRoot, platformProjectRoot } = cfg.modRequest;

      // 1. Source folder must exist.
      const soundsDir = path.join(projectRoot, 'assets', 'sounds');
      if (!fs.existsSync(soundsDir)) {
        throw new Error(
          `[withAndroidRawSounds] Source folder not found: ${soundsDir}. ` +
            `Create it and add your *.mp3 files before running expo prebuild.`
        );
      }

      // 2. The android/app/src/main chain must exist (guards against copying
      //    to an unexpected location).
      const mainDir = path.join(platformProjectRoot, 'app', 'src', 'main');
      if (!fs.existsSync(mainDir)) {
        throw new Error(
          `[withAndroidRawSounds] Expected Android main folder not found: ${mainDir}. ` +
            `Refusing to copy sounds to an unexpected location.`
        );
      }

      // 3. Ensure res/raw exists.
      const rawDir = path.join(mainDir, 'res', 'raw');
      fs.mkdirSync(rawDir, { recursive: true });

      // 4. Collect lowercase *.mp3 files only.
      const mp3Files = fs
        .readdirSync(soundsDir, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith('.mp3'))
        .map((entry) => entry.name);

      // 5. Validate every filename against the Android raw resource rules.
      for (const fileName of mp3Files) {
        const baseName = fileName.slice(0, -'.mp3'.length);
        if (!RAW_NAME_REGEX.test(baseName)) {
          throw new Error(
            `[withAndroidRawSounds] Invalid Android raw resource name: "${fileName}". ` +
              `Names must match /^[a-z0-9_]+$/ (lowercase letters, digits, underscores only; ` +
              `no uppercase, hyphens, spaces, or dots). Rename the file and re-run prebuild.`
          );
        }
      }

      // 6. Copy each valid mp3 (overwrites — idempotent re-runs).
      for (const fileName of mp3Files) {
        fs.copyFileSync(
          path.join(soundsDir, fileName),
          path.join(rawDir, fileName)
        );
      }

      console.log(
        `✅ [withAndroidRawSounds] Copied ${mp3Files.length} sound file(s) into ${rawDir}`
      );

      return cfg;
    },
  ]);
};

module.exports = withAndroidRawSounds;
