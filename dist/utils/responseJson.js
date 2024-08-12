"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function responseJson(status, data, message) {
    const resJson = {
        status: status,
        data: data,
        message: message
    };
    return resJson;
}
exports.default = responseJson;
