<script>
import ProductCard from '@/components/ProductCard.vue';
import Loader from 'vue-loading-overlay';

export default {
  name: 'Gallery',
  components: {
    ProductCard,
    Loader,
  },
  async created() {
    this.pending = true;
    const products = (await this.$db
      .collection('products')
      .get())
      .docs
      .map((doc) => doc.data());
    this.products = products;
    this.pending = false;
  },
  data() {
    return {
      products: [],
      pending: false,
    };
  },
};
</script>

<template>
  <div class="home">
    <h1>신규 작품</h1>
    <div class="card-container">
      <loader :active.sync="pending" />
        <product-card
          class="card"
          :key="product._id"
          v-for="product in products"
          :product="product"
        />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  margin-top: 10px;
  margin-right: 30px;
}

.card-container {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
</style>
