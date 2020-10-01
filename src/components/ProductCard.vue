<script>
import Like from '@/assets/like.png';
import Liked from '@/assets/liked.png';
import Menu from '@/assets/menu.png';
import ProfileImage from '@/components/ProfileImage.vue';

export default {
  name: 'ProductCard',
  components: { ProfileImage },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  async created() {
    const storageURL = this.product.image;
    const imageURL = await this.$storage
      .refFromURL(storageURL)
      .getDownloadURL();
    this.product.image = imageURL;
    const author = (await this.$db
      .collection('user')
      .doc(this.product.author)
      .get())
      .data();
    this.product.author = author;
  },
  methods: {
    imageStyle(imageURL) {
      return {
        'background-image': `url('${imageURL}')`,
      };
    },
    async toggleProductLike() {
      this.$emit('startLoad');
      const { userLikes } = this.$store.state;
      const { id: productId } = this.product;
      const userLiked = this.liked;
      const { userId } = this.$store.state.userProfile;
      const product = (await this.$db
        .collection('products')
        .doc(productId)
        .get())
        .data();
      if (!userLiked) {
        userLikes.push(productId);
        product.likers.push(userId);
      } else {
        const index1 = userLikes.indexOf(productId);
        userLikes.splice(index1, 1);
        const index2 = product.likers.indexOf(userId);
        product.likers.splice(index2, 1);
      }
      this.$store.commit('setUserLikes', userLikes);
      await this.$db
        .collection('products')
        .doc(productId)
        .set(product);
      this.$emit('finishLoad');
    },
    pushToProfile(author) {
      this.$router.push(`/profile/${author.userId}`);
    },
  },
  computed: {
    liked() {
      const { userLikes } = this.$store.state;
      return userLikes.includes(this.product.id);
    },
  },
  data() {
    return {
      Like,
      Liked,
      Menu,
    };
  },
};
</script>

<template>
  <div class="card">
    <div
      class="card__image"
      :style="imageStyle(product.image)"
    />
    <div class="card__info">
      <span class="card__info__title">{{ product.title }}</span>
      <div class="card__info__meta">
        <div class="card__info__meta__author">
          <profile-image
            class="card__info__meta__author__image"
            :image="product.author.profileImage"
          />
          <span
            @click="pushToProfile(product.author)"
            class="card__info__meta__author__name"
          >
            {{ product.author.name }}
          </span>
        </div>
        <div class="card__info__meta__menu">
          <span class="card__info__meta__menu__item">
            <img
              @click="toggleProductLike"
              class="card__info__meta__menu__item__image"
              :src="liked ? Liked : Like"
            />
          </span>
          <span class="card__info__meta__menu__item">
            <img
              class="card__info__meta__menu__item__image"
              :src="Menu"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 200px;

  &__image {
    width: 100%;
    height: 200px;
    border: solid 1px rgb(209, 209, 209);
    border-radius: 10px;
    background-repeat: no-repeat;
    background-size: cover;
  }

  &__info {
    margin-top: 4px;

    &__title {
      font-weight: bold;
    }

    &__meta {
      display: flex;
      margin-top: 3px;

      &__author {
        margin-right: auto;
        display: flex;
        align-items: center;

        &__image {
          border: solid 1px rgb(209, 209, 209);
          border-radius: 100%;
          height: 23px;
          width: 23px;
          margin-right: 5px;
        }

        &__name {
          cursor: pointer;
        }
      }

      &__menu {
        margin-left: auto;
        display: flex;

        &__item {
          &__image {
            height: 1em;
            cursor: pointer;

            &:first-of-type {
              margin-right: 4px;
            }
          }
        }
      }
    }
  }
}
</style>
