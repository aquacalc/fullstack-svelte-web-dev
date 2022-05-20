import type { RequestHandler } from "@sveltejs/kit";
import type { Request } from "@sveltejs/kit";

// TODO: Persist in DB
let todos: Todo[] = [];

export const api = (event: Request, data?: Record<string, unknown>) => {
    let body = {};
    let status = 500;

    // console.log(`** PARAMS: ${event.params}`)
    // console.log(`** data: `, data)

    // console.log(`** Method: ${event.request.method}`)
    // console.log(`Method: ${event.request.method.toLocaleUpperCase()}`)

    // see: https://stackoverflow.com/questions/71379031/how-do-get-query-string-parameter-in-sveltekit
    // const myMethod = event.url.searchParams.get('_method');
    // console.log(`myMethod = ${myMethod}`)
    
    switch (event.request.method.toLocaleUpperCase()) {

        case "GET":
            body = todos;
            status = 200;
            break;

        case "POST":
            todos.push(data as Todo);
            body = data as Todo;
            status = 201;
            break;

        case "DELETE":
            todos = todos.filter(todo => todo.uid !== event.params.uid)
            status = 200;
            break;

        case "PATCH":
            todos = todos.map(todo => {
                if (todo.uid === event.params.uid) {
                    if (data.text) todo.text = data.text as string;
                    else todo.done = data.done as boolean;
                }
                return todo;
            })
            status = 200;
            break;

        default:
            break;
    }

    if (event.request.method.toUpperCase() !== "GET") {
        return {
            status: 303,
            headers: {
                location: '/'
            }
        }
    }

    return {
        status,
        body
    }
}