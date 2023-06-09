<template>
    <div class="container">
      <div :key="this.someDeleted">
        <div class="row" v-for="view in views" :key="view.idPerfil">
        <router-link  class="rlink col-11" :to="'/profile/' + view.nick">
            <img v-if="view.loaded" class="profile__img" :src="view.imageUrl" alt="">
            <img v-if="!view.loaded" class="profile__img" src="../assets/default.png" alt="">
            <div class="content">
                <h2>@{{ view.nick }}</h2>
                <h5>{{ view.nombre }}</h5>
                <p>Followers: {{ view.nseguidores }}</p>
            </div>
        </router-link>
        <div v-if="showDelete" class="bin col-1" @click="deleteSegui(view.idPerfil)">
          <div class="h-26">
            <img src="../assets/borrar.png" alt="">
          </div>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
import http from 'axios'
import { storage } from '@/vuefire/firebase'
import { ref, getDownloadURL } from '@firebase/storage'

export default {
  name: 'ProfileSearch',
  props: {
    search: {
      type: String
    },
    id: {
      type: String
    }
  },
  data () {
    return {
      views: [],
      showDelete: false,
      someDeleted: 0
    }
  },
  mounted () {
    this.getListView()
    this.checkVisibility()
  },
  methods: {
    getImageUrl (view) {
    },
    checkVisibility () {
      const user = JSON.parse(sessionStorage.getItem('user'))
      if (user.nombre === this.id) {
        this.showDelete = true
      }
    },
    deleteSegui (seguidor) {
      http(
        {
          method: 'GET',
          url: `http://143.47.50.240:80/APIdotshare/perfil/${this.id}`
        }
      ).then((response) => response.data)
        .then(response => {
          http(
            {
              method: 'GET',
              url: `http://143.47.50.240/APIdotshare/borrar/${this.search}/${response.idPerfil}/${seguidor}`
            }
          ).then((response) => response.data)
            .then(response => {
              this.views = this.views.filter(view => view.idPerfil !== seguidor)
            })
        })
    },
    getListView () {
      http(
        {
          method: 'GET',
          url: `http://143.47.50.240:80/APIdotshare/perfil/${this.id}`
        }
      )
        .then((response) => response.data)
        .then(response => {
          http(
            {
              method: 'GET',
              url: `http://143.47.50.240:80/APIdotshare/perfil/${response.idPerfil}/${this.search}`
            }
          ).then((response) => response.data)
            .then(response => {
              response.forEach(e => {
                http(
                  {
                    method: 'GET',
                    url: `http://143.47.50.240:80/APIdotshare/perfilbyid/${e.idPerfil}`
                  }
                ).then((response) => response.data)
                  .then(response => {
                    e.nick = response.nombre
                    e.loaded = false
                    getDownloadURL(ref(storage, `perfil/${e.nick}/${e.img}`))
                      .then(url => {
                        e.loaded = true
                        e.imageUrl = url
                        this.views.push(e)
                      })
                      .catch(error => {
                        e.loaded = false
                        console.log('Error al descargar imagen:', error)
                        this.views.push(e)
                      })
                  })
              })
            })
        })
    }
  }
}
</script>

  <style scoped>
  .h-26{
    align-self: center;
    height: 26px;
  }
  .bin{
    display: flex;
    margin: auto;
    height: 100%;
  }
  .bin:hover{
    cursor: pointer;
  }
  .profile__img{
    background: red;
    width: 128px;
    object-fit:cover;
    border-radius: 50%;
    height: 128px;
  }
  .content{
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 270px;
  }
  .rlink{
    padding: 1em;
    display: flex;
    justify-content: center;
    column-gap: 3em;
    border-bottom: 1px solid gainsboro;
    text-decoration: none;
    color: #2c3e50;
  }
  .rlink:hover{
    background-color: gainsboro;
  }
  </style>
