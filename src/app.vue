<template>
  <input autofocus placeholder="What do you want to do?" 
    v-model="input"
    v-on="keyup:add | key 'enter'">
  <ul>
    <li v-repeat="todo : todos">
      <input type="checkbox" v-model="todo.completed">
      <label>{{ todo.title }}</label>
    </li>
  </ul>
</template>

<script>
export default {
  data: {
    todos: [],
    input: ''
  },

  methods: {
    add() {
      var value = this.input.trim();
      if (value) {
        this.todos.push({title: value, completed: false});
        this.input = '';
      }
    }
  }
};
</script>

<style>
</style>