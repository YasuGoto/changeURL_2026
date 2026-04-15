import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  Res,
  Delete,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { Response } from 'express';
import type { RequestWithUser } from '../types/request-with-user';

@Controller()
export class UrlsController {
  constructor(private urlsService: UrlsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('urls')
  create(
    @Body() body: { originalUrl: string },
    @Request() req: RequestWithUser,
  ) {
    const shortCode = Math.random().toString(36).substring(2, 8);
    return this.urlsService.create(body.originalUrl, shortCode, req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get('urls')
  findAll(@Request() req: RequestWithUser) {
    return this.urlsService.findByUserId(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('urls/:id')
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.urlsService.delete(Number(id), req.user.sub);
  }

  @Get(':shortCode')
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
    const url = await this.urlsService.findByShortCode(shortCode);
    if (!url) return res.status(404).json({ message: 'URLが見つかりません' });
    return res.redirect(url.originalUrl);
  }
}
