<script>
import ProjectCard from '@/components/ProjectCard.vue';

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
    this.$emit('finishLoad');
  },
  data() {
    return {
      projects: [],
    };
  },
};
</script>

<template>
  <div class="home">
    <h1>펀딩 리스트</h1>
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
.card {
  margin-top: 10px;
  margin-right: 15px;
  margin-left: 15px;
}

.card-container {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
