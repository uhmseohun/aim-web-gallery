<script>
export default {
  name: 'Product',
  data() {
    return {
      product: {
        title: null,
        content: [],
      },
    };
  },
  async created() {
    this.$emit('startLoad');
    const { productId } = this.$route.params;
    const product = (await this.$db
      .collection('products')
      .doc(productId)
      .get())
      .data();
    this.product = product;
    this.product.content = this.product.content.map((v) => {
      if (v.type !== 'text') return v;
      return {
        type: v.type,
        value: v.value.split('\n'),
      };
    });
    this.$emit('finishLoad');
  },
};
</script>

<template>
  <div class="container">
    <h2 class="input-title">
      {{ product.title }}
    </h2>
    <div class="content">
      <div
        :key="index"
        v-for="(block, index) in product.content"
        class="block"
      >
        <div
          v-if="block.type === 'text'"
          class="block-text"
        >
          <div
            :key="index"
            v-for="(content, index) in block.value"
          >
            <span>{{ content }}</span>
            <br>
          </div>
        </div>

        <div
          v-if="block.type === 'photo'"
          v-show="block.value !== null"
          class="block-image"
        >
          <img :src="block.value">
        </div>
        <div
          v-if="block.type === 'video'"
          v-show="block.value !== null"
          class="block-video"
        >
          <video :src="block.value" controls />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding-top: 35px;
  padding-left: 200px;
  padding-right: 200px;
  display: flex;
  flex-direction: column;
}

.input {
  &-title {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
}

.add-button-wrapper {
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  margin: 0 9px;
  background-color: #344EAE;
  cursor: pointer;
}

.block {
  margin: 20px 0;

  &-text {
    width: 100%;
    text-align: center;
    outline: none;
    font-size: 1.3rem;
    resize: none;
  }

  &-image, &-video {
    display: flex;
    align-items: center;
    justify-content: center;

    img, video {
      width: 100%;
    }

    video {
      outline: none;
    }
  }
}

.footer-menu {
  display: flex;
  width: 100%;
}

.category-label {
  border: 0;
  border-radius: 30px;
  color: white;
  background-color: #344EAE;
  padding: 0.5rem 1rem;
  outline: none;
  font-size: 1rem;
}

.upload {
  margin-left: auto;
}
</style>
