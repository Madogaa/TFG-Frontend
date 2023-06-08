<template>
  <div class="container">
    <div class="chatperfil" >
      <div class="chatimg">
        <img src="../assets/logo.png" alt="">
      </div>
      <h5 class="animated fadeIn">¡Bienvenido a DotShare!</h5>
    </div>
    <div class="container">

      <div class="chat-container">
        <div class="message-bubble">
            <div class="cone"></div>
            <h2 class="animated fadeInUp">¿Quiénes somos?</h2>
            <p class="animated fadeInUp">Un estudiante de segundo año de Desarrollo de Aplicaciones Multiplataforma. Y esta pagina web es mi propuesta final del trabajo de fin de grado (TFG)</p>
        </div>
      </div>

      <div class="chat-container-r">
        <div class="message-bubble-r">
            <div class="cone-r"></div>
            <h2 class="animated fadeInUp">¿Qué ofrecemos?</h2>
      <p class="animated fadeInUp">Nuestra página web proporciona una plataforma para compartir información, interactuar con otros usuarios y acceder a servicios exclusivos. Ofrecemos una experiencia única y personalizada para cada usuario.</p>
        </div>
      </div>

      <div class="chat-container">
        <div class="message-bubble">
            <div class="cone"></div>
            <h2 class="animated fadeInUp">¿Cómo utilizar nuestra página web?</h2>
            <p class="animated fadeInUp">Utilizar nuestra página web es muy sencillo. Simplemente crea una cuenta, inicia sesión y explora todas las funcionalidades disponibles. Puedes personalizar tu perfil, publicar contenido, seguir a otros usuarios y mucho más.</p>
            <p class="animated fadeInUp">¡Únete a nuestra comunidad y comienza a compartir tus apuntes hoy mismo! Juntos, podemos crear una plataforma enriquecedora donde el conocimiento esté al alcance de todos.</p>
          </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'About',
  data () {
    return {
      carouselImages: [
        { url: '../assets/welcomeimg.jpg', alt: 'Imagen 1' },
        { url: 'path/to/image2.jpg', alt: 'Imagen 2' },
        { url: 'path/to/image3.jpg', alt: 'Imagen 3' }
      ],
      currentSlide: 0
    }
  },
  methods: {
    prevSlide () {
      if (this.currentSlide > 0) {
        this.currentSlide--
      }
    },
    nextSlide () {
      if (this.currentSlide < this.carouselImages.length - 1) {
        this.currentSlide++
      }
    }
  }
}
</script>

<style scoped>
.container{
  text-align: left;
  padding: 50px;
}
.row{
  align-items: center;
  border-radius: 10px;
}
.container h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

.container h2 {
  font-size: 24px;
  margin-top: 10px;
}

.container p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.fadeIn {
  animation: fadeIn 1s ease-in;
}

.fadeInUp {
  animation: fadeInUp 1s ease-in;
}

.chat-container {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 50px;
}

.chat-container-r {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 50px;
}

.cone {
  position: absolute;
  bottom: -20px;
  left: 0px;
  transform: rotate(90deg);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 40px solid #DCF8C6;
}

.cone-r {
  position: absolute;
  bottom: -20px;
  right: 0px;
  transform: rotate(-90deg);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 40px solid  #ECE5DD;
}

.message-bubble {
  position: relative;
  background-color: #DCF8C6;
  color: #333;
  padding: 10px;
  padding-bottom: 30px;
  border-radius: 15px;
  max-width: 70%;
  margin-bottom: 10px;
  align-self: flex-start;
}

.message-bubble-r {
  position: relative;
  background-color: #ECE5DD;
  color: #333;
  padding: 10px;
  padding-bottom: 30px;
  border-radius: 15px;
  max-width: 70%;
  margin-bottom: 10px;
  align-self: flex-end;
}

.chatimg{
  height: 64px;
  width: 64px;
  border: #c7c7c7 solid 1px;
  border-radius: 50%;
}
.chatimg img{
  width: 100%;
  overflow: hidden;
  border-radius: 50%;
}

.message-bubble p {
  margin: 0;
}

.chatperfil{
  display: flex;
  align-items: baseline;
  column-gap: 20px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
