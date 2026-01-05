import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: 'Velox',
    slug: 'velox',
    scheme: 'velox',
    version: '1.0.0',
    android: {
      package: 'com.velox.app',
      versionCode: 1,
      permissions: [
        'FOREGROUND_SERVICE',
        'WRITE_EXTERNAL_STORAGE',
        'READ_EXTERNAL_STORAGE',
        'READ_MEDIA_AUDIO',
        'READ_MEDIA_VIDEO'
      ],
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#0B0B0C'
      }
    },
    plugins: ['./plugins/withFFmpeg']
  } as ExpoConfig;
};
