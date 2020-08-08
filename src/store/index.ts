import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    draggedTask: "",
  },
  mutations: {
    setDraggedTask(state, { taskName }) {
      state.draggedTask = taskName;
    },
  },
  actions: {},
  modules: {},
});
