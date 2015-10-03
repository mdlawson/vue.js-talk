<template>
  <li>
    <input type="checkbox" v-model="completed">
    <label v-on="dblclick: editing = true"
           v-show="!editing">{{title}}</label>
    <input v-model="title"
           v-on="blur:save, keyup:save | key 'enter'"
           v-show="editing">
    <a class="remove" v-on="click:onRemove($index)">[x]</a>
  </li>
</template>
<script>
export default {
  props: ['todo', 'onRemove'],
  methods: {
    save() {
      this.editing = false;
      this.title = this.title.trim();
      if (!this.title) {
        this.onRemove(this.$index);
      }
    },
  }
};
</script>

<style>
li {
  border-bottom: 1px solid #B0B0B0;
  padding: 10px;
  font-size: 1.2em;
}
li input {
  font-size: 1em;
  padding: 0px;
  margin: -2px 3px;
}
li a {
  float: right;
}
</style> 
