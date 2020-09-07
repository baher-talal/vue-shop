<template>
  <div class="hello">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link to="/" class="nav-brand">Vue Shop</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/ProductList" class="nav-link">Products</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/About" class="nav-link">About</router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <a class="btn btn-outline-success my-2 mx-2" data-toggle="modal" data-target="#login">Login</a>
          <a class="btn btn-outline-info my-2 mx-2" data-toggle="modal" data-target="#miniCart"><i class="fas fa-cart-plus"></i></a>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  padding: 0.5rem 10rem;
}
</style>
