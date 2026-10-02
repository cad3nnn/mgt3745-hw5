// worker.js

const CORS = {
  // Replace this with the origin hosting your deployed page before final submission.
  // Example: "https://cad3nnn.github.io"
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "content-type",
};

export default {
  async fetch(request, env) {
    try {
      return await handle(request, env);
    } catch (err) {
      return new Response(`server error: ${err.message}`, {
        status: 500,
        headers: CORS,
      });
    }
  },
};

async function handle(request, env) {
  const url = new URL(request.url);

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: CORS,
    });
  }

  if (!env.DB) {
    return new Response(
      "server error: no D1 binding. Check database_id in wrangler.toml and redeploy.",
      {
        status: 500,
        headers: CORS,
      }
    );
  }

  if (request.method === "GET" && url.pathname === "/entries") {
    const { results } = await env.DB.prepare(
      "SELECT * FROM entries ORDER BY id"
    ).all();

    return Response.json(results, {
      headers: CORS,
    });
  }

  if (request.method === "POST" && url.pathname === "/entries") {
    let body;

    try {
      body = await request.json();
    } catch {
      return new Response("body must be JSON", {
        status: 400,
        headers: CORS,
      });
    }

    if (!body.text || typeof body.text !== "string") {
      return new Response("task data is required", {
        status: 400,
        headers: CORS,
      });
    }

    await env.DB.prepare(
      "INSERT INTO entries (text) VALUES (?)"
    )
      .bind(body.text)
      .run();

    return new Response(null, {
      status: 201,
      headers: CORS,
    });
  }

  return new Response("not found", {
    status: 404,
    headers: CORS,
  });
}