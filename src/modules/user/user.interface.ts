import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

export interface IUserService {
  createUser(data: CreateUserDto): Promise<User>;

  getUsers(): Promise<User[]>;

  getUserById(id: number): Promise<User>;

  getUserByEmail(email: string): Promise<User>;

  updateUser(data: UpdateUserDto, id: number): Promise<User>;

  deleteUser(id: number): Promise<User>;
}

export const iUserToken = Symbol('IUserService');
