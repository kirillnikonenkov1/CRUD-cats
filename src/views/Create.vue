<template>
  <div>
    <cat-form :onSubmit="onSubmit" :isLoading="isLoading"> </cat-form>
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
      isLoading: false
    };
  },
  methods: {
    async onSubmit(data) {
      this.isLoading = true
      await setTimeout(() => {
        this.$store.dispatch("CREATE_ITEM", data).then(async () => {
          this.isLoading = false;
          await setTimeout(() => {
            this.$router.push("/");
          }, 1000)
        });
      }, 3000);
    }
  }
};
</script>
