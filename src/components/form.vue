<template>
  <v-app id="inspire">
    <v-card width="50%" class="create__card">
      <v-form ref="form" v-model="valid">
        <v-text-field v-model="cat.name" :rules="nameRules" label="Кличка"></v-text-field>
        <v-text-field v-model="cat.breed" label="Порода"></v-text-field>
        <v-select v-model="cat.color" :items="colorItems" label="Окрас"></v-select>
        <v-radio-group v-model="cat.gender" :mandatory="false" :rules="genderRules">
          <v-radio label="М" value="М"></v-radio>
          <v-radio label="Ж" value="Ж"></v-radio>
        </v-radio-group>
        <v-text-field v-model="cat.age" label="Возраст" number :rules="ageRules"></v-text-field>
        <v-textarea v-model="cat.comment" clearable label="Комментарий" auto-grow></v-textarea>
        <v-file-input
          accept="image/png, image/jpeg, image/bmp"
          id="input_img"
          :loading="isImgLoading"
          @change="uploadImage($event)"
          placeholder="Выберите изображение котика"
          label="Avatar"
        ></v-file-input>
        <v-btn class="ma-4" :loading="loading" :disabled="isImgLoading || loading" color="success" @click="submit">
          Отправить
          <template v-slot:loader>
            <span>Загрузка...</span>
          </template>
        </v-btn>
      </v-form>
    </v-card>
    <v-btn to="/" x-large color="success" :block="false" width="50%" class="create__btn"
      >Home</v-btn
    >
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  props: ["onSubmit", "values", "isLoading"],
  data() {
    return {
      cat: {
        name: null,
        breed: null,
        color: null,
        gender: null,
        age: null,
        comment: null,
        image: null
      },
      valid: true,
      lazy: false,
      nameRules: [
        v => !!v || "Необходимо ввести кличку",
        v => (v && v.length > 2) || "Кличка должна содержать больше двух символов"
      ],
      genderRules: [v => !!v || "Укажите пол"],
      ageRules: [v => Number.isInteger(+v) || "Укажите полное количество лет"],
      colorItems: ["Белый", "Чёрный", "Рыжий", "Персиковый"],
      loading: false,
      isImgLoading: false,
    };
  },
  watch: {
    isLoading(newVal) {
      this.loading = newVal;
    }
  },
  methods: {
    submit(e) {
      e.preventDefault();
      if (this.$refs.form.validate()) {
        this.cat.image = (this.cat.image === null) ? "http://localhost:8080/img/default_cat.jpg" : this.cat.image;
        this.onSubmit({ ...this.cat });
      }
    },
    uploadImage(event) {
      this.isImgLoading = true
      const URL = "https://api.imgbb.com/1/upload";

      let file = document.getElementById("input_img");
      let data = new FormData();
      data.set("key", "b855b99702a665c76811219715d940a1");
      data.append("image", file.files[0]);

      axios({
        method: "post",
        url: URL,
        data: data
      }).then(response => (this.cat.image = response.data.data.image.url)).then(()=> this.isImgLoading = false);
    }
  },
  created() {
    if (this.values) this.cat = this.$store.getters.GET_ITEM_BY_ID(this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
.create {
  &__card {
    margin: 30px auto;
    padding: 30px;
  }
  &__btn {
    margin: 30px auto;
  }
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
