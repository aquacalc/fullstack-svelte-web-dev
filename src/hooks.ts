import type { Handle } from "@sveltejs/kit";

//      --     [Breaking changes]     --
// see: https://github.com/sveltejs/kit/pull/3384
// export const handle: Handle = async ({ request, resolve }) => {
export async function handle({ event, resolve }) {

// event.query has been replaced by event.url.searchParams
//   if (event.request.searchParams.has("_method")) {
//     event.request.method = event.request.query.get("_method").toUpperCase();
//   }

  
  const response = await resolve(event);
  return response;
};

// import type { Handle } from '@sveltejs/kit';

// // To correct breaking changes...
// // see: https://github.com/sveltejs/kit/pull/3384
// export const handle: Handle = async ({ event, resolve }) => {
//     // console.log(`In hook, event.request.url.includes('_method') = `, event.request.url.includes('_method'))
//     // console.log(`**In hook, event.url.searchParams.get('_method') = `, event.url.searchParams.get('_method'))
    
//     // see: https://stackoverflow.com/questions/71379031/how-do-get-query-string-parameter-in-sveltekit
//     // console.log(event.url.searchParams.get('_method'))

//     // const isDelete = event.url.pathname.includes('delete');
//     // console.log(`Does path include -delete-? ${isDelete}`)
//     // if(event.request.url.includes('_method')) {
//     //     const isDelete = event.url.pathname.includes('delete');
//     //     console.log(`Does path include -delete-? ${isDelete}`)
//     // }

//     const response = await resolve(event);

//     return response;
// }

// see: https://stackoverflow.com/questions/72300836/sveltekit-hook-prevents-endpoint-request
// export const handle: Handle = async ({ event, resolve }) => {
