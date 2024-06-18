import { Injectable, BadRequestException } from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class FileUploadInterceptor {
  constructor() {}

  async uploadFiles(files: {
    [key: string]: Express.Multer.File[];
  }): Promise<{ [key: string]: string[] }> {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'video/mp4',
      'video/mpeg',
      'video/quicktime',
    ];
    const uploadedPaths: { [key: string]: string[] } = {};

    for (const fieldName in files) {
      const fieldFiles = files[fieldName];

      if (!fieldFiles || fieldFiles.length === 0) {
        throw new BadRequestException(
          `No file uploaded for field '${fieldName}'`,
        );
      }

      uploadedPaths[fieldName] = [];

      for (const file of fieldFiles) {
        if (!file) {
          throw new BadRequestException(
            `No file uploaded for field '${fieldName}'`,
          );
        }

        if (!allowedTypes.includes(file.mimetype)) {
          throw new BadRequestException(
            `Invalid file type for field '${fieldName}'. Only JPEG, PNG, PDF, DOC, DOCX, MP4, MPEG, MOV files are allowed`,
          );
        }

        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        const filePath = `${randomName}${extname(file.originalname)}`;
        uploadedPaths[fieldName].push(filePath); // Add file path or any relevant data to the array
      }
    }

    return uploadedPaths;
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'video/mp4',
      'video/mpeg',
      'video/quicktime',
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Invalid file type. Only JPEG, PNG, PDF, DOC, DOCX, MP4, MPEG, MOV files are allowed',
      );
    }

    return file.path;
  }
}

export const FilesUpload = (fields: { name: string; maxCount: number }[]) =>
  FileFieldsInterceptor(fields, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        const timestamp = Date.now(); // Lấy thời gian hiện tại
        const fileExtension = extname(file.originalname); // Lấy phần mở rộng của tên file gốc

        const newFilename = `${timestamp}-${randomName}${fileExtension}`;

        callback(null, newFilename); // Gọi callback để lưu file với tên mới
      },
    }),
  });

export const FileUpload = (fieldName: string) =>
  FileInterceptor(fieldName, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        const timestamp = Date.now(); // Lấy thời gian hiện tại
        const fileExtension = extname(file.originalname); // Lấy phần mở rộng của tên file gốc

        const newFilename = `${timestamp}-${randomName}${fileExtension}`;

        callback(null, newFilename); // Gọi callback để lưu file với tên mới
      },
    }),
  });
