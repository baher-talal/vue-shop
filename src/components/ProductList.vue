<template>
  <div class="products" id="products">
    <div class="container">
      <h1 class="text-center p-5">Our Products List</h1>
      <div class="row">
        <div class="col-md-4 mb-3" v-for="(product, index) in products" :key="index">
          <div class="card product-item rounded">
            <carousel :perPage="1" :autoplay="true" :loop="true">
              <slide v-for="(image, index) in product.images" :key="index.image">
                <img class="card-img-top w-100" :src="image" alt />
              </slide>
            </carousel>

            <div class="card-body">
              <h5 class="card-title">{{product.name}}</h5>
              <h5 class="card-price font-weight-bold">{{product.price | currency('EGP', 0, { symbolOnLeft: false })}}</h5>
              <!-- <p class="card-text" v-html="product.description"></p> -->
              <AddToCart :name="product.name" :price="product.price" :p-id="product.id" :image="getImage(product.images)" />
              <!-- <a href="#0" class="btn btn-primary">Add To Cart</a> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import AddToCart from "@/components/AddToCart.vue";
export default {
  name: "ProductList",
  props: {
    msg: String,
  },

  components: {
    AddToCart,
  },

  data() {
    return {
      products: [],
    };
  },

  firestore() {
    return {
      products: db.collection("products"),
    };
  },

  methods: {
    getImage(images) {
      return images[0];
      // console.log(images[0]);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.products {
  margin-top: 7rem;
  background: #f2f2f2;
  padding-bottom: 3rem;
}

.card {
  height: 100%;
}
.card-body {
  padding: 0.5rem;
}

.VueCarousel-slide {
  margin: 0 auto;
}

.card-price {
  color: #080;
}

// .card-price::after {
//   content: " LE";
// }

.card-img,
.card-img-top {
  height: 40vh;
}
</style>
