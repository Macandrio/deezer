<template>

    <!-- CARRUSEL -->
      <carrusel/>

    <!-- buscador -->
      <SearchBar/>



  <div class="container">
    <h1>Home</h1>
    <p>Bienvenido a la aplicación Deezer Music Client.</p>
    <p>
      Este proyecto sirve de base para la aplicación a desarrollar como tarea
      del curso.
    </p>
    <p>
      Para facilitar el desarrollo, este proyecto ya viene configruado con
      Bootstrap, Bootstrap Icons, SASS, router y Pinia
    </p>
  </div>
  <div class="row">
    <div class="col-md-6">
      <h1>Bootstrap Icons</h1>
      <p>Bootstrap Icons es una biblioteca de iconos creada por el equipo de Bootstrap. Proporciona una colección de
        iconos SVG gratuitos y de código abierto que se pueden utilizar fácilmente en proyectos web.</p>
      <p class="text-bg-light p-3 border">
        <i class="bi bi-alarm" style="font-size: 2rem; color: cornflowerblue;"></i>
        <code> &lt;i class="bi bi-alarm" style="font-size: 2rem; color: cornflowerblue;"&gt;&lt;/i&gt;</code>
        <br>
        <i class="bi bi-battery-half" style="font-size: 2rem; color: darkorange;"></i>
        <code> &lt;i class="bi bi-battery-half" style="font-size: 2rem; color: darkorange;"&gt;&lt;/i&gt;</code>
        <br>
        <i class="bi bi-cloud-sun" style="font-size: 2rem; color: gold;"></i>
        <code> &lt;i class="bi bi-cloud-sun" style="font-size: 2rem; color: gold;"&gt;&lt;/i&gt;</code>
        <br>
        <i class="bi bi-emoji-smile" style="font-size: 2rem; color: green;"></i>
        <code> &lt;i class="bi bi-emoji-smile" style="font-size: 2rem; color: green;"&gt;&lt;/i&gt;</code>
      <p>Puedes encontrar la lista completa de iconos en <a href="https://icons.getbootstrap.com/">su web oficial.</a>
      </p>
      </p>
    </div>
    <div class="col-md-6 sass-example">
      <h1>SASS</h1>
      <p>SASS (Syntactically Awesome Stylesheets) es un preprocesador de CSS que permite escribir hojas de estilo de una
        manera más eficiente y organizada.</p>
      <p>Este proyecto ya viene configurado con SASS, por lo que puedes empezar a utilizarlo en tus estilos de
        inmediato.</p>
      <p class="psass">
        SASS es un preprocesador CSS que agrega características como:</p>
      <ul>
        <li>Anidación de estilos</li>
        <li>Variables</li>
        <li>Mixins</li>
        <li>Herencia</li>
      </ul>
    </div>
  </div>
  


</template>

<script setup>
import carrusel from "../components/carrusel.vue";
import SearchBar from "../components/SearchBar.vue";
</script>

<style scoped>
h1 {
  color: #007bff;
}

.sass-example {
  .psass {
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    padding: 10px;
    border: 1px solid #ddd;
    background-color: #f9f9f9;

    ul {
      margin-top: 10px;
      padding-left: 20px;
      list-style-type: square;

      li {
        margin-bottom: 5px;
        color: #555;
        font-weight: bold;

        &:hover {
          color: #007bff;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>

