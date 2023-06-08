<template>
  <navigation :key="actualizarNav"></navigation>
  <transition name="fade">
      <p v-if="showErr" class="info" :style="{ opacity: fadeOpacity, transitionDuration: fadeDuration + 's' }">{{ msg }}</p>
    </transition>
  <router-view :key="actualizarPerfil" />
</template>

<script>
import navigation from './views/Navigation.vue'
import { bus } from '@/event-bus.js'
export default {
  components: {
    navigation
  },
  data () {
    return {
      actualizarNav: false,
      actualizarPerfil: false,
      showErr: false,
      msg: '',
      fadeOpacity: 0,
      fadeDuration: 1.5, // Duración en segundos del fade-in y fade-out
      pauseDuration: 3
    }
  },
  mounted () {
    bus.on('actualizaNav', this.handleAztualizarNav)
    bus.on('actualizarPerfil', this.handleActualizaPerfil)
    bus.on('mostarError', this.handleMostrarError)
  },
  methods: {
    handleMostrarError (err) {
      this.showErr = true
      this.msg = err
      setTimeout(() => {
        this.fadeOpacity = 1
        setTimeout(() => {
          this.fadeOpacity = 0
          setTimeout(() => {
            this.showErr = false
            this.msg = ''
          }, this.fadeDuration * 1000)
        }, (this.fadeDuration + this.pauseDuration) * 1000)
      }, 100)
    },
    handleAztualizarNav () {
      this.actualizarNav = !this.actualizarNav
    },
    handleAztualizarPerfil () {
      this.actualizarPerfil = !this.actualizarPerfil
    }
  }
}
</script>

<style>
body{
  margin: 0;
}
a{
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.cover{
    display: flex;
    height: 92vh;
    flex-direction: column;
}

.box{
    margin: auto;
    padding: 1.5em 10%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 3em;
}
.box h2{
    text-align: center;
    padding-bottom: 0.5em;
}
.submit{
  margin-top: 0.2em;
    padding: 0.7em 1em;
    color: white;
    font-weight: bold;
    background-color: #41b883;
    border: none;
    border-radius: 0.2em;
}
.submit:hover{
    cursor: pointer;
    background-color: #5d9b9b;
}
.form__input-file{
    display: flex;
    justify-content: space-around;
    align-items:baseline;
}
.form__input-file p{
    text-align: left;
    width: 25%;
    height: 2em;
    font-weight: 600;
}
.form__input{
    display: flex;
    justify-content: space-between;
    align-items:baseline;
    padding: 0.2em 0;
}
.form__input-file input {
    border-radius: 0.3em;
    width: 50%;
    height: 2em;
}
.form__input-file input {
    border-radius: 0.3em;
    width: 50%;
    height: 2em;
}
.form__input input{
    border: solid 1px gainsboro;
    border-radius: 0.3em;
    box-shadow: inset 1px 1px 5px gainsboro;
    width: 50%;
    height: 2em;
}
.form__input textarea{
    border: solid 1px gainsboro;
    border-radius: 0.3em;
    box-shadow: inset 1px 1px 5px gainsboro;
    width: 50%;
    resize: none;
    margin-bottom: 1em;
}
.form__input p{
    text-align: left;
    width: 25%;
    height: 2em;
    font-weight: 600;
}
.info{
    width: 100%;
    background-color: red;
    color: white;
    margin: 0;
    padding: 10px 0;
    font-weight: bold;
    position: absolute;
    z-index: 100;
    top: 8vh;
    left: 0;
  }

  .fade-enter-active, .fade-leave-active {
  transition-property: opacity;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
