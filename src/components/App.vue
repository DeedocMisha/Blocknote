<template>
  <div id="app">
    <Notebook
      @change-page="changePage"
      @new-page="newPage"
      :pages="pages"
      :activePage="index"
    />
    <Page @save-page="savePage" @delete-page="deletePage" :page="pages[index]" />
  </div>
</template>

<script>
import Notebook from "./NoteBook.vue";
import Page from "./PaGe.vue";
import axios from "axios";

// Убедитесь, что ваш Vue.js делает запросы на правильный URL вашего FastAPI сервера.
axios.defaults.baseURL = "http://localhost:8000";

export default {
  name: "app",
  components: {
    Notebook,
    Page,
  },
  data() {
    return {
      pages: [],
      index: 0,
    };
  },
  mounted() {
    axios
      .get("/pages/")
      .then((response) => {
        this.pages = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    newPage() {
      const newPage = {
        title: "",
        content: "",
      };
      axios
        .post("/pages/", newPage)
        .then((response) => {
          this.pages.push(response.data);
          this.index = this.pages.length - 1;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    changePage(index) {
      this.index = index;
    },
    savePage() {
      const page = this.pages[this.index];
      axios
        .put(`/pages/${page.id}`, page)
        .then(() => {
          console.log("Page updated");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deletePage() {
      const page = this.pages[this.index];
      axios
        .delete(`/pages/${page.id}`)
        .then(() => {
          this.pages.splice(this.index, 1);
          this.index = Math.max(this.index - 1, 0);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}

body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: row;
}
</style>
