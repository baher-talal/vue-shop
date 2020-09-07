<template>
  <div class="checkout">
    <Navbar />
    <div class="container mt-5 pt-5">
      <div class="row">
        <div class="col-md-9">
          <h4 class="text-left py-4">checkout page</h4>

          <ul class="p-0">
            <li v-for="(item, index) in this.$store.state.cart" v-bind:key="index.item" class="media">
              <img :src="item.productImage" class="align-self-center w-25" />
              <div class="media-body text-left">
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

        <div class="col-md-3 text-right">Total Price</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar.vue";
  export default {
    components: {
      Navbar,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>