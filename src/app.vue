<template>
  <input autofocus placeholder="What do you want to do?" 
    v-model="input"
    v-on="keyup:add | key 'enter'">
  <ul>
    <li v-repeat="todo : filtered">
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
    <a v-on="click: filter = 'all'">All</a>
    <a v-on="click: filter = 'active'">Active</a>
    <a v-on="click: filter = 'completed'">Completed</a>
  </div>
</template>

<script>

var filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter(todo => !todo.completed),
  completed: (todos) => todos.filter(todo => todo.completed)
};

export default {
  data: {
    todos: [],
    input: '',
    filter: 'all'
  },

  computed: {
    remaining() { return filters.active(this.todos).length; },
    filtered() { return filters[this.filter](this.todos); }
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