<template>
  <div class="products">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center">
          <div class="col-md-6">
            <h3>Orders Page</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, labore!</p>
          </div>

          <div class="col-md-6">
            <img src="/img/svg/orders.svg" alt="Overview" class="img-fluid" />
          </div>
        </div>
      </div>

      <hr />

      <div class="product-test">
        <h3 class="float-left">Orders List</h3>
        <button @click="addNew()" class="btn btn-primary float-right">Add Orders</button>

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
              <tr v-for="order in orders" v-bind:key="order.name">
                <td>{{order.name}}</td>

                <td>{{order.price}}</td>

                <td>
                  <button @click="editProduct(order)" class="btn btn-primary">Edit</button>
                  <button @click="deleteProduct(order)" class="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="product"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" style="max-width: 75%" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Edit Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="row">
              <div class="col-md-8">
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Product Name"
                    v-model="order.name"
                    class="form-control"
                  />
                </div>

                <div class="form-group">
                  <vue-editor v-model="order.description" col="30" class></vue-editor>
                </div>
              </div>

              <div class="col-md-4">
                <h4 class="display-6 text-left">Product Details</h4>
                <hr />

                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Product Price"
                    v-model="order.price"
                    class="form-control"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    @keyup.188="addTag"
                    placeholder="Product Tag"
                    v-model="tag"
                    class="form-control"
                  />

                  <div class="d-flex">
                    <p
                      v-for="tag in order.tags"
                      v-bind:key="tag"
                      class="d-inline mr-1 mt-3 mb-0 p-1 rounded"
                      style="background: #6c757d;color: #FFF"
                    >
                      <span>{{tag}}</span>
                    </p>
                  </div>
                </div>

                <hr />

                <div class="form-group">
                  <label for="product_image" class="float-left">Product Image</label>
                  <input type="file" @change="uploadImage" class="form-control" />
                </div>

                <div class="form-group d-flex">
                  <div v-for="(image, index) in order.images" v-bind:key="index">
                    <div class="img-wrapp">
                      <img :src="image" width="80">
                      <span class="delete-img" @click="deleteImage(image, index)">X</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="addProduct()" class="btn btn-primary" v-if="modal == 'new'">Add</button>
            <button @click="updateProduct()" class="btn btn-primary" v-if="modal == 'edit'">Edit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, fb } from "../firebase";
import { VueEditor } from "vue2-editor";
import Swal from "sweetalert2";
import Toast from "sweetalert2";
import $ from "jquery";
import "snapshot";
// import { firestore } from 'firebase';

export default {
  components: {
    VueEditor,
  },

  data() {
    return {
      orders: [],

      order: {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: [],
      },

      activeItem: null,
      modal: null,
      tag: null,
      image: null,
    };
  },

  firestore() {
    return {
      orders: db.collection("orders"),
    };
  },

  methods: {
    reset() {
      this.product = {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: [],
      }
    },

    addNew() {
      this.modal = "new";
      this.reset();
      $("#product").modal("show");
    },

    addProduct() {
      this.$firestore.orders.add(this.order);

      Toast.fire({
        type: "Success",
        title: "order Added Successfully",
      });

      $("#product").modal("hide");
    },

    deleteProduct(doc) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          this.$firestore.orders.doc(doc.id).delete();
          Toast.fire({
            type: "Success",
            title: "Deleted Successfully",
          });
          // Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    },

    editProduct(order) {
      this.modal = "edit";
      this.order = order;
      $("#product").modal("show");
    },

    updateProduct() {
      this.$firestore.orders.doc(this.order.id).update(this.order);
      Toast.fire({
        type: "Success",
        title: "Updated Successfully",
      });

      $("#product").modal("hide");
    },

    addTag() {
      // console.log('pressing comma');
      this.order.tags.push(this.tag);
      this.tag = "";
    },

    uploadImage(e) {
      if (e.target.files[0]) {
        // console.log(e.target.files[0]);
        let file = e.target.files[0];
        var storageRef = fb.storage().ref("orders/" + file.name);
        let uploadTask = storageRef.put(file);

        uploadTask.on(
          "state_changed",
          () => {},
          (error) => {
            console.log(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.order.images.push(downloadURL);
              console.log("File Available at ", downloadURL);
            });
          }
        );
      }
    },

    deleteImage(img, index) {
      let image = fb.storage().refFromURL(img);
      this.order.images.splice(index, 1);
      image.delete().then(()=> {
        console.log('Image Deleted');
      })
      .catch((error)=> {
        console.log('an error occurred', error);
      })
    }
  },
};
</script>

<Navbar/>

<style>
  .img-wrapp {
    position: relative;
  }

  .img-wrapp span.delete-img {
    position: absolute;
    top: -2px;
    left: 1px;
    font-weight: bold;
    font-size: 1.25rem;
    color: red;
  }

  .img-wrapp span.delete-img:hover {
    cursor: pointer;
  }
</style>

