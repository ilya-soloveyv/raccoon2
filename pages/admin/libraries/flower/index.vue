<template>
  <div>
    <b-container fluid class="breadcrumb-bg">
      <b-container>
        <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
      </b-container>
    </b-container>
    <b-container>
      <h1>Цветы</h1>
      <b-list-group>
        <b-list-group-item
          v-for="flower in flowers"
          :key="flower._id"
          :to="'/admin/libraries/flower/' + flower._id"
        >
          {{ flower.title }}
          <b-button size="sm" class="float-right" @click.prevent="del(flower)">
            Delete
          </b-button>
        </b-list-group-item>
      </b-list-group>
    </b-container>
  </div>
</template>

<script>
// import consola from 'consola'
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
          active: true
        }
      ]
    }
  },
  computed: {
    ...mapState({
      flowers: (state) => state.flower.flowers
    })
  },
  async fetch({ store, params }) {
    await store.dispatch('flower/getFlowers')
  },
  methods: {
    async del(flower) {
      await this.$store.dispatch('flower/delete', flower)
    }
  }
}
</script>

<style scoped>
.list-group-item {
  padding: 0.5rem 1rem;
}
</style>
