<template>
  <input autofocus placeholder="What do you want to do?" 
    v-model="input"
    v-on="keyup:add | key 'enter'">
  <ul>
    <todo v-repeat="filtered" on-remove="{{remove}}"/>
  </ul>
  <div v-show="todos.length">
    <strong>
      {{ remaining }} {{ remaining | pluralize 'item' }} remaining
    </strong>
    <a v-on="click: filter = 'all'">All</a>
    <a v-on="click: filter = 'active'">Active</a>
    <a v-on="click: filter = 'completed'">Completed</a>
    <button v-on="click: clear" 
            v-show="todos.length > remaining">Clear</button>
  </div>
</template>

<script>

var Todo = require('./todo');
var STORE_KEY = "todos";

var filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter(todo => !todo.completed),
  completed: (todos) => todos.filter(todo => todo.completed)
};

export default {
  data: {
    todos: JSON.parse(localStorage.getItem(STORE_KEY) || '[]'),
    input: '',
    filter: 'all'
  },

  watch: {
    todos: {
      handler: (todos) => localStorage.setItem(STORE_KEY, JSON.stringify(todos)),
      deep: true
    }
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
    remove(todo) {
      this.todos.$remove(todo);
    },
    clear() {
      this.todos = filters.active(this.todos);
    }
  },

  components: {
    todo: Todo
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
input[autofocus] {
  width: 100%;
  padding: 16px;
  border: none;
  margin: 0px -2px;
  font-size: 1.5em;
  border-bottom: 1px solid #555555;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0 0 10px 0;
}
div {
  padding: 0 10px;
}
</style>