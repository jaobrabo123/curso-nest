import { applyDecorators } from "@nestjs/common";
import { IsEmail } from "class-validator";

export function EmailField() {
    return applyDecorators(
        IsEmail(
            {},
            {
                message: "O email fornecido não é válido.",
            },
        ),
    );
}
