import fs from 'fs';
import path from 'path';
import { removeFile } from '../../../shared/utils/removeFile';

jest.mock('fs');

const mockedFs = jest.mocked(fs);
const mockedAccess = mockedFs.access as jest.Mock;
const mockedUnlink = mockedFs.unlink as jest.Mock;

describe('TEST shared/utils/removeFile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should do nothing if filePath is empty', () => {
    removeFile('');

    expect(fs.access).not.toHaveBeenCalled();
    expect(fs.unlink).not.toHaveBeenCalled();
  });

  it('should remove existing file', () => {
    mockedAccess.mockImplementation((_, __, callback) => {
      callback(null);
    });
    mockedUnlink.mockImplementation((_, callback) => {
      callback(null);
    });

    const filePath = 'public/images/avatars/avatar.jpeg';
    const expectedPath = path.join('/app', filePath);

    removeFile(filePath);

    expect(fs.access).toHaveBeenCalledWith(
      expectedPath,
      fs.constants.F_OK,
      expect.any(Function)
    );
    expect(fs.unlink).toHaveBeenCalledWith(expectedPath, expect.any(Function));
  });

  it('should not call unlink if file does not exist', () => {
    mockedAccess.mockImplementation((_, __, callback) => {
      callback(new Error('Not found'));
    });

    removeFile('public/images/avatars/avatar.jpeg');

    expect(fs.unlink).not.toHaveBeenCalled();
  });

  it('should log error if unlink fails', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    mockedAccess.mockImplementation((_, __, callback) => {
      callback(null);
    });

    const error = new Error('Delete failed');

    mockedUnlink.mockImplementation((_, callback) => {
      callback(error);
    });

    removeFile('uploads/avatar.png');

    expect(console.error).toHaveBeenCalledWith('Error removing file:', error);

    (console.error as jest.Mock).mockRestore();
  });
});
