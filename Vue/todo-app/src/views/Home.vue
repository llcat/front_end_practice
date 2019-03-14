<template>
  <div id="app">
    <Header />
    <AddTodo @add-todo="addTodo"/>
    <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo" />
  </div>
</template>

<script>
import Todos from "../components/Todos";
import AddTodo from "../components/AddTodo"
import axios from 'axios'
import { constants } from 'fs';

export default {
  name: 'Home',
  components: {
    Todos,
    AddTodo
  },
  data() {
    return {
      todos: []
    }
  },
  methods: {
    deleteTodo(id){
      axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
      .then(rep=>{
        this.todos = this.todos.filter(todo=>todo.id!=id)
      })
      .catch(err=> console.log(err))
    },
    addTodo(newTodo){
      const {title, completed} = newTodo;
      axios.post("http://jsonplaceholder.typicode.com/todos", {
        title,
        completed
      }).then(rep=> {
        this.todos = [...this.todos, rep.data]
        })
      .catch(err=>console.log(err))
    }
  },
  created(){
    axios.get("http://jsonplaceholder.typicode.com/todos?_limit=10")
        .then(rep=>this.todos = rep.data)
        .catch(err=>{
          console.log(err)
        })
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}

.btn {
  display: inline-block;
  border: none;
  background: #555;
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;
}

.btn:hover {
  background: #666;
}
</style>
