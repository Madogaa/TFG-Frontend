<template>
  <div class="container">
    <my-modal :idPerfil="perfil.idPerfil" :user="id" @cierra="cierra" v-if="showModal"></my-modal>
    <my-modal-setting :user="id" :idPerfil="perfil.idPerfil" @cierraSetting="cierraSetting" v-if="showSetting"></my-modal-setting>
    <div class="profile">
        <!-- Banner -->
        <div class="banner">
          <img class="imgBanner" v-if="showImages" :src="this.imgBanner"  />
          <img class="imgBanner" v-if="!showImages" src="../assets/default_banner.jpg"  />
            <div v-if="this.showButtoms" @click="setting" class="settings">
              <img src="../assets/setting.png" />
            </div>
            <div :key="showSigue" v-if="!this.showButtoms && showSigue" @click="follow" class="follow">
              <p>Seguir</p>
            </div>
            <div class="profile__img">
              <img class="img" v-if="showImages" :src="this.img"  />
              <img class="img" v-if="!showImages" src="../assets/default.png" />
            </div>
        </div>
        <div class="underbanner">
            <p class="under__title">{{ perfil.nombre }}</p>
            <div class="under__content row">
              <div class="under__details col-6">
                <div class="under__parts">
                  <p>Nick: </p>
                  <p> @{{ id }}</p>
                </div>
                <div class="under__parts">

                </div>
              </div>
              <div class="row col-6">
                <div class="infor col-4">
                  <p>{{ perfil.npublicaciones }}</p>
                  <h6>publicaciones</h6>
                </div>
                <router-link class="infor col-4" :to="{ name: 'profileListView', params: { id: this.id, search: 'seguidos' } }">
                  <p>{{ perfil.nseguidos }}</p>
                  <h6>seguidos</h6>
                </router-link>
                <router-link class="infor col-4" :to="{ name: 'profileListView', params: { id: this.id, search: 'seguidores' } }">
                  <p>{{ perfil.nseguidores }}</p>
                  <h6>seguidores</h6>
                </router-link>
              </div>
            </div>
          </div>
        <div class="contenido">
          <button v-if="this.showButtoms" class="addPublicacion" v-on:click="dialog">+</button>
          <my-acordion :showDelete="this.showButtoms" :key="this.updatePublish" ref="acordeon" class="acordeon" :profileName="this.id" :idPerfil="perfil.idPerfil" v-if="this.perfilLoaded" ></my-acordion>
        </div>
    </div>
  </div>
</template>

