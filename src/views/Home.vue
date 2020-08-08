<template>
  <div class="home">
    <div class="main">
      <Column
        columnName="Todo"
        v-bind:items="
          tasks.filter((x) => x.status === 'Todo').map((x) => x.name)
        "
        v-bind:onChange="onChange"
      />
      <Column
        columnName="Doing"
        v-bind:items="
          tasks.filter((x) => x.status === 'Doing').map((x) => x.name)
        "
        v-bind:onChange="onChange"
      />
      <Column
        columnName="Done"
        v-bind:items="
          tasks.filter((x) => x.status === 'Done').map((x) => x.name)
        "
        v-bind:onChange="onChange"
      />
    </div>
    <form class="form" v-on:submit="onCreate">
      <input
        placeholder="Task Name"
        class="input"
        v-bind:value="taskInput"
        v-on:change="onInputChange"
      />
      <button class="add-button">Create a new task</button>
    </form>
    <img
      v-on:drop="deleteTask"
      v-on:dragover="allowDrop"
      v-if="showTrash"
      class="trash"
      src="../assets/trash.png"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Column from "@/components/Column.vue";
import store from "@/store";
import { mapState } from "vuex";

interface Task {
  name: string;
  status: "Todo" | "Doing" | "Done";
}

export default {
  name: "Home",
  components: {
    Column,
  },
  data: function() {
    return {
      taskInput: "",
      tasks: (JSON.parse(this.$cookies.get("tasks")) || []) as Task[],
    };
  },
  computed: {
    showTrash() {
      return store.state.draggedTask !== "";
    },
  },
  methods: {
    saveTasks: function() {
      this.$cookies.set("tasks", JSON.stringify(this.tasks));
    },
    deleteTask: function() {
      const taskName = store.state.draggedTask;
      const ind = this.tasks.findIndex((x) => x.name === taskName);
      this.tasks.splice(ind, 1);
      store.commit("setDraggedTask", { taskName: "" });
      this.saveTasks();
    },
    allowDrop: (event: any) => event.preventDefault(),
    onInputChange: function(event: any) {
      this.taskInput = event.target.value;
    },
    onCreate: function(event: any) {
      event.preventDefault();
      this.tasks.push({
        name: this.taskInput,
        status: "Todo",
      });
      this.taskInput = "";
      this.saveTasks();
    },
    onChange: function(data: string, column: "Todo" | "Doing" | "Done") {
      const ind = this.tasks.findIndex((x) => x.name === data);
      if (ind >= 0) {
        this.tasks[ind].status = column;
        store.commit("setDraggedTask", { taskName: "" });
        this.saveTasks();
      }
    },
  },
};
</script>

<style>
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.add-button {
  width: 200px;
  height: 50px;
  margin-top: 5px;
  background-color: coral;
  color: white;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.add-button:hover {
  opacity: 0.6;
}

.form {
  margin-top: 25px;
}

.input {
  margin-right: 20px;
  width: 200px;
  outline: none;
  border: none;
  border-bottom: 1px solid red;
}
.main {
  width: 80%;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
}

.trash {
  position: absolute;
  right: 2%;
  bottom: 10%;
  height: 100px;
}

@media screen and (max-width: 700px) {
  .main {
    flex-direction: column;
  }
}
</style>
