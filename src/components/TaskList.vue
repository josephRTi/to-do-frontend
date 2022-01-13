<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <div class="container">
    <div class="tasks">
      <p class="head_text">📝To-Do List</p>
      <input class="task_input" placeholder="Чем планируете заняться?" id="new_node" v-on:keyup.enter="createNode">
      <ul class="counter">
        <li class="list-item first">Tasks: {{ count_of_tasks }}</li>
        <li class="list-item">Todo: {{ to_do }}</li>
        <li class="list-item">Done: {{ count_of_finished }}</li>
      </ul>
      <div class="task_list" v-for="item in nodes" :key="item.id">
        <input type="checkbox" class="check" :checked="item.is_finished" @click="updateItem(item.id)">
        <div class="task_item"><p>{{ item.node }}</p></div>
        <button class="fa fa-trash-o" style="font-size:36px; margin-left: 10px" @click="deleteItem(item.id)"></button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "TaskList",
  data() {
    return {
      nodes: [],
      todo: 0,
      tasks: 0,
      done: 0
    }
  },
  methods: {
    async deleteItem(id) {
      let node
      for (let i = 0; i < this.nodes.length; i++) {
        if (this.nodes[i].id === id) {
          node = this.nodes[i]
          break
        }
      }
      axios.delete('https://restapito-do-app.herokuapp.com/api/node_update/' + node.id, {
        headers: {
          Authorization: "Token " + this.$store.state.Token
        },
        data: node
      }).then(this.nodes = this.nodes.filter(function (item) {
        return item !== node
      }))
    },
    updateItem(id) {
      let node
      for (let i = 0; i < this.nodes.length; i++) {
        if (this.nodes[i].id === id) {
          node = this.nodes[i]
          break
        }
      }
      node.is_finished = !node.is_finished
      axios.put('https://restapito-do-app.herokuapp.com/api/node_update/' + node.id, node, {
        headers: {
          Authorization: "Token " + this.$store.state.Token
        },
      })
    },
    async createNode() {
      let node = document.getElementById('new_node').value
      let currentDate = new Date()
      let Node = {
        node: node,
        date: currentDate.toISOString().split('T')[0],
        user: this.$store.state.user_id,
        is_finished: false
      }
      axios.post('https://restapito-do-app.herokuapp.com/api/node/', Node, {
        headers: {
          Authorization: "Token " + this.$store.state.Token
        },
      }).then(response => (this.nodes.push(response.data)))
      document.getElementById('new_node').value = ""
    }
  },
  mounted() {
    axios.get('https://restapito-do-app.herokuapp.com/api/node/', {
      headers: {
        Authorization: "Token " + this.$store.state.Token
      }
    }).then(response => {
      for (let i = 0; i < response.data.length; i++) {
        const newItem = {
          user: response.data[i].user,
          node: response.data[i].node,
          id: response.data[i].id,
          is_finished: response.data[i].is_finished,
          date: response.data[i].date
        };
        this.nodes.push(newItem);
      }
    })
  },
  computed: {
    to_do() {
      let num = 0
      for (let i = 0; i < this.nodes.length; i++) {
        if (!this.nodes[i].is_finished) {
          num += 1
        }
      }
      return num
    },
    count_of_tasks() {
      return this.nodes.length
    },
    count_of_finished() {
      let num = 0;
      for (let i = 0; i < this.nodes.length; i++) {
        if (this.nodes[i].is_finished) {
          num += 1
        }
      }
      return num
    }
  }
}
</script>

<style scoped>

.container {
  display: flex;
  width: 1000px;
  margin: 20px auto;
  align-items: center;
  justify-content: center;
}

.tasks {
  position: relative;
}

h1 {
  font-family: Montserrat, sans-serif, "Noto Sans Old Italic";
  font-size: 24px;
  text-align: center;
}

.head_text {
  font-family: Montserrat, sans-serif;
  font-size: 36px;
  padding: 10px;
  margin: 0;
  text-align: center;
}

.task_input {
  width: 450px;
  height: 30px;
  border: none;
  border-radius: 2px;
  outline: none;
  box-shadow: 0 3px 5px grey;
  font-size: 16px;
  font-family: Montserrat, sans-serif;
  font-style: italic;
  padding: 8px;
}

.counter {
  display: flex;
  list-style: none;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.list-item {
  margin: 0 10px;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-size: 20px;
}

.first {
  margin-left: 0;
  padding-left: 0;
}

.del_btn {
  grid-area: dl;
  background-color: darkred;
  height: 30px;
  width: 30px;
}

.task_list {
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-template: "cb nd nd nd nd nd nd nd nd nd nd nd nd dl dl"auto
                 "cb nd nd nd nd nd nd nd nd nd nd nd nd dl dl";
  margin-top: 15px;
  font-family: Montserrat, sans-serif;
  font-size: 16px;
}

.check {
  grid-area: cb;
  height: 30px;
  width: 30px;
  margin: 0;
  padding: 0;
  filter: invert(0%) hue-rotate(750deg) brightness(100%);
}


.task_item {
  grid-area: nd;
  width: 370px;
  margin-left: 10px;
  padding: 0;
  border: 1px solid darkgray;
  /*height: 30px;*/
}

.task_item p {
  padding: 10px;
  margin: 0;
}

</style>
