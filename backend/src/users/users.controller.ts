import { Body, Controller, Get, HttpStatus, Logger, Post, Res, Query } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/createUserDTO';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

    @Post('register')
    async createUser(@Body() userData: CreateUserDto, @Res() res: Response): Promise<any> {
        try {
            Logger.log('Iniciando cadastro de usuário...');

            const result = await this.userService.createUser(userData);
            return res.status(HttpStatus.CREATED).json({
                success: true,
                message: result,
            });
        } catch(error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: 'Erro ao criar usuário!',
                error: error.message,
            });
        }
    }

    @Get('getUser')
    async getUserByLogin(@Query('login') login: string, @Res() res: Response): Promise<any> {
        try {
            Logger.log('Iniciando busca de usuário...');

            const result = await this.userService.findUserByLogin(login);
            return res.status(HttpStatus.OK).json({
                success: true,
                message: result,
            });
        } catch(error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: 'Não foi possível encontrar o usuário!',
                error: error.message,
            });
        }
    }
}
