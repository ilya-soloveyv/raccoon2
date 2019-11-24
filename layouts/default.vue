<template>
  <b-container>
    <ul>
      <li>
        <nuxt-link to="/">Raccoon</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/catalog">Каталог</nuxt-link>
      </li>
      <li v-if="$auth.$state.loggedIn">
        <nuxt-link to="/my">My page</nuxt-link>
      </li>
      <li v-if="$auth.$state.loggedIn && $auth.$state.user.isAdmin">
        <nuxt-link to="/admin">Admin</nuxt-link>
      </li>
      <li v-if="$auth.$state.loggedIn">
        {{ $auth.$state.user.name }}
        <a href="#" @click.prevent="$auth.logout()">Logout</a>
      </li>
      <li v-else>
        <nuxt-link to="/login">Login</nuxt-link>
      </li>
    </ul>
    <nuxt />
    <pre>
      {{ $auth.$state }}
    </pre>
  </b-container>
</template>
