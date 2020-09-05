<script>
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'Featured',
  components: {
    ProductCard,
  },
  data() {
    const manyProducts = [];
    for (let i = 0; i < 20; i += 1) {
      manyProducts.push({
        _id: '',
        image: '',
        title: '작품 제목',
        author: {
          name: '작가 이름',
          image: '',
        },
      });
    }
    return {
      products: manyProducts,
    };
  },
};
</script>

<template>
  <div class="home">
    <h1>FOR YOU</h1>
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
