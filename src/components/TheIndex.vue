<template>
  <task-list v-if="this.$store.state.Token !== ''"></task-list>
  <the-login v-else></the-login>
</template>

<script>
import TaskList from "@/components/TaskList";
import TheLogin from "@/components/TheLogin";

export default {
  name: "TheIndex",
  components : {
    TheLogin,
       TaskList
  }
}
</script>

<style scoped>

</style>
