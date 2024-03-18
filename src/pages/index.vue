<template>
  <v-card class="w-75 ma-auto elevation-4">
    <template #title>
      <span class="text-center font-weight-bold"> Login </span>
    </template>

    <template #item>
      <v-form ref="form" @submit.prevent v-model="formData.isValid">
        <v-container>
          <v-row
            dense
            class="d-flex justify-space-around align-center flex-column"
          >
            <v-col>
              <v-text-field required :loading="formLoading" label="Usuário" />
            </v-col>

            <v-col>
              <v-text-field
                :type="formPassVisible ? 'text' : 'password'"
                :loading="formLoading"
                @click:append-inner="toggleFormPassVisible()"
                required
                label="Senha"
              >
                <template #append-inner>
                  <div @click="toggleFormPassVisible()">
                    <v-icon class="cursor-pointer">
                      {{ formPassVisible ? "mdi-eye-off" : "mdi-eye" }}
                    </v-icon>
                  </div>
                </template>
              </v-text-field>
            </v-col>

            <v-col class="d-flex">
              <v-btn
                @click.prevent="onSubmit"
                :loading="formLoading"
                :disabled="formLoading || !formData.isValid"
                class="bg-blue-lighten-1 px-8 ma-auto cursor-pointer"
                type="submit"
              >
                Login
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </template>
  </v-card>
</template>

<route lang="yaml">
meta:
  layout: login
</route>

<script setup lang="ts">
const formData = reactive({
  isValid: true,
  rules: [],
});

const form = ref();

const [formPassVisible, toggleFormPassVisible] = useToggle();

const [formLoading, toggleFormLoading] = useToggle();

const onSubmit = () => {
  toggleFormLoading()
  setTimeout(toggleFormLoading, 2000)
  console.log("opa!");
};
</script>
