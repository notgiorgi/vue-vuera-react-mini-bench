<template>
  <div>
    <h1>Main Big HEADER</h1>

    <div>
      <h2>{{title}}</h2>
      <button v-on:click="onUpdateTitle">Update title</button>
      {{something}}
    </div>

    <br />

    <div>
      <h2>Counter</h2>
      <p>Current count: {{count}}</p>
      <button v-on:click="onCounterReset">Reset counter</button>
    </div>
    <br />
    <ol>
      <li v-for="num in randomNumbers" v-bind:key="num.id">{{num.value}}</li>
    </ol>
    <hr />
  </div>
</template>

<script>
import { randomNumbers } from "../config";

export default {
  props: ["something"],
  data: () => ({
    title: "Hello! I'm a vue component",
    count: 0,
    timer: null,
    randomNumbers
  }),
  methods: {
    onUpdateTitle: function() {
      this.title = "Updated title!";
    },
    onCounterReset: function() {
      this.count = 0;
    }
  },
  mounted: function() {
    this.timer = setInterval(() => {
      this.count += 1;
    }, 1000);
  },
  beforeDestroy: function() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>

<style>
.input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid blue;
}
ol {
  display: flex;
  overflow: scroll;
  width: 500px;
  height: 50px;
}
li {
  flex: 0 0 160px;
}
</style>
