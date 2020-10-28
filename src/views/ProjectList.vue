<script>
import ProjectCard from '@/components/ProjectCard.vue';
import Banner1 from '@/assets/banner1.png';
import Banner2 from '@/assets/banner2.png';
import Banner3 from '@/assets/banner3.png';

export default {
  name: 'ProjectList',
  components: { ProjectCard },
  async created() {
    this.$emit('startLoad');
    const projects = (await this.$db
      .collection('projects')
      .get())
      .docs
      .map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    this.projects = projects;
    setInterval(() => {
      this.current = (this.current + 1) % 3;
    }, 2000);
    this.$emit('finishLoad');
  },
  computed: {
    currentBanner() {
      switch (this.current) {
        case 0: return Banner1;
        case 1: return Banner2;
        case 2: return Banner3;
        default: return Banner1;
      }
    },
  },
  data() {
    return {
      projects: [],
      Banner1,
      Banner2,
      Banner3,
      current: 0,
    };
  },
};
</script>

<template>
  <div class="home">
    <div class="banner">
      <img class="banner__image" :src="currentBanner">
    </div>
    <div class="card-container">
        <project-card
          class="card"
          :key="project._id"
          v-for="project in projects"
          :project="project"
        />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  width: 100%;
  display: flex;
  justify-content: center;

  &__image {
    height: 330px;
  }
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  margin-top: 10px;
  margin-right: 15px;
  margin-left: 15px;
}

.card-container {
  display: flex;
  width: 1024px;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
