<template>
  {{ persist.data }}
</template>

<route lang="yml">
meta:
  layout: login
</route>

<script setup lang="ts">

const persist = reactive(usePersist());

onMounted(() => {
  persist.define('test', Math.random().toString(32).slice(2))
})

</script>
