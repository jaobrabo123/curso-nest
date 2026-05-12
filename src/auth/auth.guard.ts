import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export type UserJwtPayload = { sub: string };

export type RequestWithUser = Request & { user: UserJwtPayload };

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const authorization = this.extractTokenFromHeader(request);
        if (!authorization)
            throw new UnauthorizedException('Token is required.');

        try {
            const payload = await this.jwtService.verifyAsync<{ sub: string }>(
                authorization,
            );
            request.user = payload;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }

        return true;
    }

    private extractTokenFromHeader(request: Request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
