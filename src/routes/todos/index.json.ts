import type { RequestHandler } from "@sveltejs/kit";

// TODO: Persist in DB
let todos: Todo[] = [];

// export const get: RequestHandler = () => {
//     return {
//         status: 200,
//         body: 'Još jedanput: Evo me!'
//     }
// }

export const get: RequestHandler = async ({ request }) => {
  return {
    status: 200,
    body: todos
  }
}

export const post: RequestHandler = async ({request}) => {
    const formData = await request.formData()

    console.log(`formData.get() -> ${formData.get('text')}`)

    todos.push({
        created_at: new Date(),
        text: formData.get('text') as string,
        done: false
    })

        // see: ~3:04:00 https://www.youtube.com/watch?v=OUzaUJ3gEug
        // (To return to homepage)
    return {
        status: 303,
        headers: {
            location: '/'
        }
    }

    // return {
    //     status: 200,
    //     body: formData.get('text') as string
    // }
}