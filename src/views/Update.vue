<template>
  <div>
    <cat-form :onSubmit="onSubmit" :values="this.$route.params.id" :isLoading="isLoading"> </cat-form>
  </div>
</template>

<script>
import catForm from "../components/form.vue";
export default {
  components: {
    catForm
  },
  data() {
    return {
      cat: {},
      isLoading: false,
    };
  },
  methods: {
    getCat() {
      this.cat = this.$store.getters.GET_ITEM_BY_ID(this.$route.params.id);
    },
    async onSubmit(data) {
      this.isLoading = true
      await setTimeout(() => {
        this.$store.dispatch("UPDATE_ITEM", data).then(async () => {
          this.isLoading = false;
          await setTimeout(() => {
            this.$router.push("/");
          }, 1000)
        });
      }, 3000);
    }
  },
  created() {
    this.getCat();
  }
};
</script>
