import { startDownload, downloaderEvents } from './downloader';
import * as FileSystem from 'expo-file-system';
import { EventEmitter } from 'eventemitter3';

const downloads: Record<string, { url: string; path: string }> = {};
export const serviceEvents = new EventEmitter();

export async function queueDownload(url: string) {
  const filename = url.split('/').pop() || `media_${Date.now()}`;
  const dir = FileSystem.documentDirectory + 'Velox/Downloads/';
  try {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  } catch {}
  const localPath = dir + filename;
  downloads[localPath] = { url, path: localPath };

  downloaderEvents.on('progress', p => serviceEvents.emit('progress', p));
  downloaderEvents.on('finished', r => serviceEvents.emit('finished', r));
  downloaderEvents.on('error', e => serviceEvents.emit('error', e));

  return startDownload(url, localPath);
}

export function listActive() {
  return Object.values(downloads);
}
