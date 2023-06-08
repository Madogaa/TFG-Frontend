<template>
  <form @submit.prevent="checkUser" class="cover">
      <div class="box signup">
          <h2>Inicio sesion</h2>
          <div class="form__input">
              <p>Usuario: </p>
              <input v-model="userName" type="text" name="user" id="">
          </div>
          <div class="form__input">
              <p>Contraseña: </p>
              <input v-model="password" type="password" name="password" id="">
          </div>
          <div>
              <button class="submit" type="submit">LogIn</button>
          </div>
      </div>
    </form>
</template>

<script>
import http from 'axios'
import { bus } from '@/event-bus.js'
export default {
  name: 'SignUpView',
  components: {
  },
  data () {
    return {
      user: {
        id_usuario: 0,
        nombre: '',
        email: '',
        passwd: ''
      },
      userName: '',
      password: '',
      isBad: false,
      msg: ''
    }
  },
  methods: {
    checkUser () {
      return http(
        {
          method: 'GET',
          url: 'http://143.47.50.240:80/APIdotshare/usuarios'
        }
      )
        .then((response) => response.data)
        .then(users => {
          this.user = users.filter(user => user.nombre === this.userName)[0]
          if (!this.user) {
            const errmsg = 'Usuario no existe'
            bus.emit('mostarError', errmsg)
          } else {
            if (this.user.passwd !== this.password) {
              const errmsg = 'Contraseña no coincide'
              bus.emit('mostarError', errmsg)
            } else {
              sessionStorage.setItem('user', JSON.stringify(this.user))
              this.$router.push({ name: 'alperfil', params: { id: this.user.nombre } })
              bus.emit('actualizaNav', false)
              this.isBad = false
            }
          }
        })
        .catch((err) => console.log(err))
    }
  }
}
</script>

<style scoped>
.signup{
  position:relative;
  background-color: #a1998f;
  box-shadow: 0px 0px 25px #a1998f;
  border: 1px solid #e4e4ce;
  color: whitesmoke
}
.signup::after{
  position:absolute;
  content: "";
  bottom: -40px;
  right: -40px;
  transform: rotate(-225deg);
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid #a1998f;

}

.signup::before {
  content: '';
  position: absolute;
  bottom: -40px;
  right: -40px;
  transform: rotate(-45deg);
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 100px solid #a1998f;
  filter: blur(30px);
}
</style>
