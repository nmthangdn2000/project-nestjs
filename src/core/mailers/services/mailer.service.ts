import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/core/auth/dtos/user.dto';

@Injectable()
export class MailService {
  constructor(private MailService: MailerService) {}

  async sendComfirmAccount(user: UserDto, code: number) {
    await this.MailService.sendMail({
      to: user.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './comfirmationAccount',
      context: {
        code,
        name: user.name,
      },
    })
      .then(() => console.log('send mail success'))
      .catch((err) => console.log('lỗi', err));
  }
}
