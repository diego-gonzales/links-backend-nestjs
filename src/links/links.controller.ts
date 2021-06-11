import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus, Put } from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

@Controller('links')
export class LinksController {

  constructor(private readonly linksService: LinksService) {}

  @Post()
  async create(@Body() createLinkDto: CreateLinkDto) {
    const linkCreated = await this.linksService.create(createLinkDto);

    return {
      message: 'Link Created Successfully',
      link: linkCreated
    };
  };

  @Get()
  async findAll() {
    const links = await this.linksService.findAll();

    return {
      message: 'OK',
      links
    };
  };

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const link = await this.linksService.findOne(id);

    if (!link) throw new HttpException('Link does not exist', HttpStatus.NOT_FOUND);

    return {
      message: 'OK',
      link
    };
  };

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    const linkUpdated = await this.linksService.update(id, updateLinkDto);

    if (!linkUpdated) throw new HttpException('Link does not exist', HttpStatus.NOT_FOUND);

    return {
      message: 'Link Updated Successfully',
      link: linkUpdated
    };
  };

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const linkDeleted = await this.linksService.remove(id);

    if (!linkDeleted) throw new HttpException('Link does not exist', HttpStatus.NOT_FOUND);

    return {
      message: 'Link Deleted Successfully',
      link: linkDeleted
    };
  };

}
