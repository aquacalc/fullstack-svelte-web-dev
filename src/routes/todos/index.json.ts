import type { RequestHandler } from "@sveltejs/kit";

import {api} from './_api';

export const get = (event: RequestHandler) => {
    return api(event);
}

export const post: RequestHandler<{}, FormData> = async (event) => {
    const body = await event.request.formData();
    console.log(`*** event: `, body.get('text'))
    
    return api(event, {
      uid: `${Date.now()}`, // TODO: Replace with the UID from the datbase
      created_at: new Date(),
      text: body.get("text"),
      done: false
    });
  }
  

// export const post: RequestHandler<{}, FormData> = (event) => {
//     return api(event.request, {
//       uid: `${Date.now()}`, // TODO: Replace with the UID from the datbase
//       created_at: new Date(),
//       text: event.request.body.get("text"),
//       done: false
//     });
//   }

// export const post: RequestHandler = async (event) => {
//     const formData = await event.request.formData()

//     console.log(`formData.get() -> ${formData.get('text')}`)

//     return api(event);

//     // todos.push({
//     //     created_at: new Date(),
//     //     text: formData.get('text') as string,
//     //     done: false
//     // })

//         // see: ~3:04:00 https://www.youtube.com/watch?v=OUzaUJ3gEug
//         // (To return to homepage)
//     // return {
//     //     status: 303,
//     //     headers: {
//     //         location: '/'
//     //     }
//     // }
// }