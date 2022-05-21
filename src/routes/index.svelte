<script context='module' lang='ts'>
  import type { Load } from '@sveltejs/kit';
  import { enhance } from '$lib/actions/form';

  export const load: Load = async ({fetch}) => {
    const res = await fetch('/todos.json');

    if(res.ok) {
      const todos = await res.json();
      return {
        props: { todos }
      }
    }

    const { message } = await res.json();
    return {
      error: new Error(message)
    }
  }
</script>

<script lang='ts'>
    import TodoItem from "$lib/todo-item.svelte"

    export let todos: Todo[];

    let title = 'Todo'

    const processNewTodoResult = async (res: Response, form: HTMLFormElement) => {

      // console.log(' ')
      // console.log('====================')
      // console.log(`res: `, res)
      // console.log(`form: `, form)
      // console.log(`form.action: `, form.action)
      // console.log('res.text: ', await res.text())
      // console.log('typeof ...: ', typeof await res.json())

      // const body = new FormData(form);
      // console.log(`body = `, body)

      // "That unexpected token, <, is a strong clue that the response was HTML instead of JSON.
      // The root cause is that the server returned HTML or some other non-JSON string. 
      const newTodo = (await res.json());


      // const newTodo = {
      //   uid: `${Date.now()}`, // TODO: Replace with the UID from the datbase
      //   created_at: new Date(),
      //   text: 'This is text...',
      //   done: false
      // };

      // console.log(`00000000000`)
      // console.log(`newTodo`, newTodo)

      // console.log('====================')
      // console.log(' ')

      todos = [...todos, newTodo];

      form.reset();
    };

    const processUpdatedTodoResult = async (res: Response) => {

      const updatedTodo = await res.json();

      todos = todos.map(t => {
        if (t.uid === updatedTodo.uid) return updatedTodo;
        return t;
      })
    };
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="todos">
    <h1>{title}</h1>

    <form 
      action="/todos.json" 
      method="POST" 
      class='new' 
      use:enhance={{ result: processNewTodoResult }}
    >
        <input 
          type="text" 
          name="text" 
          aria-label="Add a todo" 
          placeholder="+ type to add a todo" 
        />
    </form>

    {#each todos as todo}
      <TodoItem 
        {todo}
        processDeletedTodoResult={() => {
          todos = todos.filter(t => t.uid !== todo.uid);
        }}
        {processUpdatedTodoResult}
      />
    {/each}

</div>

  <style>
    .todos {
      width: 100%;
      max-width: 42rem;
      margin: 4rem auto 0 auto;
    }
    .new {
      margin: 0 0 0.5rem 0;
    }
    .new input {
      font-size: 28px;
      width: 100%;
      padding: 0.5em 1em 0.3em 1em;
      box-sizing: border-box;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          text-align: center;
    }
    /* see: at ~2:19:00 https://www.youtube.com/watch?v=OUzaUJ3gEug */
    .todos :global(input) {
      border: 1px solid transparent;
    }
    .todos :global(input:focus-visible) {
      box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
      border: 1px solid #ff3e00 !important;
      outline: none;
    }
  </style>