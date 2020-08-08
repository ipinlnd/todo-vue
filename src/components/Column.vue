<template>
  <div class="column-container">
    <div class="header">{{ columnName }}</div>
    <div
      id="cardContainer"
      class="body"
      v-on:drop="drop"
      v-on:dragover="allowDrop"
    >
      <Card v-for="item in items" v-bind:key="item" v-bind:item="item" />
    </div>
  </div>
</template>

<script>
import Card from "./Card";
import store from "@/store";

export default {
  name: "Column",
  components: {
    Card,
  },
  props: ["columnName", "items", "onChange"],
  methods: {
    allowDrop: (event) => event.preventDefault(),
    drop: function(event) {
      event.preventDefault();
      const taskName = store.state.draggedTask;
      if (event.target.id === "cardContainer") {
        this.onChange(taskName, this.columnName);
      }
    },
  },
};
</script>

<style>
.column-container {
  flex: 1;
  margin: 0 2%;
  height: 500px;
  background-color: white;
  border-radius: 10px;
  border: 10px solid #394551;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
}

.header {
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 20px;
  background-color: #394551;
  color: white;
  font-size: 18px;
}

.body {
  width: 100%;
  height: calc(100% - 20px);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
}

@media screen and (max-width: 700px) {
  .column-container {
    flex: unset;
    height: 150px;
    width: 100%;
    margin: 1% 0;
  }

  .body {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>
