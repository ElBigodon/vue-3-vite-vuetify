<template>
  <v-container class="bg-red h-100 d-flex flex-row justify-space-around">
    <v-row >
      <v-col>
        <main>
          <RouterView />
        </main>
      </v-col>
  
      <v-col>
        <v-card class="cursor-wait">
          <v-card-title> Login </v-card-title>
  
          <v-card-actions> Opa! </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
