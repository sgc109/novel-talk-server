/* eslint-disable arrow-body-style */
export const RESPONSE_UNAUTHORIZED = { code: 401, name: 'unauthorized' };
export const RESPONSE_RESOURCE_NOT_FOUND = { code: 404, name: 'resource not found' };
export const RESPONSE_INTERNAL_ERROR = { code: 500, name: 'internal error' };
export const RESPONSE_GATEWAY_TIMEOUT = { code: 504, name: 'gateway timeout' };
export const RESPONSE_TYPE_ERROR = { name: 'type error' };

export const Http400Response = (msg) => {
  return { code: 400, msg };
};

export const Http500Response = (msg) => {
  return { code: 500, msg };
};

export const Http503Response = (msg) => {
  return { code: 503, msg };
};

export const Http504Response = (msg) => {
  return { code: 504, msg };
};