<script>
import http from 'axios'
import MyModal from './Modal.vue'
import MyAcordion from './AcordionAsignatura.vue'
import MyModalSetting from './ModalSetting.vue'
import { bus } from '@/event-bus.js'
import { storage } from '@/vuefire/firebase'
import { ref, getDownloadURL } from '@firebase/storage'
export default {
  name: 'SignUpView',
  components: {
    MyModal,
    MyAcordion,
    MyModalSetting
  },
  props: {
    id: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      img: '',
      imgBanner: '',
      perfil: {
        idPerfil: '',
        nombre: '',
        img: '',
        imgBanner: '',
        creationDate: ''
      },
      publicaciones: [],
      asignaturas: [],
      archivos: [],
      showModal: false,
      showSetting: false,
      showImages: false,
      perfilLoaded: false,
      updatePublish: false,
      showButtoms: false,
      sessionuser: null,
      showSigue: true
    }
  },
  mounted () {
    console.log(this.id)
    bus.on('actualizarPublicaciones', this.handleActualizaPublicaciones)
    this.checkVisibility()
    this.getProfile()
    this.getPublicaciones()
  },
  methods: {
    checkSeguido () {
    },
    checkVisibility () {
      const user = JSON.parse(sessionStorage.getItem('user'))
      this.sessionuser = user
      if (user.nombre === this.id) {
        this.showButtoms = true
      }
    },
    follow () {
      const perfilId = JSON.parse(sessionStorage.getItem('user')).perfil.idPerfil
      console.log(perfilId)
      const seguidoId = parseInt(this.perfil.idPerfil)
      http.post(`http://143.47.50.240:80/APIdotshare/perfil/${perfilId}/seguir/${seguidoId}`)
        .then((response) => response.data)
        .then(response => {
          this.showSigue = false
        })
    },
    handleActualizaPublicaciones () {
      this.updatePublish = !this.updatePublish
    },
    getProfile () {
      return http(
        {
          method: 'GET',
          url: `http://143.47.50.240:80/APIdotshare/perfil/${this.id}`
        }
      )
        .then((response) => response.data)
        .then(perfil => {
          this.perfil = perfil
          // this.perfil.creationDate = this.perfil.creationDate.slice(0, 10)
          this.perfilLoaded = true
          const imgRef = ref(storage, `perfil/${this.id}/${this.perfil.img}`)
          getDownloadURL(imgRef)
            .then((url) => {
              this.img = url
              this.showImages = true
            })
            .catch((error) => console.log(error))
          const bannerRef = ref(storage, `perfil/${this.id}/${this.perfil.imgBanner}`)
          getDownloadURL(bannerRef)
            .then((url) => {
              this.imgBanner = url
              this.showBanners = true
            })
            .catch((error) => console.log(error))
          http(
            {
              method: 'GET',
              url: `http://143.47.50.240:80/APIdotshare/asignaturas/${this.perfil.idPerfil}`
            }
          )
            .then((response) => response.data)
            .then(asignaturas => {
              this.asignaturas = asignaturas
              this.updatePublish = !this.updatePublish
              http(
                {
                  method: 'GET',
                  url: `http://143.47.50.240:80/APIdotshare/perfil/${this.sessionuser.perfil.idPerfil}/sigue/${perfil.idPerfil}`
                }
              )
                .then((response) => response.data)
                .then(seg => {
                  if (seg.length) {
                    this.showSigue = false
                  }
                })
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
    },
    getPublicaciones () {
    },
    dialog () {
      this.showModal = true
    },
    setting () {
      this.showSetting = true
    },
    cierra (info) {
      this.showModal = info
    },
    cierraSetting (info) {
      this.showSetting = info
    }
  },
  watch: {
    '$route.params': {
      handler () {
        this.getProfile()
        this.getPublicaciones()
        this.checkVisibility()
      }
    }
  }
}
</script>

<style scoped>
a{
  color: #34495E;
  text-decoration: none;
}
a :hover{
  color: #34495E;
}
h1{
  margin: 0;
  padding: 0;
}
.profile{
    background-color: #41b883;
}
.banner{
    position: relative;
    height: 25vh;
    background-color: #34495E;
}
.underbanner{
    height: 7em;
    background-color: #41b883;
    margin: 0 0 0 16em;
}
.settings{
  background-color: #41b883;
  cursor: pointer;
  position: absolute;
  top: 1em;
  right: 1em;
  width: fit-content;
  padding: 0.25em 0.5em;
  border-radius: 0.5em;
}
.follow{
  background-color: #41b883;
  cursor: pointer;
  position: absolute;
  bottom: 1em;
  right: 1em;
  width: fit-content;
  padding: 0.25em 0.5em;
  border-radius: 0.5em;
}
.follow p {
  margin: 0;
  font-size: 1.2em;
  font-weight: 600;
  color: white;
}
.profile__img{
    position: absolute;
    background-color: rgba(0,0,0,0);
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.under__content{
  justify-content:space-between;
  margin: 0;
  padding: 0 1.3em;
}
.under__parts{
  display: flex;
}
.under__details{
  text-align: left;
  margin: 0;
  padding: 0;
}
.under__parts p{
  padding: 0;
  margin: 0.2em 0;
}
.under__title {
  text-align: left;
  padding: 0.4em 0.5em 0.2em 1em;
  margin: 0;
  color: white;
  font-weight: bold;
  font-size: 20px;
}
.under__parts p:nth-child(1){
  font-weight: bold;
}
.imgBanner{
  width: 100%;
  height: 100%;
  padding: 0.2em;
  border-radius: 0.5em;
  object-fit: fill;
}
.img {
  border-radius: 50%;
  height: 100%;
  width: 100%;
}
.contenido{
  min-height: 55vh;
  background-color: #34495E;
  display: flex;
  flex-direction: column;
  position: relative;
}
.addPublicacion{
  width: fit-content;
  position:absolute;
  top:1em;
  right: 1em;
  color: white;
  background-color: #41b883 ;
  border: none;
  border-radius: 0.5em;
  padding: 0.5em 1em;
}
.acordeon{
  padding: 2em 12% 0 8%;
}
.infor{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.infor p{
  height: fit-content;
  font-size: 2em;
  padding: 0 0.2em;
  margin: 0;
  line-height: 1em;
  font-weight: 600;
}
.infor h6{
  margin: 0;
  padding: 0;
}
@media (min-width: 1px) {
  .profile__img {
    max-width: 180px;
    max-height: 180px;
    left: 32px;
    bottom:-90px;
  }  .under__title{
    margin-left: 0;
    padding-left: 0;
  }
  .under__content{
    padding-left: 0;
    margin-left: 0;
  }
  .underbanner{
    margin-left: 14em;
  }
}
@media (max-width: 600px) {
  .acordeon {
    padding-right: 18%;
  }
  .underbanner{
    margin-left: 16em;
  }
}
@media (min-width: 576px) {
  .container {
    max-width: 620px !important;
  }
  .profile__img {
    max-width: 190px;
    max-height: 190px;
    left: 52px;
    bottom:-95px;
  }
  .underbanner{
    margin-left: 16em;
  }
}
@media (min-width: 768px) {
  .container {
    max-width: 790px!important;
  }
  .underbanner{
    margin-left: 17em;
  }
}
@media (min-width: 992px) {
  .container {
    max-width: 900px!important;
  }
}
@media (min-width: 1200px) {
  .container {
    max-width: 1200px!important;
  }
  .profile__img {
    max-width: 220px;
    max-height: 220px;
    left: 62px;
    bottom:-110px;
  }
  .under__title{
    padding-left: 4em;
  }
  .under__content{
    padding-left: 5em;
  }
}
</style>
