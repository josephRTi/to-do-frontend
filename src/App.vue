<template>
  <the-navbar></the-navbar>
  <router-view/>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";


export default {
  name: 'App',
  components: {
    TheNavbar
  }
}
</script>

<style>
body {
  margin: 0;
}
</style>
