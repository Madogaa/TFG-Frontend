<template>
  <nav class="navigation" :key="user">
    <div class="navigation__left">
      <router-link to="/">
        <img src="../assets/logo.png" class="navitagion__logo" alt="">
      </router-link>
      <div class="navigation__left__actions">
        <router-link v-if="searchShow" :to="{ name: 'alperfil', params: { id: `${this.idsession}` } }">Home</router-link>
        <router-link to="/about">About</router-link>
      </div>
    </div>
    <div class="navigation__rigth">
      <router-link v-if="!searchShow" to="/signin">
        <input type="button" class="btn" value="Iniciar Sesion">
      </router-link>
      <router-link v-if="!searchShow" to="/signup">
        <input type="button" class="btn" value="Registrarme">
      </router-link>
      <form class="search" v-if="searchShow" @submit.prevent="search()" >
        <div class="search-box">
        <button type="submit" class="btn-search"><img src="../assets/search.png"/></button>
        <input v-model="this.searchName" type="text" class="input-search" placeholder="Type to Search...">
        </div>
      </form>
      <button class="exit" v-if="searchShow" @click="closeSession"><img src="../assets/salida.png" alt=""></button>
      </div>
  </nav>
</template>

<script>
import { bus } from '@/event-bus.js'
export default {
  name: 'NavigationVue',
  methods: {
    checkSession () {
      const user = JSON.parse(sessionStorage.getItem('user'))
      if (user) {
        console.log(this.idsession + '/')
        this.idsession = user.nombre
        this.searchShow = true
      }
    },
    search () {
      if (this.searchName === '') { return }
      this.$router.push({ name: 'searchProfile', params: { search: this.searchName } })
    },
    closeSession () {
      sessionStorage.removeItem('user')
      bus.emit('actualizaNav', false)
      this.$router.push({ name: 'signin' })
    }
  },
  mounted () {
    this.checkSession()
  },
  data () {
    return {
      searchShow: false,
      searchName: '',
      user: false,
      idsession: {
        type: String,
        required: true
      }
    }
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}
.exit{
background-color: #41b883;
border: none;
border-radius: 0.7em;
}
.search{
width: 300px;
display: flex;
justify-content: right;
padding: 0 1em 0 0;
}
.navigation{
display: flex;
justify-content: space-around;
align-items: center;
background-color: black;
height: 8vh;
padding: 0 5%;
}
.navigation a{
color: white;
font-weight: bold;
padding: 0 0.3em;
margin: 0 0.5em;
}
.navigation__rigth{
display: flex;
}
.navigation input[type="button"]{
padding: 0.6em 0.8em;
color: white;
font-weight: bold;
background-color: #41b883;
border-radius: 0.25em;
border: none;
}
.navigation input[type="button"]:hover{
background-color: #4b8080;
cursor: pointer;
}
.navigation__left{
display: flex;
align-items: center;
column-gap: 10px;
}
.navitagion__logo{
width: 64px;
}
.navigation__left__actions a{
position: relative;
}
.navigation__left__actions a::after {
  content: '';
  position: absolute;
  bottom: -0.3em;
  left: 0;
  width: 0;
  height: 3px;
  background:#5d9b9b;
  transition: width .3s;
}
.navigation__left__actions a:hover::after {
  width: 100%;
  transition: width 0.3s;
}
.search-box{
width: fit-content;
height: fit-content;
position: relative;
}
.input-search{
height: 50px;
width: 50px;
border-style: none;
padding: 10px;
font-size: 18px;
letter-spacing: 2px;
outline: none;
border-radius: 25px;
transition: all .5s ease-in-out;
background-color: #41b883;
padding-right: 40px;
color:#fff;
}
.input-search::placeholder{
color:rgba(255,255,255,.5);
font-size: 18px;
letter-spacing: 2px;
font-weight: 100;
}
.btn-search{
width: 50px;
height: 50px;
border-style: none;
font-size: 20px;
font-weight: bold;
outline: none;
cursor: pointer;
border-radius: 50%;
position: absolute;
right: 0px;
color:#ffffff ;
background-color:transparent;
pointer-events: painted;
}
.btn-search:focus ~ .input-search{
width: 300px;
border-radius: 0px;
background-color: transparent;
border-bottom:1px solid rgba(255,255,255,.5);
transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}
.input-search:focus{
width: 300px;
border-radius: 0px;
background-color: transparent;
border-bottom:1px solid rgba(255,255,255,.5);
transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}
</style>
