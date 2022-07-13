import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { join } from 'path';
import appConfig from '../configs/app.config';
import { MailService } from './services/mailer.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
console.log(__dirname);

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: appConfig.mailer.MAIL_HOST,
        secure: false,
        auth: {
          user: appConfig.mailer.MAIL_USERNAME,
          pass: appConfig.mailer.MAIL_PASSWORD,
        },
        port: Number(appConfig.mailer.MAIL_PORT),
      },
      defaults: {
        from: '"NestJsCore Comfirmation Email" <test@example.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailersModule],
})
export class MailersModule {}
