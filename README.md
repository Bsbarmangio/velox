# Velox (converted from JSON)

This repository was generated from a JSON snapshot. It contains the initial skeleton for the Velox Android app (Expo + TypeScript).

Files added:
- `package.json` - dependencies and expo config
- `app.config.ts` - expo config
- `plugins/withFFmpeg.ts` - minimal config plugin injecting ffmpeg-kit
- `App.tsx` - root app
- `features/*` - downloader, muxer, notifications, UI
- `android/...` - minimal resources

To build (local dev machine with Android toolchain and expo):

```bash
npm install
npx expo prebuild
npx expo run:android
```

Note: Native foreground service integration and advanced Android behaviour require further native plugin work and testing.
# velox