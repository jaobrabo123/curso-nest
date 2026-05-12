import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../resources/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';

@Module({
    imports: [
        forwardRef(() => UserModule),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow<string>('SECRET_KEY'),

                signOptions: {
                    expiresIn: '1d',
                },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard],
    exports: [JwtModule, AuthGuard],
})
export class AuthModule {}
