import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from '../entities/url.entity';

@Injectable()
export class UrlsService {
  constructor(
    @InjectRepository(Url)
    private urlsRepository: Repository<Url>,
  ) {}

  async create(
    originalUrl: string,
    shortCode: string,
    userId: number,
  ): Promise<Url> {
    const url = this.urlsRepository.create({ originalUrl, shortCode, userId });
    return await this.urlsRepository.save(url);
  }

  async findByShortCode(shortCode: string): Promise<Url | null> {
    return await this.urlsRepository.findOne({ where: { shortCode } });
  }
}
