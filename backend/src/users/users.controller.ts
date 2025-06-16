import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/createUserDTO';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('Register')
  async createUser(
    @Body() userData: CreateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await this.userService.createUser(userData);
    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Usuário criado com sucesso!',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: result,
    });
  }
}
