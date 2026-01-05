import * as FileSystem from 'expo-file-system';
import { EventEmitter } from 'eventemitter3';

export const downloaderEvents = new EventEmitter();

export type DownloadResult = {
  uri: string;
  status: number;
};

export async function startDownload(remoteUrl: string, localPath: string): Promise<DownloadResult> {
  const resumable = FileSystem.createDownloadResumable(remoteUrl, localPath, {}, progress => {
    const { totalBytesWritten, totalBytesExpectedToWrite } = progress;
    const pct = totalBytesExpectedToWrite > 0 ? (totalBytesWritten / totalBytesExpectedToWrite) : 0;
    downloaderEvents.emit('progress', { url: remoteUrl, path: localPath, progress: pct });
  });

  try {
    const { uri } = await resumable.downloadAsync();
    downloaderEvents.emit('finished', { url: remoteUrl, path: uri });
    return { uri, status: 200 };
  } catch (e: any) {
    downloaderEvents.emit('error', { url: remoteUrl, error: e });
    return { uri: '', status: 500 };
  }
}
