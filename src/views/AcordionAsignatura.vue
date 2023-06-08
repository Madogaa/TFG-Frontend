<template>
    <div>
      <div v-for="(subject, index) in subjects" :key="index">
        <div class="toggleHeader" @click="toggle(subject)">
          {{ subject.nombre }}
        </div>
        <div class="expand row" v-if="subject.open">
          <div class="col-lg-6 col-xl-4" v-for="(publication, index) in subject.publications" :key="index">
            <my-publicacion :showDelete="this.showDelete" :idpub="publication.idPublicacion" :profile="this.profileName" :archivos="publication.archivoList" :desc="publication.descripcion"></my-publicacion>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import MyPublicacion from './Publicacion.vue'
export default {
  name: 'MyAcordion',
  components: {
    MyPublicacion
  },
  props: {
    showDelete: {
      type: Boolean
    },
    profileName: {
      type: String
    },
    idPerfil: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      subjects: []
    }
  },
  mounted () {
    this.loadSubjects()
  },
  updated (nuevoValor) {
  },
  methods: {
    loadSubjects () {
      axios({
        method: 'GET',
        url: `http://143.47.50.240:80/APIdotshare/asignaturas/${this.idPerfil}`
      })
        .then(response => {
          this.subjects = response.data.map(subject => ({
            ...subject,
            open: false,
            publications: []
          }))
        })
        .catch(error => {
          console.log(error)
        })
    },
    toggle (subject) {
      if (!subject.publications.length) {
        axios.get(`http://143.47.50.240:80/APIdotshare/publicaciones/perfil/${subject.idAsignatura}`)
          .then(response => {
            subject.publications = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
      subject.open = !subject.open
    }
  }
}
</script>

<style scoped>
.toggleHeader {
    text-align: left;
    font-weight: bold;
    color:white;
    background-color:#41b883;
    width: 100%;
    padding: 0.7em 2em;
    border-radius: 0.2em;
    margin: 0.5em 0;
    cursor: pointer;
}
.expand{
  background:linear-gradient(320deg,rgba(255,255,255,0.2),rgba(52, 72, 94, 0.5));
  border-radius: 1em;
  border: solid 1px rgba(255, 255, 255, 0.2);
  margin: 0;
  padding: 1em 3em;
}

</style>
