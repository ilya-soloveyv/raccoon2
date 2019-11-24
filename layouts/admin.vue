<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="dark">
      <b-container>
        <b-navbar-brand to="/admin">Raccoon</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/admin/bouquet" active-class="active">
              Букеты
            </b-nav-item>
            <b-nav-item-dropdown
              text="Справочники"
              to="/admin/libraries"
              active-class="active"
              exact
            >
              <b-dropdown-item
                to="/admin/libraries/flower"
                active-class="active"
              >
                Цветы
              </b-dropdown-item>
              <b-dropdown-item
                to="/admin/libraries/color-group"
                active-class="active"
              >
                Цветовые группы
              </b-dropdown-item>
              <b-dropdown-item
                to="/admin/libraries/color"
                active-class="active"
              >
                Цветовая гамма
              </b-dropdown-item>
              <b-dropdown-item to="/admin/libraries/cost" active-class="active">
                Стоимость
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item to="/">К сайту</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <nuxt />
  </div>
</template>

<style scoped>
h1 {
  margin: 1rem 0;
  font-size: 2rem;
}
.breadcrumb-bg {
  background-color: #e9ecef;
}
.breadcrumb-bg .breadcrumb {
  padding: 0.5rem 0;
  margin-bottom: 0;
}
</style>
