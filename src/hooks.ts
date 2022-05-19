import type { Handle } from '@sveltejs/kit';

// To correct breaking changes...
// see: https://github.com/sveltejs/kit/pull/3384
export const handle: Handle = async ({ event, resolve }) => {
    console.log(`In hook, event.request.url.includes('_method') = `, event.request.url.includes('_method'))
    
    // see: https://stackoverflow.com/questions/71379031/how-do-get-query-string-parameter-in-sveltekit
    console.log(event.url.searchParams.get('_method'))
    // const isDelete = event.url.pathname.includes('delete');
    // console.log(`Does path include -delete-? ${isDelete}`)
    // if(event.request.url.includes('_method')) {
    //     const isDelete = event.url.pathname.includes('delete');
    //     console.log(`Does path include -delete-? ${isDelete}`)
    // }

    const response = await resolve(event);

    return response;
}

// see: https://stackoverflow.com/questions/72300836/sveltekit-hook-prevents-endpoint-request
// export const handle: Handle = async ({ event, resolve }) => {

//     const isLogin = event.url.pathname.startsWith('/login')

//     const cookies = cookie.parse(event.request.headers.get('cookie') || '');
//     const token = cookies['token']

//     if (!token) {
        
//         if (!isLogin) {
            
//             return Response.redirect(`${event.url.origin}/login`)
//         }
//         return await resolve(event)
//     } else {
        
//         try {
            
//             await verifyToken(token)

//             if (isLogin) {
                
//                 return Response.redirect(`${event.url.origin}/about`)
//             }
//         } catch (err) {
//             return Response.redirect(`${event.url.origin}/login`)
//         }
//     }

//     return await resolve(event)

// };



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