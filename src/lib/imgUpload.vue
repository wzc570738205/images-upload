<template>
  <div>
    <div class="file">
      <div class="add">选择文件</div>
      <input type="file" name="" @change="upload" />
      <img :src="imgurl" alt="" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'imgUpload',
  data() {
    return {
      imgurl: '',
      fileName: ''
    };
  },
  methods: {
    upload(e) {
      let fileList = e.target.files;
      if (fileList.length > 0) {
        let file = fileList[0];

        /**限制文件大小 */
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          alert('Image must smaller than 2MB!');
          return;
        }

        /**服务器上传 */
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          //this.imgurl = reader.result;
          this.fileName = file.name;

          let formData = new FormData();
          formData.append('smfile', file);
          formData.append('file_id', 0);
          axios({
            method: 'post',
            url: 'https://sm.ms/api/v2/upload?inajax=1',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
          })
            .then(res => {
              //handle success
              let response = res.data;
              console.log(response);
              if (response.success) {
                this.imgurl = response.data.url;
              } else {
                if (response.code == 'image_repeated') {//重复上传
                  this.imgurl = response.images;
                }
                if (response.code == 'exception') {//上传成功，图片校验失败（证件照等）
                  this.imgurl = '';
                }
              }
            })
            .catch(response => {
              //handle error
              console.log(response);
            });
        };
      }
    },
    up(bodyFormData) {}
  }
};
</script>

<style lang="scss" scoped>
.file {
  position: relative;
  display: inline-block;
  background-color: #fafafa;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
  color: #666;
  width: 128px;
  height: 128px;
  .add {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  input {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 128px;
    height: 128px;
    z-index: 1;
    &:hover {
      cursor: pointer;
    }
  }
  img {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
  }
  &:hover {
    border-color: #1890ff;
  }
}
</style>
