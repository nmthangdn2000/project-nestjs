import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../dtos/user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { sha512 } from '../../common/hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async findAll() {
    return this.userModel.find().lean();
  }

  async signIn(data: UserDto) {
    const password = sha512(`${data.email}${data.password}`);
    const user = await this.userModel.findOne({ password }).lean();
    if (!user) throw new NotFoundException('Email or Password is incorrect');
    const payload = { id: user._id, userName: user.userName };
    const token = this.jwtService.sign(payload);
    return {
      ...user,
      token,
    };
  }

  async signUp(data: UserDto) {
    data.password = sha512(`${data.email}${data.password}`);

    const newUser = new this.userModel(data);
    return newUser.save();
  }
}
