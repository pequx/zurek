import { HelperService } from '@app/helper';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private tagsRepository: Repository<Tag>,
    @Inject(HelperService) private helperService: HelperService
  ) { }
  create(dto: CreateTagDto) {
    return this.helperService.getCreatePromise(this.tagsRepository, dto)
  }

  findAll() {
    return this.helperService.getFindAllPromise(this.tagsRepository)
  }

  findOne(id: number) {
    return this.helperService.getFindOnePromise(this.tagsRepository, id)
  }

  update(id: number, dto: UpdateTagDto) {
    return this.helperService.getUpdatePromise(this.tagsRepository, id, dto)
  }

  remove(id: number) {
    return this.helperService.getRemovePromise(this.tagsRepository, id)
  }
}
