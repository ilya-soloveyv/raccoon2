<template>
  <div>
    <b-container fluid class="breadcrumb-bg">
      <b-container>
        <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
      </b-container>
    </b-container>
    <b-container>
      <h1>Карточка цветка</h1>
      <b-form @submit.prevent="update">
        <b-form-group>
          <b-input v-model="flower.title" autocomplete="off"></b-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Обновить</b-button>
      </b-form>
      <pre>{{ flower }}</pre>
      <pre>{{ $store.state.flower.flower }}</pre>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'admin',
  middleware: 'admin',
  data() {
    return {
      breadcrumb: [
        {
          text: 'Рабочий стол',
          to: '/admin/'
        },
        {
          text: 'Цветы',
          to: '/admin/libraries/flower'
        },
        {
          text: 'Цветок',
          active: true
        }
      ]
    }
  },
  computed: {
    ...mapState({
      flower: (state) => Object.assign({}, state.flower.flower)
    })
  },
  async fetch({ store, params }) {
    await store.dispatch('flower/getFlower', params)
  },
  methods: {
    update() {
      this.$store.dispatch('flower/update', this.flower)
    }
  }
}
</script>
