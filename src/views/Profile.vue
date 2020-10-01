<script>
import ProfileImage from '@/components/ProfileImage.vue';
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'Profile',
  components: { ProfileImage, ProductCard },
  async created() {
    this.$emit('startLoad');
    const { userId } = this.$store.state.userProfile;
    const profile = (await this.$db
      .collection('user')
      .doc(userId)
      .get())
      .data();
    this.profile = profile;
    await this.getUserProducts();
    await this.getUserTotalLikes();
    this.$emit('finishLoad');
  },
  data() {
    return {
      profile: {},
      coverImageURL: null,
      totalLikes: 0,
      userProducts: [],
    };
  },
  watch: {
    profile: {
      deep: true,
      async handler() {
        const storageURL = `/cover/${this.profile.coverImage}`;
        const imageURL = await this.$storage
          .ref(storageURL)
          .getDownloadURL();
        this.coverImageURL = imageURL;
      },
    },
  },
  computed: {
    computedCoverStyle() {
      const coverImageURL = this.coverImageURL
        ? this.coverImageURL : null;
      return { 'background-image': `url('${coverImageURL}')` };
    },
  },
  methods: {
    async getUserProducts() {
      const { userId } = this.$store.state.userProfile;
      const userProducts = (await this.$db
        .collection('products')
        .where('author', '==', userId)
        .get()
      ).docs.map((v) => ({ ...v.data(), id: v.id }));
      this.userProducts = userProducts;
    },
    async getUserTotalLikes() {
      const userLikes = this.userProducts.reduce(
        (acc, curr) => acc + curr.likers.length,
        0,
      );
      this.totalLikes = userLikes;
    },
  },
};
</script>

<template>
  <div class="profile">
    <div
      class="background"
      :style="computedCoverStyle"
    />
    <profile-image
      v-if="profile.profileImage"
      :image="profile.profileImage"
      class="profile-image"
    />
    <h1>{{ profile.name }}({{ profile.nickname }})</h1>
    <p style="margin-bottom: 0;">{{ profile.introduce }}</p>
    <span>받은 좋아요 총 개수 : <span style="color: blue">{{ totalLikes }}</span>개</span>
    <div class="card-container">
      <product-card
        class="card"
        :key="product.id"
        v-for="product in userProducts"
        :product="product"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.background {
  width: 100vw;
  height: 260px;
  background-size: cover;
  margin-top: -20px;
}

.profile-image {
  width: 100px;
  height: 100px;
  margin-top: 30px;
}

.card-container {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}

.card {
  margin-top: 10px;
  margin-right: 30px;
}

h1 {
  margin-top: 10px;
  margin-bottom: 0;
}
p {
  margin-top: 5px;
}
</style>
