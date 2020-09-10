<template>
  <div>
    <v-app id="inspire">
      <v-container class="d-flex flex-column align-center">
        <v-card class="ma-auto pa-2 card" min-width="50%" max-width="50%">
          <v-img :src="cat.image" max-height="300px" max-width="100%"></v-img>
          <v-row class="flex-nowrap mx-0 my-3">
            <v-card-subtitle class="font-weight-bold pa-0">Кличка:&nbsp;</v-card-subtitle>
            <v-card-text width="auto" class="pa-0 text-left card__text">{{ cat.name }}</v-card-text>
          </v-row>
          <v-row class="flex-nowrap mx-0 my-3">
            <v-card-subtitle class="font-weight-bold pa-0">Порода:&nbsp;</v-card-subtitle>
            <v-card-text width="auto" class="pa-0 text-left card__text">{{
              cat.breed
            }}</v-card-text>
          </v-row>
          <v-row class="flex-nowrap mx-0 my-3">
            <v-card-subtitle class="font-weight-bold pa-0">Окрас:&nbsp;</v-card-subtitle>
            <v-card-text width="auto" class="pa-0 text-left card__text">{{
              cat.color
            }}</v-card-text>
          </v-row>
          <v-row class="flex-nowrap mx-0 my-3">
            <v-card-subtitle class="font-weight-bold pa-0">Пол:&nbsp;</v-card-subtitle>
            <v-card-text width="auto" class="pa-0 text-left card__text">{{
              cat.gender
            }}</v-card-text>
          </v-row>
          <v-row class="flex-nowrap mx-0 my-3">
            <v-card-subtitle class="font-weight-bold pa-0">Возраст:&nbsp;</v-card-subtitle>
            <v-card-text width="auto" class="pa-0 text-left card__text">{{ cat.age }}</v-card-text>
          </v-row>
          <v-row class="d-flex mx-0 my-3">
            <v-card-subtitle class="font-weight-bold pa-0">Комментарий:&nbsp;</v-card-subtitle>
            <v-card-text class="pa-0 text-left card__text">{{ cat.comment }}</v-card-text>
          </v-row>
        </v-card>
        <v-btn :to="{ name: 'Update', params: { id: cat.id } }" x-large color="success" :block="false" width="50%" class="create__btn my-3"
          >Update</v-btn
        >
        <v-btn to="/" x-large color="success" :block="false" width="50%" class="create__btn my-3"
          >Home</v-btn
        >
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cat: {}
    };
  },
  methods: {
    getCat() {
      this.cat = this.$store.getters.GET_ITEM_BY_ID(this.$route.params.id);
    }
  },
  created() {
    this.getCat();
  }
};
</script>
