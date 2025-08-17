"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestValidator = void 0;
const http_exception_1 = require("hono/http-exception");
const validator_1 = require("hono/validator");
const requestValidator = (target, schema, hook) => 
//   @ts-expect-error not typed well
(0, validator_1.validator)(target, async (value, c) => {
    const result = await schema.safeParseAsync(value);
    if (hook) {
        const hookResult = await hook({ data: value, ...result }, c);
        if (hookResult) {
            if (hookResult instanceof Response) {
                return hookResult;
            }
            if ("response" in hookResult) {
                return hookResult.response;
            }
        }
    }
    if (!result.success) {
        throw new http_exception_1.HTTPException(400, {
            message: `${result.error.errors[0]?.message} field '${result.error.errors[0]?.path}' on ${target}`,
        });
    }
    return result.data;
});
exports.requestValidator = requestValidator;
//# sourceMappingURL=validation.middleware.js.map