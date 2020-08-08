<template>
  <div
    draggable="true"
    class="card-container"
    v-bind:id="item"
    v-on:dragstart="drag"
  >
    {{ item }}
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "Card",
  props: ["item"],
  methods: {
    drag: (event) => {
      store.commit("setDraggedTask", { taskName: event.target.id });
    },
  },
};
</script>

<style>
.card-container {
  width: 95%;
  height: 50px;
  background-color: silver;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid silver;
  box-shadow: 0 2px 5px 0 gray;
  margin: 2% 0;
  cursor: move;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media screen and (max-width: 700px) {
  .card-container {
    min-width: 100px;
    width: 100px;
    margin: 0 5%;
    height: 80%;
  }
}
</style>
