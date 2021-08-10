<script>
  import ApolloClient from "apollo-boost";
  import { setClient } from "svelte-apollo";
  import Todos from "./Todos.svelte";

  //create a client and  set the server URL
  const client = new ApolloClient({
    uri: "https://todos-graphql.herokuapp.com/graphql",
  });

  //set client to this application
  setClient(client);
</script>

<main>
  <h1>TODO List!</h1>

  <Todos />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
