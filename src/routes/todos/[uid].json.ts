import type { RequestHandler } from "@sveltejs/kit";
import { api } from "./_api";

export const del: RequestHandler = (event) => {
  return api(event);
}

export const patch: RequestHandler<{}, FormData> = async (event) => {
  const body = await event.request.formData();
  console.log(`*** PATCH: `, body.get('text'))

  return api(event, {
    text: body.get("text"),
    // done: request.body.has("done") ? !!request.body.get("done") : undefined
  });
}