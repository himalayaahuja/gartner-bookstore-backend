import { ValidationPipe } from '@nestjs/common';
import { snakeCase } from 'snake-case';
import { toUpper, compose } from 'ramda';

const toSnakeCaseUpper = compose(toUpper, snakeCase);

export class ApiValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors) => {
        const errorsAsResponse = (errors) =>
          errors.map((error) =>
            error.children && error.children.length > 0
              ? {
                  property: error.property,
                  children: errorsAsResponse(error.children),
                }
              : {
                  property: error.property,
                  messages: Object.keys(error.constraints).map((code) => ({
                    code: toSnakeCaseUpper(code),
                    message: error.constraints[code],
                  })),
                },
          );

        const data = errorsAsResponse(errors);

        return {
          status: 400,
          code: 'BAD_REQUEST',
          message: 'Bad Request',
          data,
        };
      },
    });
  }
}
