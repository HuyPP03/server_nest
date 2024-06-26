import { Inject, Injectable } from '@nestjs/common';
import { User } from '../database/models/user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: typeof User,
  ) {}

  getProfile(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
      attributes: ['id', 'name', 'email', 'isVerify', 'createdAt', 'updatedAt'],
    });
  }

  updateProfile(id: number, data: any) {
    return this.userRepository.update(data, {
      where: {
        id,
      },
    });
  }

  async deleteUser(userId: string) {
    const id = parseInt(userId);
    return this.userRepository.destroy({
      where: {
        id,
      },
    });
  }

  async getUser(userId: string): Promise<User> {
    const id = parseInt(userId);
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.findAll({
      attributes: ['id', 'name', 'email', 'isVerify', 'createdAt', 'updatedAt'],
    });
  }

  async updateUser(userId: string, data: any): Promise<any> {
    const id = parseInt(userId);
    return this.userRepository.update(data, {
      where: {
        id,
      },
    });
  }
}
