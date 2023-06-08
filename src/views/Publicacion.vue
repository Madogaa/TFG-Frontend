<template>
    <div class="publicacion">
      <div class="header">
        <div v-if="this.showDelete" class="delete">
          <img src="../assets/borrar.png" @click="emitEvento()" alt="">
        </div>
      </div>
      <p class="desc">
        {{ desc }}
      </p>
      <div v-for="archivo in this.archivos" v-bind:key="archivo.idArchivo" @click="downloadFile(archivo)" class="file">
        <p>{{ archivo.dir }}</p>
      </div>
    </div>
</template>

<script>
import { bus } from '@/event-bus.js'
import axios from 'axios'
import { storage } from '@/vuefire/firebase'
import { ref, getDownloadURL } from '@firebase/storage'
import { saveAs } from 'file-saver'

export default {
  name: 'MyPublicacion',
  props: {
    showDelete: {
      type: Boolean
    },
    idpub: {
      type: Number
    },
    desc: {
      type: String,
      required: true
    },
    archivos: {
      type: Array
    },
    profile: {
      type: String
    }
  },
  methods: {
    emitEvento () {
      axios(
        {
          method: 'GET',
          url: `http://143.47.50.240/APIdotshare/archivo/borrar/${this.idpub}`
        }
      ).then((response) => response.data)
        .then(data => {
          console.log('Archivos:' + data)
          axios(
            {
              method: 'GET',
              url: `http://143.47.50.240/APIdotshare/publicaciones/borrar/${this.idpub}`
            }
          ).then(response => {
            console.log('Publicacion borrada con exito')
            bus.emit('actualizarPublicaciones', false)
          })
        })
    },
    downloadFile (info) {
      const storageRef = ref(storage, `publicacion/${this.profile}/${info.dir}`)
      console.log('Archivo:' + storageRef)
      getDownloadURL(storageRef)
        .then(url => {
          console.log(url)
          const xhr = new XMLHttpRequest()
          xhr.responseType = 'blob'
          xhr.onload = function (event) {
            const blob = xhr.response
            saveAs(blob, info.dir)
          }
          xhr.open('GET', url)
          xhr.send()
        })
    }
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
  color: black;
}
p{
  margin: 0;
}
.delete img{
  padding: 0.5em;
  cursor: pointer;
}

.publicacion{
  position: relative;
  background: linear-gradient(60deg,rgba(255,255,255,0.13),rgba(52, 72, 94, 0.6));
  border: solid 1px rgba(255, 255, 255, 0.2);
  border-radius: 0.5em;
  box-shadow: 0 0 1em rgba(255, 255, 255, 0.13);
  margin: 25px 0;
  color: white;
  padding: 2em;
  padding-top: 35px;
  text-align: left;
}
.desc {
  padding-top: 20%;
  padding: 0.5em;
}

.file{
  width: fit-content;
  padding: 0 1em 0 2em;
  position: relative;
  border: solid 1px rgba(255, 255, 255, 0.2);
  border-radius: 1em;
  max-width: 150px;
  margin: 0.5em;
  cursor: pointer;
}

.file p{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.file::before{
  content:"";
  position: absolute;
  background: greenyellow;
  height: 0.5em;
  width: 0.5em;
  left: 1em;
  bottom: 0.5em;
  border-radius: 50%;
}
.header{
  position: absolute;
  top: 0;
  left: 0;
  height: 35px;
  width: 100%;
  background-color: aliceblue;
  border-radius: 0.5em 0.5em 0 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
