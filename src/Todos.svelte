<script>
  //get query
  import { GET_TODOS, ADD_TODO, TOOGLE_TODO, DELETE_TODO } from "./query";

  //set client to this application
  import { getClient, query, mutation } from "svelte-apollo";

  //user input will store here
  let text = "";

  const client = getClient();

  //get todo list
  const todos = query(GET_TODOS);

  //add new data to db
  const addTodo = mutation(ADD_TODO);

  //form submit
  async function handleSubmit() {
    try {
      await addTodo({ variables: { text } });
      text = "";
      todos.refetch();
    } catch (error) {
      console.log(error);
    }
  }

  //done a todo
  const todoDone = mutation(TOOGLE_TODO);
  async function done(id) {
    try {
      await todoDone({ variables: { id } });

      todos.refetch();
    } catch (error) {
      console.log(error);
    }
  }

  //delete a todo
  const todoDelete = mutation(DELETE_TODO);
  async function deleteTodo(id) {
    try {
      await todoDelete({ variables: { id } });
      todos.refetch();
    } catch (error) {
      console.log(error);
    }
  }
</script>

<h1>All Todos</h1>
<form on:submit|preventDefault={handleSubmit}>
  <input bind:value={text} placeholder="Add New Todo" />
  <button>Submit</button>
</form>

{#await $todos}
  Loading...
{:then result}
  {#if JSON.stringify(result.data) != undefined}
    Total todos: {result.data.getTodos.length}
    <ul>
      {#each result.data.getTodos as t}
        <li class:done={t.done}>
          {t.text} <button on:click|preventDefault={done(t.id)}>Done</button>
          <button on:click|preventDefault={deleteTodo(t.id)}>Delete</button>
        </li>
      {/each}
    </ul>
  {:else}
    Loading...
  {/if}
{:catch error}
  {error}
{/await}

<style>
  ul {
    list-style: none;
  }

  .done {
    text-decoration: line-through;
    color: red;
  }
</style>
