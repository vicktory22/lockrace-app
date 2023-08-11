export const reply = {
  internalServerError: (message: string) => {
    console.log({ error: message });
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  },

  ok: (body: string) => new Response(body, { status: 200 }),
};
