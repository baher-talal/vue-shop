<template>
  <div class="addToCart">
    <button class="btn btn-primary" @click="addToCart()">{{addCart}}</button>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  props: {
    name: String,
    price: String,
    image: String,
    pId: String,
  },

  data() {
    return {
      item: {
        productName: this.name,
        productImage: this.image,
        productPrice: this.price,
        productId: this.pId,
        productQuanity: 1,
      },

      addCart: "Add To Cart",
    };
  },

  methods: {
    addToCart() {
      $("#miniCart").modal("show");
      this.$store.commit("addToCart", this.item);
    },
  },
};
</script>