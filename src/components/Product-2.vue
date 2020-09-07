<template>
  <div class="products">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center">
          <div class="col-md-6">
            <h3>Products Page</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, labore!</p>
          </div>

          <div class="col-md-6">
            <img src="/img/svg/products.svg" alt="Overview" class="img-fluid" />
          </div>
        </div>
      </div>

      <hr />

      <h3>Basic CRUD (Create/Read/Update/Delete) In Firebase & Vue</h3>

      <div class="product-test">
        <div class="form-group">
          <input type="text" placeholder="Product Name" v-model="product.name" class="form-control" />
        </div>

        <div class="form-group">
          <input type="text" placeholder="Price" v-model="product.price" class="form-control" />
        </div>

        <div class="form-group">
          <button @click="saveData" class="btn btn-primary">Save Data</button>
        </div>

        <hr />

        <h3>Product List</h3>

        <div class="table-responsive">
          <table class="table table-hover table-border">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Modify</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="product in products" v-bind:key="product.name">
                <td>{{product.data().name}}</td>

                <td>{{product.data().price}}</td>

                <td>
                  <a
                    @click="editProduct(product)"
                    class="btn btn-primary text-white"
                    data-toggle="modal"
                    data-target="#edit"
                  >Edit</a>

                  <button @click="deleteProduct(product.id)" class="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="edit"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Edit Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="form-group">
              <input
                type="text"
                placeholder="Product Name"
                v-model="product.name"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <input type="text" placeholder="Price" v-model="product.price" class="form-control" />
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="updateProduct()" class="btn btn-primary">Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import $ from "jquery";

export default {
  data() {
    return {
      products: [],

      product: {
        name: null,
        price: null,
      },

      activeItem: null,
    };
  },

  methods: {
    readData() {
      db.collection("products")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for  query doc querySnapshot
            // console.log(doc.id, " => ", doc.data());
            if ($.inArray(doc, this.products) === -1) this.products.push(doc);
          });
        });
    },

    saveData() {
      db.collection("products")
        .add(this.product)
        .then((docRef) => {
          console.log("Document Written With ID: ", docRef.id);
          // this.readData();
          //  this.$router.replace("product");
          // window.location.href = "http://localhost:8080/admin/product";
        })
        .catch(function (error) {
          console.error("Error Adding Document: ", error);
        });
    },

    resetData() {
      // Object.assign(this.$data, this.$options.data.apply(this));
    },

    deleteProduct(doc) {
      if (confirm("Are You Sure?")) {
        db.collection("products")
          .doc(doc)
          .delete()
          .then(function () {
            console.log("Document Successfully Deleted!");
          })
          .catch(function (error) {
            console.error("Error Removing Document: ", error);
          });
      }
    },

    editProduct(product) {
      $("#edit").modal("show");
      this.product = product.data();
      this.activeItem = product.id;
    },

    updateProduct() {
      db.collection("products")
        .doc(this.activeItem)
        .update(this.product)
        .then(() => {
          $("#edit").modal("hide");
          this.watcher();
          console.log("Document Successfully Updated!");
        })
        .catch(function (error) {
          console.error("Error Updating Document: ", error);
        });
    },

    watcher() {
      db.collection("products").onSnapshot((querySnapshot) => {
        this.products = [];
          querySnapshot.forEach((doc) => {
            this.products.push(doc);
          });
        });
    },
  },

  created() {
    this.readData();
  },
};
</script>

<Navbar/>