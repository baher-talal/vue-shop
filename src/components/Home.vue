<template>
  <div class="hello">
    <Navbar />
    <Hero />
    <ProductList />

    <div class="container h-100">
      <div class="row p-5 h-100 justify-content-center align-items-center">
        <div class="col-md-6">
          <img src="/img/svg/product.svg" alt width="400" />
        </div>
        <div class="col-md-6">
          <h3>Learn More About us</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quaerat voluptate iusto? Nihil voluptas vitae veritatis magnam reprehenderit, reiciendis ex? Libero quasi natus veniam voluptatum, voluptas exercitationem ratione consectetur et!</p>
          <button class="btn custom-btn btn-outline-primary mr-4">Browse Products</button>
        </div>
      </div>
    </div>
    <Login />

    <!-- Modal -->
    <div
      class="modal fade"
      id="miniCart"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Shopping Cart</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-left">
            <ul class="p-0">
              <li
                v-for="(item, index) in this.$store.state.cart"
                v-bind:key="index.item"
                class="media"
              >
                <img :src="item.productImage" class="align-self-center w-25" />
                <div class="media-body">
                  <h5 class="mt-0 mb-0">
                    {{item.productName}}
                    <span class="float-right text-danger" style="cursor: pointer;" @click="$store.commit('removeFromCart', item)">X</span>
                  </h5>
                  <p class="mt-0 mb-0">{{item.productPrice | currency('EGP', 0, { symbolOnLeft: false })}}</p>
                  <p class="mt-0 mb-0">Quanity: {{item.productQuanity}}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Continue Shopping</button>
            <button type="button" class="btn btn-primary" @click="checkout()">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Hero from "@/components/Hero.vue";
import ProductList from "@/components/ProductList.vue";
import Login from "@/components/Login.vue";
import $ from 'jquery'
export default {
  components: {
    Navbar,
    Hero,
    ProductList,
    Login,
  },

  methods: {
    checkout() {
      $("#miniCart").modal("hide");
      this.$router.push('/checkout');
    },

    removeItem() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.media-body h5 {
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 42%; */

      display: flex;
    align-items: center;
    justify-content: center;
}
</style>
<Navbar/>