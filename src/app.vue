<template>
  <input autofocus v-model="input">
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
    todos: [{title: "Learn how to make web apps", completed: true}, {title:"..."}, {title: "Profit!"}],
    input: ''
  }
};
</script>

<style>
</style>