import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('urls')
export class UrlsController {
  constructor(private urlsService: UrlsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: { originalUrl: string }, @Request() req: any) {
    const shortCode = Math.random().toString(36).substring(2, 8);
    return this.urlsService.create(body.originalUrl, shortCode, req.user.sub);
  }
}
