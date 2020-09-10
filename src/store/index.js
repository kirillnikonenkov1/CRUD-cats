import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cats: [
      {
        age: "12",
        breed: "Британская",
        color: "Белый",
        comment: "qw",
        gender: "М",
        id: "cv7nqxg23",
        image: "http://localhost:8080/assets/default_cat.jpg",
        name: "Дуся"
      },
      {
        age: "13",
        breed: "Перс",
        color: "Чёрный",
        comment: "qw",
        gender: "М",
        id: "cv7nq1gk3",
        image: "http://localhost:8080/assets/default_cat.jpg",
        name: "Барсик"
      },
      {
        age: "14",
        breed: "Шотландец",
        color: "Рыжий",
        comment: "qw",
        gender: "М",
        id: "cv7nq24k3",
        image: "http://localhost:8080/assets/default_cat.jpg",
        name: "Степа"
      },
      {
        age: "15",
        breed: "Абсинская",
        color: "Персиковый",
        comment: "qw",
        gender: "Ж",
        id: "cv4nqxgk3",
        image: "http://localhost:8080/assets/default_cat.jpg",
        name: "Даша"
      },
      {
        age: "16",
        breed: "котик",
        color: "Белый",
        comment: "qw",
        gender: "Ж",
        id: "cv4n12gk3",
        image: "http://localhost:8080/assets/default_cat.jpg",
        name: "Карина"
      },
      {
        age: "17",
        breed: "Шмель",
        color: "Чёрный",
        comment: "qwww",
        gender: "Ж",
        id: "cv4112gk3",
        image: "http://localhost:8080/assets/default_cat.jpg",
        name: "Дудя"
      }, 
      {
        age: "12",
        breed: "Британская",
        color: "Белый",
        comment: "qw",
        gender: "М",
        id: "cv7nqag23",
        image: "http://localhost:8080/assets/default_cat.jpg",
        name: "Дуся"
      },
      {
        age: "12",
        breed: "Британская",
        color: "Белый",
        comment: "qw",
        gender: "М",
        id: "cv7nqzg23",
        image: "http://localhost:8080/assets/default_cat.jpg",
        name: "Дуся"
      },
      {
        age: "12",
        breed: "Британская",
        color: "Белый",
        comment: "qw",
        gender: "М",
        id: "cv7nqxa23",
        image: "http://localhost:8080/assets/default_cat.jpg",
        name: "Дуся"
      },
      {
        age: "12",
        breed: "Британская",
        color: "Белый",
        comment: "qw",
        gender: "М",
        id: "cv7nqaf23",
        image: "http://localhost:8080/assets/default_cat.jpg",
        name: "Дуся"
      },
      {
        age: "12",
        breed: "Британская",
        color: "Белый",
        comment: "qw",
        gender: "М",
        id: "cv7neee23",
        image: "http://localhost:8080/assets/default_cat.jpg",
        name: "Дуся"
      },
      {
        age: "12",
        breed: "Британская",
        color: "Белый",
        comment: "qw",
        gender: "М",
        id: "cvrrrxg23",
        image: "http://localhost:8080/assets/default_cat.jpg",
        name: "Дуся"
      },
      {
        age: "12",
        breed: "Британская",
        color: "Белый",
        comment: "qw",
        gender: "М",
        id: "cv7nsf23",
        image: "http://localhost:8080/assets/default_cat.jpg",
        name: "Дуся"
      },
      {
        age: "12",
        breed: "Британская",
        color: "Белый",
        comment: "qw",
        gender: "М",
        id: "cv7nasg23",
        image: "http://localhost:8080/assets/default_cat.jpg",
        name: "Дуся"
      },
      {
        age: "12",
        breed: "Британская",
        color: "Белый",
        comment: "qw",
        gender: "М",
        id: "cv7nhhg23",
        image: "http://localhost:8080/assets/default_cat.jpg",
        name: "Дуся"
      },
      {
        age: "12",
        breed: "Британская",
        color: "Белый",
        comment: "qw",
        gender: "М",
        id: "cv7nttg23",
        image: "http://localhost:8080/assets/default_cat.jpg",
        name: "Дуся"
      },
    ]
  },
  getters: {
    GET_ITEM: state => {
      return state.cats;
    },
    GET_ITEM_BY_ID: state => id => {
      return state.cats.find(item => item.id === id)
    },
    GET_FILTRED_ITEMS: state => filters => {
      const filtersKeys = Object.keys(filters)
      let filtred = state.cats.filter((item) => {
        let counter = 0
        for (const key of filtersKeys) {
          const catProperty = item[key].toString().toLowerCase()
          const filterProperty = filters[key].toString().toLowerCase()
          if (catProperty.includes(filterProperty)) counter++
        }
        if (counter === filtersKeys.length) return true
      });
      return filtred
    }
  },
  mutations: {
    CREATE_ITEM: (state, payload) => state.cats.push(payload),
    DELETE_ITEM: (state, payload) => {
      const deleteIndex = state.cats.findIndex(item => item.id === payload)
      state.cats.splice(deleteIndex, 1)
    },
    UPDATE_ITEM: (state, payload) => {
      state.cats.map((item, index) => {
        if (item.id === payload.id) {
          state.cats[index] = payload
        }
      })
    }
  },
  actions: {
    CREATE_ITEM: (context, payload) => {
      payload.id = Math.random()
        .toString(36)
        .substr(2, 9);
      context.commit("CREATE_ITEM", payload);
    },
    DELETE_ITEM: (context, payload) => {
      context.commit("DELETE_ITEM", payload);
    },
    UPDATE_ITEM: (context, payload) => {
      context.commit("UPDATE_ITEM", payload);
    }
  },
  modules: {}
});
