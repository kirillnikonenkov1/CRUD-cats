<template>
  <v-app id="inspire">
    <div>
      <v-btn to="/create" class="my-4" x-large color="success">добавить котика</v-btn>
    </div>
    <v-container>
      <v-text-field v-model="filters.breed" label="Порода"></v-text-field>
      <v-select v-model="filters.color" :items="colorItems" label="Цвет"></v-select>
      <v-radio-group v-model="filters.gender" :mandatory="false">
        <v-radio label="М" value="М"></v-radio>
        <v-radio label="Ж" value="Ж"></v-radio>
      </v-radio-group>
      <v-btn color="green darken-1" text @click="getFiltredItems">
        Фильтровать
      </v-btn>
      <v-btn color="green darken-1" text @click="resetFilter">
        Сбросить фильтр
      </v-btn>
    </v-container>
    <v-container class="d-flex flex-wrap justify-sm-center justify-md-start main-container">
      <v-card
        v-for="item in currentCats"
        :key="item.id"
        :to="{ name: 'Cat', params: { id: item.id } }"
        class="ma-3 pa-2 card mx-xs-auto"
        min-width="265px"
      >
        <v-img :src="item.image" max-height="140px" width="100%" :contain="true"></v-img>
        <v-row class="flex-nowrap mx-0 my-3">
          <v-card-subtitle class="font-weight-bold pa-0">Кличка:&nbsp;</v-card-subtitle>
          <v-card-text width="auto" class="pa-0 text-left card__text">{{ item.name }}</v-card-text>
        </v-row>
        <v-row class="flex-nowrap mx-0 my-3">
          <v-card-subtitle class="font-weight-bold pa-0">Порода:&nbsp;</v-card-subtitle>
          <v-card-text width="auto" class="pa-0 text-left card__text">{{ item.breed }}</v-card-text>
        </v-row>
        <v-row class="flex-nowrap mx-0 my-3">
          <v-card-subtitle class="font-weight-bold pa-0">Окрас:&nbsp;</v-card-subtitle>
          <v-card-text width="auto" class="pa-0 text-left card__text">{{ item.color }}</v-card-text>
        </v-row>
        <v-row class="flex-nowrap mx-0 my-3">
          <v-card-subtitle class="font-weight-bold pa-0">Пол:&nbsp;</v-card-subtitle>
          <v-card-text width="auto" class="pa-0 text-left card__text">{{
            item.gender
          }}</v-card-text>
        </v-row>
        <v-row class="flex-nowrap mx-0 my-3">
          <v-card-subtitle class="font-weight-bold pa-0">Возраст:&nbsp;</v-card-subtitle>
          <v-card-text width="auto" class="pa-0 text-left card__text">{{ item.age }}</v-card-text>
        </v-row>
        <v-row class="d-flex mx-0 my-3">
          <v-card-subtitle class="font-weight-bold pa-0">Комментарий:&nbsp;</v-card-subtitle>
          <v-card-text class="pa-0 text-left card__text">{{ item.comment }}</v-card-text>
        </v-row>
        <v-card-actions>
          <v-btn text color="deep-purple accent-4" @click.prevent="showDeletePopup(item.id)"
            >Удалить</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-dialog v-model="deletePopupOpen" max-width="500">
        <v-card>
          <v-card-title class="headline">Вы точно хотите удалить котика?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="onDeleteCat">
              Подтвердить
            </v-btn>
            <v-btn color="red darken-1" text @click="closePopup">
              Отмена
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
    <v-pagination
      v-model="currentPage"
      :to="{ name: 'Home', params: { currentPage: currentPage } }"
      :length="maxPages"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      cats: [],
      deleteItemId: "",
      deletePopupOpen: false,
      filters: {
        breed: "",
        color: "",
        gender: ""
      },
      filtred: false,
      colorItems: ["Белый", "Чёрный", "Рыжий", "Персиковый"],
      currentPage: null,
      offset: 10
    };
  },
  computed: {
    currentCats() {
      this.cats.forEach(item => {
        item.show = false;
      });
      return this.cats.slice((this.currentPage - 1) * this.offset, this.currentPage * this.offset);
    },
    maxPages() {
      return Math.ceil(this.cats.length / this.offset);
    }
  },
  watch: {
    currentPage() {
      this.$router.push(`/page=${this.currentPage}`).catch(err=>{});
    },
  },
  methods: {
    getAllCats() {
      this.cats = this.$store.getters.GET_ITEM;
    },
    deleteCat() {
      this.$store.dispatch("DELETE_ITEM", this.deleteItemId);
    },
    showDeletePopup(id) {
      this.deleteItemId = id;
      this.deletePopupOpen = true;
    },
    closePopup() {
      this.deleteItemId = "";
      this.deletePopupOpen = false;
    },
    onDeleteCat() {
      this.deleteCat();
      this.closePopup();
      this.getAllCats();
    },
    getFiltredItems() {
      this.currentPage = 1;
      this.cats = this.$store.getters.GET_FILTRED_ITEMS(this.filters);
      this.filtred = true;
    },
    resetFilter() {
      this.filters.breed = "";
      this.filters.color = "";
      this.filters.gender = "";
      if (this.filtred) {
        this.getAllCats();
        this.filtred = false;
      }
    },
    showComment(index) {
      this.currentCats[index].show = !this.currentCats[index].show
    }
  },
  created() {
    this.getAllCats();
    this.currentPage = +this.$route.params.currentPage || 1
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  @media (max-width: 600px) {
    justify-content: center;
  }
}
.card {
  flex: 0 0;
  &__text {
    word-break: break-all;
  }
}
</style>
