export const Http400Response = function (msg) {
  return { code: 400, msg };
};

export const Http500Response = function (msg) {
  return { code: 500, msg };
};

export const Http503Response = function (msg) {
  return { code: 503, msg };
};

export const Http504Response = function (msg) {
  return { code: 504, msg };
};
