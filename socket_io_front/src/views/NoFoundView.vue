<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
<template>
  <div class="container">
    <h1>a oh,can not get path: {{ route.query.path }} .
    </h1>
    <br />
    <h2>It appears that there is a problem with your request path or that you
      do not have permission to access it.</h2>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .container {
    min-height: 100vh;
  }
}
</style>
