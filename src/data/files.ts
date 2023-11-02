import { List } from 'immutable';

import { useCallback, useEffect, useState } from 'react';

import {
  ExcalidrawImageElement,
  FileId,
} from '@excalidraw/excalidraw/types/element/types';
import { BinaryFileData, DataURL } from '@excalidraw/excalidraw/types/types';

import { FileAppData } from '../config/appDataTypes';
import { useAppDataContext } from '../modules/context/AppDataContext';

export const getListOfFileIds = (
  elements: ExcalidrawImageElement[],
): List<string | undefined> =>
  List(elements).map((element) => element?.fileId as string);

export const useFiles = (filesAppData: List<FileAppData>): BinaryFileData[] => {
  const [files, setFiles] = useState<BinaryFileData[]>([]);
  const { getFileContent } = useAppDataContext();
  const getFile = useCallback(
    async (fileAppData: FileAppData): Promise<BinaryFileData> => {
      const { id, data: fileAppDataData } = fileAppData;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const reader = (file: any): Promise<DataURL> =>
        new Promise((resolve, reject) => {
          const fr = new FileReader();
          fr.onload = () => resolve(fr.result as DataURL);
          fr.onerror = (err) => reject(err);
          fr.readAsDataURL(file);
        });
      const { name: fileName, mimetype } = fileAppDataData.extra.s3File;
      const fileData = await getFileContent(id || '').then((result) =>
        reader(result),
      );
      const file: BinaryFileData = {
        mimeType: mimetype as BinaryFileData['mimeType'],
        id: fileName as FileId,
        dataURL: fileData,
        created: Date.now(),
      };

      return file;
    },
    [getFileContent],
  );

  const getFiles = useCallback(
    (filesAppDataToAdd: List<FileAppData>): Promise<BinaryFileData[]> => {
      const promisedFiles = filesAppDataToAdd.map(getFile);
      return Promise.all(promisedFiles).then((result) => result);
    },
    [getFile],
  );

  useEffect(() => {
    const filesToDownload = filesAppData.filterNot(({ data }) =>
      files.map(({ id }) => id as string).includes(data.name),
    );
    if (!filesToDownload.isEmpty()) {
      getFiles(filesToDownload).then((binaryFiles) => setFiles(binaryFiles));
    }
  }, [files, filesAppData, getFiles]);

  return files;
};
