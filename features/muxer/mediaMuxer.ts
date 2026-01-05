import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';
import { EventEmitter } from 'eventemitter3';

export const muxEvents = new EventEmitter();

export async function muxStreams(videoPath: string, audioPath: string, outPath: string): Promise<boolean> {
  // Run a copy (no re-encode) mux
  const cmd = `-y -i "${videoPath}" -i "${audioPath}" -c copy "${outPath}"`;

  return new Promise(resolve => {
    FFmpegKit.executeAsync(cmd, session => {
      const returnCode = session.getReturnCode();
      if (ReturnCode.isSuccess(returnCode)) {
        muxEvents.emit('finished', { outPath });
        resolve(true);
      } else {
        muxEvents.emit('error', { returnCode: returnCode?.getValue() });
        resolve(false);
      }
    }, log => {
      // progress logging
      muxEvents.emit('log', log.getMessage());
    }, stats => {
      // stats available on some builds
      muxEvents.emit('stats', stats);
    });
  });
}
