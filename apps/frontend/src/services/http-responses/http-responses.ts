export const HttpResponses = {
  ok: (body?: BodyInit, init?: ResponseInit) => {
    return new Response(body, {
      status: 200,
      statusText: "OK",
      ...init,
    });
  },

  internalServerError: (message?: string) => {
    return new Response(message, {
      status: 500,
      statusText: "Internal Server Error",
    });
  },

  badRequest: (message?: string) => {
    return new Response(message, {
      status: 400,
      statusText: "Bad Request",
    });
  },

  unauthorized: (message?: string) => {
    return new Response(message, {
      status: 401,
      statusText: "Unauthorized",
    });
  },
};
