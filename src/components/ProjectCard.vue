<script>
import Like from '@/assets/like.png';
import Liked from '@/assets/liked.png';
import Menu from '@/assets/menu.png';
import ProfileImage from '@/components/ProfileImage.vue';
import { mapState } from 'vuex';

export default {
  name: 'ProjectCard',
  components: { ProfileImage },
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  async created() {
    const author = (await this.$db
      .collection('user')
      .doc(this.project.author)
      .get())
      .data();
    this.project.author = author;
  },
  methods: {
    imageStyle(imageURL) {
      return {
        'background-image': `url('${imageURL}')`,
        'background-position': 'center',
      };
    },
    async toggleProjectLike() {
      this.$emit('startLoad');
      if (!this.signedIn) return;
      const { userLikes } = this.$store.state;
      const { id: projectId } = this.project;
      const userLiked = this.liked;
      const { userId } = this.$store.state.userProfile;
      const project = (await this.$db
        .collection('projects')
        .doc(projectId)
        .get())
        .data();
      if (!userLiked) {
        userLikes.push(projectId);
        project.likers.push(userId);
      } else {
        const index1 = userLikes.indexOf(projectId);
        userLikes.splice(index1, 1);
        const index2 = project.likers.indexOf(userId);
        project.likers.splice(index2, 1);
      }
      this.$store.commit('setUserLikes', userLikes);
      await this.$db
        .collection('projects')
        .doc(projectId)
        .set(project);
      this.$emit('finishLoad');
    },
    pushToProfile(author) {
      this.$router.push(`/profile/${author.userId}`);
    },
    pushToProject() {
      this.$router.push(`/project/${this.project.id}`);
    },
  },
  computed: {
    liked() {
      const { userLikes } = this.$store.state;
      return userLikes.includes(this.project.id);
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
      @click="pushToProject"
      class="card__image"
      :style="imageStyle(project.thumbnail)"
    />
    <div class="card__info">
      <div style="display: flex;">
        <div style="display: flex;">
          <span style="margin-right: 3px;">기존 직업</span>
          <span class="card__info__job">{{ project.job }}</span>
        </div>
        <div style="display: flex; margin-left: auto;">
          {{ project.category }}
        </div>
      </div>
      <span
        @click="pushToProject"
        class="card__info__title"
      >
        {{ project.title }}
      </span>
      <div class="card__info__meta">
        <div class="card__info__meta__author">
          <profile-image
            class="card__info__meta__author__image"
            :image="project.author.profileImage"
          />
          <span
            @click="pushToProfile(project.author)"
            class="card__info__meta__author__name"
          >
            {{ project.author.name }}
          </span>
        </div>
        <div v-if="signedIn" style="display: flex; align-items: center;">
          <span style="margin-right: 5px; font-size: 1.05rem;">
            {{ ((project.paid / project.price) * 100).toFixed(0) }}%
          </span>
          <img
            @click="toggleProjectLike"
            class="card__info__meta__menu__item__image"
            :src="liked ? Liked : Like"
          />
        </div>
      </div>

      <div class="progress-wrapper">
        <div
          class="progress"
          :style="{
            width: `${((project.paid / project.price) * 100).toFixed(0)}%`
          }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.progress-wrapper{
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
}

.progress {
  height: 3px;
  background-color: #344EAE;
  border-radius: 5px;
}

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

    &__job {
      display: block;
      color: #808080;
    }

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
        align-items: center;

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
