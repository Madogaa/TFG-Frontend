<template>
  <div class="modal show" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Settings</h5>
          <button @click="close" type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="publicar" enctype="multipart/form-data">
          <div class="modal-body">
            <div class="form__input">
              <p>Nombre: </p>
              <input type="text" v-model="nombre" name="nombre" />
            </div>
            <div class="form__input-file">
              <p>Imagen Perfil: </p>
              <input @change="clickImagen($event)" type="file" accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*" />
            </div>
            <div class="form__input-file">
              <p>Banner: </p>
              <input @change="clickBanner($event)" type="file" accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*" />
            </div>
          </div>
          <div class="modal-footer">
            <input type="submit" class="btn btn-primary" value="Save Changes"/>
            <button @click="close" type="button" class="btn btn-secondary">Close</button>
          </div>
        </form>
      </div>
  </div>
</div>
</template>

<script>
import http from 'axios'
import { storage } from '../vuefire/firebase'
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage'
import { bus } from '@/event-bus.js'

export default {
  name: 'ModalVue',
  props: {
    user: {
      type: String,
      required: true
    },
    idPerfil: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      imagen: null,
      imgBanner: null,
      nombre: ''
    }
  },
  mounted () {
  },
  methods: {
    clickImagen (e) {
      this.imagen = e.target.files[0]
    },
    clickBanner (e) {
      this.imgBanner = e.target.files[0]
    },
    publicar () {
      if ((this.nombre?.length === 0) | (this.imagen == null) | (this.imgBanner == null)) {
        this.close()
        const errmsg = 'Porfavor rellene todos los campos antes de guardar cambios'
        bus.emit('mostarError', errmsg)
        return
      }
      return http.post(
        `http://143.47.50.240:80/APIdotshare/perfilupdate/${this.idPerfil}`,
        {
          nombre: this.nombre,
          img: `${this.imagen.name}`,
          imgBanner: `${this.imgBanner.name}`
        }
      )
        .then((response) => response.data)
        .then(response => {
          console.log(response)
          const imgRef = ref(storage, `perfil/${this.user}/${this.imagen.name}`)
          uploadBytes(imgRef, this.imagen)
            .then(e => {
              const bannerRef = ref(storage, `perfil/${this.user}/${this.imgBanner.name}`)
              uploadBytes(bannerRef, this.imgBanner)
                .then(e => this.$emit('actualizaProfileImage', false))
            })
        })
        .catch((err) => console.log(err))
    },
    getImagen () {
      const imgRef = ref(storage, 'images/laura/c2.png')
      getDownloadURL(imgRef)
        .then((url) => {
          console.log('emit' + url)
        })
        .catch((error) => {
          switch (error.code) {
            case 'storage/object-not-found':
              break
            case 'storage/unauthorized':
              break
            case 'storage/canceled':
              break
            case 'storage/unknown':
              break
          }
        })
    },
    close () {
      this.$emit('cierraSetting', false)
    }
  }
}
</script>

<style scoped>
.show{
  display: block;
}
.form-select{
  margin: 0 0 1em 0;
}
</style>
