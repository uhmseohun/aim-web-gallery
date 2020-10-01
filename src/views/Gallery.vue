<script>
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'Gallery',
  components: { ProductCard },
  async created() {
    this.$emit('startLoad');
    const products = (await this.$db
      .collection('products')
      .get())
      .docs
      .map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    this.products = products;
    this.$emit('finishLoad');
  },
  data() {
    return {
      products: [],
    };
  },
};
</script>

<template>
  <div class="home">
    <h1>신규 작품</h1>
    <div class="card-container">
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
