import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const CodeParam = createParamDecorator((_data: unknown, context: ExecutionContext) => {

    return Number(context.switchToHttp().getRequest().params.codigo);

})