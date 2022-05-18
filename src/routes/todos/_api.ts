import type { RequestHandler } from "@sveltejs/kit";

// TODO: Persist in DB
let todos: Todo[] = [];

export const api: RequestHandler = async (event) => {
    let body = {};
    let status = 500;

    console.log(`** Method: ${event.request.method}`)
    console.log(`Method: ${event.request.method.toLocaleUpperCase()}`)
    
    switch (event.request.method.toLocaleUpperCase()) {

        case "GET":
            body = todos;
            status = 200;
            break;

        case "POST":
            const newTodo: Todo = {
                created_at: new Date(),
                text: (await event.request.formData()).get('text') as string,
                done: false
            };

            todos.push(newTodo as Todo);
            body = newTodo as Todo;

            console.log(`todos: `, todos);

            return {
                status: 303,
                headers: {
                    location: '/'
                }
            }

        default:
            break;
    }

    return {
        status,
        body
    }
}