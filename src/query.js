import { gql } from "apollo-boost";

//query for fetching data
export const GET_TODOS = gql`
  query {
    getTodos {
      id
      text
      done
    }
  }
`;

//add new todo in list
export const ADD_TODO = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
      done
    }
  }
`;

//update a todo to done
export const TOOGLE_TODO = gql`
  mutation toggleTodo($id: String!) {
    toggleTodo(id: $id) {
      done
    }
  }
`;

//delete a todo
export const DELETE_TODO = gql`
  mutation deleteTodo($id: String!) {
    deleteTodo(id: $id) {
      id
      text
      done
    }
  }
`;
