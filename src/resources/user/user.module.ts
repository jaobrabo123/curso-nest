import { forwardRef, Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserRepositoryProvider } from "./user.repository";
import { UserValidator } from "./user.validator";
import { DatabaseModule } from "../../database/database.module";
import { AuthModule } from "../../auth/auth.module";

@Module({
    imports: [DatabaseModule, forwardRef(() => AuthModule)],
    controllers: [UserController],
    providers: [UserService, UserRepositoryProvider, UserValidator],
    exports: [UserRepositoryProvider],
})
export class UserModule {}
