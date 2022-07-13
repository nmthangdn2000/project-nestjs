import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VerifyDto, UserDto } from '../dtos/user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { sha512 } from '../../common/hash';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/core/mailers/services/mailer.service';
import { async } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private mailService: MailService,
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
    const code = Math.floor(100000 + Math.random() * 900000);
    const newUser = new this.userModel(data);
    const user = await newUser.save();
    // send mail comfirm
    this.mailService.sendComfirmAccount(user, code);
    // send token to client
    const payload = { id: user._id, userName: user.userName };
    const expiresIn = '5m';
    const token = this.jwtService.sign(payload, {
      secret: String(code),
      expiresIn,
    });

    return {
      token,
      expiresIn,
    };
  }

  async verifyEmail(data: VerifyDto) {
    try {
      this.jwtService.verify(data.token, {
        secret: data.code,
      });

      return { message: 'success' };
    } catch (error) {
      return { error };
    }
  }
}
