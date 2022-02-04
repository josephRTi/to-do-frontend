<template>
  <div class="container">
    <form class="login_form" name="l_form" method="post">
      <p class="head_text">Вход</p>
      <input class="input_line inp" type="text" id="username" name="username" placeholder="Username"><br>
      <input class="input_line inp" type="password" id="password" name="password" placeholder="Password"><br>
      <div class="btn_group">
        <input class="input_line btn" type="submit" value="Войти" @click.prevent="submit_form">
        <router-link class="text_link" to="/register"><a>Регистрация</a></router-link>
      </div>
    </form>
    <ul class="errors_list">
      <li v-for="(key, item) in errors" :key="item">{{ (item === 'non_field_errors' ? "Неверный логин или пароль" : item) }} : {{ key }}</li>
    </ul>
    <br>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TheLogin",
  data() {
    return {
      errors: []
    }
  },
  methods: {
    submit_form() {
      let pwd = document.l_form.password.value
      let username = document.l_form.username.value
      axios.post('https://restapito-do-app.herokuapp.com/api/auth/',
          {
            username: username,
            password: pwd
          }
      ).then(response => {
        this.$store.state.Token = response.data.token
        this.$store.state.user_id = response.data.id
      }).catch(error => {
        this.errors = {}
        for (let i in error.response.data) {
          this.errors[i] = error.response.data[i][0]
        }
      })
      if (this.errors.length !== 0) {
        this.router.push('/TaskList')
      }
    }
  }
}
</script>

<style scoped>

.btn_group {
  display: flex;
}
.text_link {
  margin-top: 8px;
  margin-left: 30px;
  font-family: Montserrat, sans-serif;
  font-size: 18px;
  color: #272727;
}
.errors_list {
  list-style: none;
  color: darkred;
  font-size: 18px;
  font-family: Montserrat, sans-serif;
}

@media (min-width: 800px) {
  .container {
    width: 1000px;
    margin: 0 auto;
  }

  .input_line {
    width: 400px;
  }
}

.container {
  display: grid;
  /*width: 1000px;*/
  /*margin: 0 auto;*/
  justify-content: center;
  align-items: center;
}

.login_form {
  display: grid;
  text-align: center;
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
}

.input_line {
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

.head_text {
  font-family: Montserrat, sans-serif;
  font-size: 36px;
  text-align: center;
}

.inp {
  margin-bottom: 20px;
}

.btn {
  width: 90px;
  height: 35px;
  font-family: Montserrat, sans-serif;
  font-size: 18px;
  color: white;
  background-color: #272727;
  border-style: none;
  border-radius: 2px;
}
</style>
