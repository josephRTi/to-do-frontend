<template>
  <div class="container">
    <form class="login_form" name="r_form" method="post">
      <p class="head_text">Регистрация</p>
      <input class="input_line inp" type="text" id="username" name="username" placeholder="Username"><br>
      <input class="input_line inp" type="text" id="email" name="email" placeholder="email"><br>
      <input class="input_line inp" type="password" id="password" name="password" placeholder="Password"><br>
      <input class="input_line inp" type="password" id="password2" name="password_confirmation"
             placeholder="Password"><br>
      <input class="input_line btn" type="submit" value="Зарегистрироваться" @click.prevent="submit_form">
    </form>
    <ul class="errors_list">
      <li v-for="(key, item) in errors" :key="item">{{ item }} : {{ key }}</li>
    </ul>
    <br>
  </div>
</template>

<script>
import axios from "axios";
import router from "../../router";


export default {
  name: "TheRegister",
  data() {
    return {
      errors: {},
      flag: false
    }
  },
  methods: {
    validate_pass(pwd1, pwd2) {
      return pwd1 === pwd2 && pwd1 !== "";
    },

    isEmpty(obj) {
      return Object.keys(obj).length === 0;
    },

    submit_form() {
      let pwd = document.r_form.password.value
      let pwd2 = document.r_form.password.value
      let username = document.r_form.username.value
      let email = document.r_form.email.value


      axios.post('https://restapito-do-app.herokuapp.com/api/register/',
          {
            username: username,
            password: pwd,
            password2: pwd2,
            email: email
          }
      ).then(response => {
        this.$store.state.user_id = response.data.id
      }).catch(error => {
        this.errors = {}
        for (let i in error.response.data) {
          this.errors[i] = error.response.data[i][0]
        }
      })
      if (this.isEmpty(this.errors)) {
        router.push({path: '/'})
      }
    }
  }
}
</script>

<style scoped>

@media (min-width: 800px) {
  .container {
    width: 1000px;
    margin: 0 auto;
  }

  .input_line {
    width: 400px;
  }
}

.errors_list {
  list-style: none;
  color: darkred;
  font-size: 18px;
  font-family: Montserrat, sans-serif;
}

.container {
  display: grid;
  width: 1000px;
  margin: 0 auto;
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
  width: 250px;
  height: 35px;
  font-family: Montserrat, sans-serif;
  font-size: 18px;
  color: white;
  background-color: #272727;
  border-style: none;
  border-radius: 2px;
}
</style>
