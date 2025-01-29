<template>

    <!-- CARRUSEL -->
      <carrusel/>

    <!-- buscador -->
      <lista_Radio/>


</template>

<script setup>
import lista_Radio from "@/components/lista_Radio.vue";
import carrusel from "../components/carrusel.vue";
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

