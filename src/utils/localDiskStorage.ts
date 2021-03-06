import { resolve } from 'path';
import { Readable } from 'stream';
import Debug, { Debugger } from 'debug';
import fs, { createReadStream } from 'fs';

const debug: Debugger = Debug('threedify:utils:localDiskStorage');

export async function getFilePath(
  directory: string,
  fileName: string
): Promise<string> {
  return new Promise((success, reject) => {
    success(resolve(directory, fileName));
  });
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    let fileDetails = await fs.promises.stat(filePath);
    return !!fileDetails;
  } catch (err) {
    return false;
  }
}

export async function saveFile(
  tmpFilePath: string,
  filePath: string,
  mimeType: string
) {
  debug('Saving file (%s) in local disk storage.', filePath);
  await fs.promises.copyFile(tmpFilePath, filePath);
}

export async function openReadStream(filePath: string): Promise<Readable> {
  return new Promise(async (success, reject) => {
    success(createReadStream(filePath));
  });
}

export async function unlinkFile(filePath: string) {
  debug('Removing file (%s) from local disk storage.', filePath);
  await fs.promises.unlink(filePath);
}

export default {
  saveFile,
  unlinkFile,
  fileExists,
  getFilePath,
  openReadStream,
};
