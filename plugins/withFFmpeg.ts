import {
  ConfigPlugin,
  withAndroidManifest,
  withAppBuildGradle,
} from '@expo/config-plugins';

const addFFmpegDependency = (buildGradle: string) => {
  const dep = "implementation 'com.arthenica:ffmpeg-kit-min:5.1.LTS'";
  if (buildGradle.includes(dep)) return buildGradle;
  return buildGradle.replace(
    /dependencies \{/,
    `dependencies {\n        ${dep}`
  );
};

const withFFmpegGradle: ConfigPlugin = config => {
  return withAppBuildGradle(config, config => {
    if (config.modResults.language === 'groovy' && typeof config.modResults.contents === 'string') {
      config.modResults.contents = addFFmpegDependency(config.modResults.contents);
    }
    return config;
  });
};

const withFFmpegManifest: ConfigPlugin = config => {
  return withAndroidManifest(config, config => {
    const manifest = config.modResults;
    // Add foreground-service permission if not present
    const usesPermissions = manifest.manifest['uses-permission'] || [];
    const names = usesPermissions.map((p: any) => p['$']['android:name']);
    if (!names.includes('android.permission.FOREGROUND_SERVICE')) {
      usesPermissions.push({ $: { 'android:name': 'android.permission.FOREGROUND_SERVICE' } });
      manifest.manifest['uses-permission'] = usesPermissions;
    }

    return config;
  });
};

const withFFmpeg: ConfigPlugin = config => {
  config = withFFmpegGradle(config);
  config = withFFmpegManifest(config);
  return config;
};

export default withFFmpeg;
