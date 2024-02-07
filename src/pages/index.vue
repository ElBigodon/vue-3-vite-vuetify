<template>
  <v-row>
    <v-col>
      Temp: {{ cacheData.id }}
    </v-col>

    <v-col>
      Persist: {{ persistData.id }}
    </v-col>

  </v-row>
</template>

<route lang="yml">
meta:
  layout: login
</route>

<script setup>

const {data: cacheData, attach} = useCache();

const {data: persistData, define} = usePersist();

onMounted(() => {
  
  const randomId = Math.ceil(Math.random() * 1000)

  attach('id', randomId);
  
  console.log(persistData.value)
  
    define('id', randomId);
  if (!persistData.value['id']) {
  }

});

</script>
