<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      _id: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      author: {
        image: {
          type: String,
          default: '',
        },
        name: {
          type: String,
          required: true,
        },
      },
    },
  },
};
</script>

<template>
  <div class="card">
    <div class="card__image" />
    <div class="card__info">
      <span class="card__info__title">{{ product.title }}</span>
      <div class="card__info__meta">
        <div class="card__info__meta__author">
          <div class="card__info__meta__author__image" />
          <span class="card__info__meta__author__name">
            {{ product.author.name }}
          </span>
        </div>
        <div class="card__info__meta__menu">
          <span class="card__info__meta__menu__item">
            ❤️
          </span>
          <span class="card__info__meta__menu__item">
            ㆔
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

        &__image {
          border: solid 1px rgb(209, 209, 209);
          border-radius: 100%;
          height: 17px;
          width: 17px;
          margin-right: 5px;
        }

        &__name {}
      }

      &__menu {
        margin-left: auto;
        display: flex;
      }
    }
  }
}
</style>
