import type { RequestHandler } from "@sveltejs/kit";
import type { Request } from "@sveltejs/kit";

// TODO: Persist in DB
let todos: Todo[] = [];

export const api = (event: Request, todo?: Todo) => {
    let body = {};
    let status = 500;

    console.log(`** Method: ${event.request.method}`)
    console.log(`** Method: ${event.request}`)
    console.log(`Method: ${event.request.method.toLocaleUpperCase()}`)
    
    switch (event.request.method.toLocaleUpperCase()) {

        case "GET":
            body = todos;
            status = 200;
            break;

        case "POST":
            todos.push(todo as Todo);
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