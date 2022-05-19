import type { Handle } from '@sveltejs/kit';

// To correct breaking changes...
// see: https://github.com/sveltejs/kit/pull/3384
export const handle: Handle = async ({ event, resolve }) => {
    console.log(`In hook, event.request.url.includes('_method') = `, event.request.url.includes('_method'))
    // if(event.request.url.includes('_method')) {
    // // if(event.request.query.has('_method')) {
    //     event.request.method = event.request.query.get('_method').toUpperCase();
    // }

    const response = await resolve(event);

    return response;
}

// -export async function handle({ request, resolve }) {
//     -  const response = await resolve(request);
//     +export async function handle({ event, resolve }) {
//     +  const response = await resolve(event);
    
//     -  if (response.headers['content-type'].startsWith('text/html')) {
//     -    response.body = response.body.replace(/cloud/g, 'butt');
//     +  if (response.headers.get('content-type').startsWith('text/html')) {
//     +    const body = await response.text();
//     +    return new Response(body.replace(/cloud/g, 'butt'), response);
//       }
      
//       return response;
//     }