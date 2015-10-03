<template>
  <input autofocus placeholder="What do you want to do?" 
    v-model="input"
    v-on="keyup:add | key 'enter'">
  <ul>
    <li v-repeat="todo : todos">
      <input type="checkbox" v-model="todo.completed">
      <label v-on="dblclick: todo.editing = true"
             v-show="!todo.editing">{{todo.title}}</label>
      <input v-model="todo.title"
             v-on="blur:save(todo), keyup:save(todo) | key 'enter'"
             v-show="todo.editing">
      <a v-on="click:remove(todo)">[x]</a>
    </li>
  </ul>
  <div v-show="todos.length">
    <strong>
      {{ remaining }} {{ remaining | pluralize 'item' }} remaining
    </strong>
  </div>
</template>

<script>
export default {
  data: {
    todos: [],
    input: ''
  },

  computed: {
    remaining() { return this.todos.filter(todo => !todo.completed).length; }
  },

  methods: {
    add() {
      var value = this.input.trim();
      if (value) {
        this.todos.push({title: value, completed: false, editing: false});
        this.input = '';
      }
    },
    save(todo) {
      todo.editing = false;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.remove(todo);
      }
    },
    remove(todo) {
      this.todos.$remove(todo);
    }
  }
};
</script>

<style>
</style>