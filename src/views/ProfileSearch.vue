<template>
  <div class="container">
        <router-link  v-for="view in views" :key="view.idPerfil" class="rlink" :to="'/profile/'+view.nick">
          <img v-if="view.loaded" class="profile__img" :src="view.imageUrl" alt="">
          <img v-if="!view.loaded" class="profile__img" src="../assets/default.png" alt="">
          <div class="content">
             <h2>@{{ view.nick }}</h2>
             <h5>{{ view.nombre }}</h5>
             <p>{{ view.nseguidores }} followers.</p>
           </div>
        </router-link>
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
    }
  },
  data () {
    return {
      views: []
    }
  },
  methods: {
    getListView () {
      http(
        {
          method: 'GET',
          url: `http://143.47.50.240:80/APIdotshare/perfillike/${this.search}`
        }
      )
        .then((response) => response.data)
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
    }
  },
  watch: {
    '$route.params': {
      handler () {
        this.views = []
        this.getListView()
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
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
  width: 100%;
  display: flex;
  justify-content: center;
  column-gap: 3em;
  border-bottom: 1px solid gainsboro;
  text-decoration: none;
  color: #2c3e50;
}
.rlink:hover{
  color: #2c3e50;
}
</style>
