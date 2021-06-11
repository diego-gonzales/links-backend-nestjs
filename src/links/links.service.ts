import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Link, LinkDocument } from './schemas/link.schema';

@Injectable()
export class LinksService {

  constructor(@InjectModel(Link.name) private linkModel: Model<LinkDocument>) { }


  async create(createLinkDto: CreateLinkDto): Promise<Link> {
    const linkCreated = new this.linkModel(createLinkDto);
    return await linkCreated.save();
  };

  async findAll(): Promise<Link[]> {
    const links = await this.linkModel.find().exec();
    return links;
  };

  async findOne(id: string): Promise<Link> {
    const link = await this.linkModel.findById(id);
    return link;
  };

  async update(id: string, updateLinkDto: UpdateLinkDto): Promise<Link> {
    const linkUpdated = await this.linkModel.findByIdAndUpdate(id, updateLinkDto, { new: true, useFindAndModify: false });
    return linkUpdated;
  };

  async remove(id: string): Promise<Link> {
    const linkDeleted = await this.linkModel.findByIdAndDelete(id, { useFindAndModify: false });
    return linkDeleted;
  };

}
