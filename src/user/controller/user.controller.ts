import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/file/status/convert/:conversionId')
  async getConvertFile(@Param('conversionId') conversionId: string) {
    return this.userService.getConvertFile(conversionId);
  }

  @Post('/uploadFile')
  @UseInterceptors(FileInterceptor('file'))
  async convertFile(@UploadedFile() file: Express.Multer.File) {
    return this.userService.convertFile(file);
  }
}
