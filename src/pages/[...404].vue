<template>
  <v-row class="h-100">
    <v-col class="d-flex">
      <v-card class="ma-auto">
        <template #title>
          <h3 class="text__wrap">
            Página não encontrada
          </h3>
        </template>

        <template #text>
          Talvez a página que você esteja buscando não existe ou foi modificada.
        </template>
        
        <template #actions>
          <v-spacer class="d-flex">
            <v-btn class="bg-blue-lighten-1 ma-auto" @click="route.replace('/')">
              Voltar
            </v-btn>
          </v-spacer>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>

<script setup lang="ts">
const route = useRouter();
</script>

<style scoped lang="scss">
.text__wrap {
  white-space: wrap;
  text-align: center;
}

</style>