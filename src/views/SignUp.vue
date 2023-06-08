<template>
    <form @submit.prevent="postUsuario" class="cover">
        <div class="box signup">
            <h2>Register</h2>
            <div class="form__input">
                <p>Usuario: </p>
                <input v-model="userName" type="text" name="user" id="">
            </div>
            <div class="form__input">
                <p>Email: </p>
                <input v-model="email" type="text" name="email" id="">
            </div>
            <div class="form__input">
                <p>Contraseña: </p>
                <input v-model="password" type="text" name="password" id="">
            </div>
            <div class="form__input">
                <p>Contraseña: </p>
                <input v-model="repassword" type="text" name="repeatpassword" id="">
            </div>
            <div>
                <button class="submit" type="submit">Registrar</button>
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
      users: [],
      userName: '',
      email: '',
      password: '',
      repassword: '',
      showMess: false,
      errMess: ''
    }
  },
  methods: {
    postUsuario () {
      if ((this.userName?.length === 0) | (this.email?.length === 0) | (this.password?.length === 0) | (this.repassword?.length === 0)) {
        const errmsg = 'Porfavor rellene todos los campos antes de continuar'
        bus.emit('mostarError', errmsg)
        return
      }
      if ((this.password !== this.repassword)) {
        const errmsg = 'Las contraeñas no coinciden'
        bus.emit('mostarError', errmsg)
        return
      }
      http(
        {
          method: 'GET',
          url: `http://143.47.50.240:80/APIdotshare/perfil/${this.userName}`
        }
      )
        .then((response) => response.data)
        .then(perfil => {
          if (!perfil) {
            http.post('http://143.47.50.240:80/APIdotshare/usuario',
              {
                nombre: this.userName,
                email: this.email,
                passwd: this.password
              })
              .then((response) => response.data)
              .then(response => {
                http.post('http://143.47.50.240:80/APIdotshare/perfil',
                  {
                    idUsuario: response,
                    nombre: this.userName
                  })
                  .then(e => {
                    sessionStorage.setItem('user', JSON.stringify(e.data))
                    this.$router.push({ name: 'alperfil', params: { id: this.userName } })
                    bus.emit('actualizaNav', false)
                  })
              })
              .catch((err) => console.log(err))
          } else {
            const errmsg = 'Ya existe usuario con ese nick'
            bus.emit('mostarError', errmsg)
          }
        })
    }
  }
}
</script>

<style scoped>
.signup{
  position:relative;
  background-color: #DCF8C6;
  box-shadow: 0px 0px 25px #DCF8C6;
  border: 1px solid #d0ffad;
  color: #41b883;
}
.signup::after{
  position:absolute;
  content: "";
  bottom:-40px;
  left: -40px;
  transform: rotate(225deg);
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid #DCF8C6;
}

.signup::before {
  content: '';
  position: absolute;
  bottom: -40px;
  left: -40px;
  transform: rotate(45deg);
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 100px solid #DCF8C6;
  filter: blur(30px);
}
</style>
