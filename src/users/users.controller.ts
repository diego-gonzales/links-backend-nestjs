import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LinkDto } from './dto/link.dto';
import { SignInDto } from './dto/signin-dto';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.usersService.create(createUserDto);

    return {
      message: 'User Created Successfully',
      user: createdUser
    };
  };

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();

    return {
      message: 'OK',
      users
    };
  };

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);

    return {
      message: 'OK',
      user
    };
  };

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersService.update(id, updateUserDto);

    if (!updatedUser) throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);

    return {
      messsage: 'User Updated Successfully',
      user: updatedUser
    };
  };

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedUser = await this.usersService.remove(id);

    if (!deletedUser) throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);

    return {
      messsage: 'User Deleted Successfully',
      user: deletedUser
    };
  };


  // ENDPOINT creado para agregar links a la propiedad links del user que esta vacia por defecto
  @Put('addlink/:idUser')
  async addLinkToUser(@Param('idUser') idUser: string, @Body() linkDto: LinkDto) {
    const userWithUpdatedLinks = await this.usersService.addLink(idUser, linkDto);

    if (!userWithUpdatedLinks) throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);

    return {
      message: 'Link has been added successfully',
      user: userWithUpdatedLinks
    };
  };

  // ENDPOINT creado para eliminar links a la propiedad links del user
  @Put('removelink/:idUser')
  async removeLinkFromUser(@Param('idUser') idUser: string, @Body() linkDto: LinkDto) {
    const userWithUpdatedLinks = await this.usersService.removeLink(idUser, linkDto);

    if (!userWithUpdatedLinks) throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);

    return {
      message: 'Link has been removed successfully',
      user: userWithUpdatedLinks
    };
  };

  // Endpoint para el logueo de un usuario
  @Post('signin')
  async signInUser(@Body() signInDto: SignInDto) {
    const user = await this.usersService.signInUser(signInDto);

    if(!user) throw new HttpException('Username or password is invalid', HttpStatus.NOT_FOUND);

    if (user.password !== signInDto.password) throw new HttpException('Username or password is invalid', HttpStatus.NOT_FOUND);

    return {
      message: 'Sucessful login',
      user
    };
  };

};
