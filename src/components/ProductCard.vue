<script>
import Like from '@/assets/like.png';
import Liked from '@/assets/liked.png';
import Menu from '@/assets/menu.png';
import ProfileImage from '@/components/ProfileImage.vue';
import { mapState } from 'vuex';

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
        'background-position': 'center',
      };
    },
    async toggleProductLike() {
      this.$emit('startLoad');
      if (!this.signedIn) return;
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
    pushToProduct() {
      this.$router.push(`/product/${this.product.id}`);
    },
  },
  computed: {
    liked() {
      const { userLikes } = this.$store.state;
      return userLikes.includes(this.product.id);
    },
    ...mapState(['signedIn']),
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
      @click="pushToProduct"
      class="card__image"
      :style="imageStyle(product.thumbnail)"
    />
    <div class="card__info">
      <span
        @click="pushToProduct"
        class="card__info__title"
      >
        {{ product.title }}
      </span>
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
        <div v-if="signedIn" class="card__info__meta__menu">
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

  * {
    max-width: 100%;
  }

  &__image {
    cursor: pointer;
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
      width: 100%;
      font-weight: bold;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
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
