import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  CALCULATION,
  CLOUD_CONVERT_URL,
  CONVERT,
  EXPORT_URL,
  IMPORT,
  IMPORT_BASE64,
  JOB_BUILDER,
  PDF,
  TOKEN_PREFIX,
} from '../constants/constants';
import * as process from 'node:process';

@Injectable()
export class UserService {
  private API_TOKEN = process.env.API_TOKEN;
  async convertFile(file: Express.Multer.File) {
    try {
      const fileBase64 = file.buffer.toString('base64');

      const response = await axios.post(
        `${CLOUD_CONVERT_URL}`,
        {
          tasks: {
            import: {
              operation: `${IMPORT_BASE64}`,
              file: fileBase64,
              filename: file.originalname,
            },
            calculation: {
              operation: `${CONVERT}`,
              input: [`${IMPORT}`],
              output_format: `${PDF}`,
            },
            export: {
              operation: `${EXPORT_URL}`,
              input: `${CALCULATION}`,
            },
          },
          tag: `${JOB_BUILDER}`,
        },
        {
          headers: {
            Authorization: `${TOKEN_PREFIX} ${this.API_TOKEN}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error converting file: ${error}`);
    }
  }

  async getConvertFile(conversionId: string) {
    const response = await axios.get(`${CLOUD_CONVERT_URL}/${conversionId}`, {
      headers: {
        Authorization: `${TOKEN_PREFIX} ${this.API_TOKEN}`,
      },
    });
    return response.data;
  }
}
