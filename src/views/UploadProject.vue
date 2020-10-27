<script>
import PhotoButton from '@/assets/photo.png';
import TextButton from '@/assets/text.png';
import VideoButton from '@/assets/video.png';
import { v4 as uuid } from 'uuid';
import AButton from '../components/AButton.vue';

export default {
  name: 'UploadProject',
  components: { AButton },
  data() {
    return {
      form: {
        title: null,
        content: [],
        price: null,
        reward: null,
        job: null,
        category: null,
      },
      mediaTarget: 0,
      photoButton: PhotoButton,
      textButton: TextButton,
      videoButton: VideoButton,
    };
  },
  methods: {
    async addBlock(type) {
      if (type !== 'text') {
        this.mediaTarget = this.form.content.length;
        await this.getMediaFile();
      }
      this.form.content.push({
        type,
        value: null,
      });
    },
    async getMediaFile() {
      const fileInput = this.$refs.file;
      await fileInput.click();
    },
    async uploadMediaFile() {
      this.$emit('startLoad');
      const fileId = uuid();
      const file = this.$refs.file.files[0];
      await this.$storage.ref(`/projects/${fileId}`).put(file);
      this.$emit('finishLoad');
      const storageURL = `/projects/${fileId}`;
      const imageURL = await this.$storage
        .ref(storageURL)
        .getDownloadURL();
      this.form.content[this.mediaTarget].value = imageURL;
    },
    async uploadProject() {
      if (!this.form.title) {
        await this.$swal(
          '에러!',
          '제목을 입력해 주세요.',
          'error',
        );
        return;
      } if (!this.form.content.length) {
        await this.$swal(
          '에러!',
          '프로젝트의 내용을 추가해 주세요.',
          'error',
        );
        return;
      } if (!this.form.content.filter((v) => v.type === 'photo').length) {
        await this.$swal(
          '에러!',
          '프로젝트 대표 이미지를 첨부해 주세요.',
          'error',
        );
        return;
      }
      this.$emit('startLoad');
      const { userId: authorId } = this.$store.state.userProfile;
      await this.$db
        .collection('projects')
        .doc(uuid())
        .set({
          ...this.form,
          author: authorId,
          likers: [],
          thumbnail: this.form.content.filter((v) => v.type === 'photo')[0].value,
          paid: 1000,
        });
      this.$emit('finishLoad');
      await this.$swal(
        '성공!',
        '펀딩 프로젝트를 성공적으로 업로드 했어요.',
        'success',
      );
      this.$router.push(`/profile/${authorId}`);
    },
  },
};
</script>

<template>
  <div class="container">
    <input
      class="input-title"
      v-model="form.title"
      placeholder="제목을 입력해 주세요"
    >
    <div style="display: flex;">
      <input
        class="input-meta"
        v-model.number="form.price"
        placeholder="모집 목표 금액을 입력해 주세요 (원 단위)"
      >
      <input
        class="input-meta"
        v-model="form.job"
        placeholder="기존 직업을 입력해 주세요"
      >
    </div>
    <div class="content">
      <div
        :key="index"
        v-for="(block, index) in form.content"
        class="block"
      >
        <div
          v-if="block.type === 'text'"
          class="block-text"
        >
          <textarea v-model="form.content[index].value" />
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
    <div class="add-button-wrapper">
      <div class="add-button">
        <img @click="addBlock('photo')" :src="photoButton">
      </div>
      <div class="add-button">
        <img @click="addBlock('video')" :src="videoButton">
      </div>
      <div class="add-button">
        <img @click="addBlock('text')" :src="textButton">
      </div>
    </div>
    <p class="helper">프로젝트 대표 이미지는 맨 앞의 이미지가 사용됩니다.</p>
    <div class="footer-menu">
      <div class="category">
        <span class="category-label">카테고리</span>
        <input
          class="input-meta"
          v-model="form.category"
        >
      </div>
      <div class="upload">
        <a-button @click="uploadProject">업로드</a-button>
      </div>
    </div>
    <input type="file" @change="uploadMediaFile" ref="file" style="display: none;">
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
    border: 0;
    outline: none;
    font-size: 1.5rem;
    margin-bottom: 20px;
    border: 1px solid black;
    margin: 5px;
    padding: 3px 6px;
  }

  &-meta {
    width: 50%;
    border: 0;
    outline: none;
    font-size: 1.5rem;
    margin-bottom: 20px;
    border: 1px solid black;
    margin: 5px;
    padding: 3px 6px;
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
    textarea {
      width: 100%;
      height: 220px;
      border: 2px solid #C6C6C6;
      text-align: center;
      outline: none;
      font-size: 1.3rem;
      resize: none;
    }
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

.category {
  display: flex;
  align-items: center;
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

.helper {
  margin-left: auto;
  color: #808080;
  font-size: 1.1rem;
}
</style>
