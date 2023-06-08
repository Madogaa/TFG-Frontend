<template>
  <div class="modal show" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Nueva Publicacion</h5>
          <button @click="close" type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="publicar" enctype="multipart/form-data">
          <div class="modal-body">
            <div class="form__input">
              <p>Descripcion: </p>
              <textarea v-model="descripcion" name="descripcion" id="" cols="30" rows="3"></textarea>
            </div>
            <div class="form__input-file">
              <p>Upload: </p>
              <input @change="clickImagen($event)" type="file" multiple accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*" />
            </div>
            <select v-model="selectGrado" v-on:change="selected" class="form-select" aria-label="Default select example">
              <option selected>Elije un grado</option>
              <option v-for="grado in grados" v-bind:key="grado.idGrado"
                v-bind:value="{ idGrado: grado.idGrado, nombre: grado.nombre }">{{ grado.nombre }}</option>
            </select>
            <select v-on:change="selectingAsignatura" v-model="selectAsignatura" v-if="showSelected" class="form-select"
              aria-label="Default select example">
              <option value="0" selected>Elije Asignatura</option>
              <option v-for="asignatura in  grados[selectGrado.idGrado - 1].asignaturaList" v-bind:key="asignatura.idAsignatura"
                v-bind:value="{ idAsignatura: asignatura.idAsignatura, nombre: asignatura.nombre }">{{ asignatura.nombre }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <input type="submit" class="btn btn-primary" value="Save Changes"/>
            <button @click="close" type="button" class="btn btn-secondary">Close</button>
          </div>
        </form>
      </div>
  </div>
</div></template>

<script>
import http from 'axios'
import { bus } from '@/event-bus.js'
import { storage } from '../vuefire/firebase'
import { uploadBytes, ref } from 'firebase/storage'

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
      grados: [],
      url: '',
      selectGrado: {
        idGrado: 0,
        nombre: '',
        asignaturaList: []
      },
      fileNames: [],
      descripcion: '',
      showSelected: false,
      selectedAsignatura: false
    }
  },
  mounted () {
    this.getGrados()
  },
  methods: {
    selected (data) {
      this.showSelected = true
    },
    selectingAsignatura () {
      this.selectedAsignatura = true
    },
    clickImagen (event) {
      this.fileNames = []
      for (let i = 0; i < event.target.files.length; i++) {
        this.fileNames.push(event.target.files[i])
        console.log(this.fileNames[i].name)
      }
    },
    publicar () {
      if ((this.descripcion?.length === 0) | (this.selectAsignatura == null) | (this.selectGrado == null) | (this.fileNames?.length === 0)) {
        this.close()
        const errmsg = 'Porfavor rellene todos los campos antes de guardar cambios'
        bus.emit('mostarError', errmsg)
        return
      }
      let imgRef
      for (let i = 0; i < this.fileNames.length; i++) {
        imgRef = ref(storage, `publicacion/${this.user}/${this.fileNames[i].name}`)
        uploadBytes(imgRef, this.fileNames[i])
          .then(e => console.log(e))
      }
      // eslint-disable-next-line node/handle-callback-err
      return http.post(
        'http://143.47.50.240:80/APIdotshare/publicacion',
        {
          descripcion: this.descripcion,
          idPerfil: this.idPerfil,
          idAsignatura: this.selectAsignatura.idAsignatura
        }
      )
        .then((response) => response.data)
        .then(response => this.postFiles(response))
        .then(reponse => bus.emit('actualizarPublicaciones', false))
        .then(this.close())
        .catch((err) => console.log(err))
    },
    postFiles (id) {
      for (let i = 0; i < this.fileNames.length; i++) {
        http.post(
          'http://143.47.50.240:80/APIdotshare/archivo',
          {
            idPublicacion: id,
            dir: this.fileNames[i].name
          }
        ).then(response => response.data)
          .then(response => console.log(response))
      }
    },
    getGrados () {
      return http(
        {
          method: 'GET',
          url: 'http://143.47.50.240:80/APIdotshare/grados'
        }
      )
        .then((response) => response.data)
        .then(grados => {
          this.grados = grados
        })
        .catch((err) => console.log(err))
    },
    close () {
      this.$emit('cierra', false)
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
