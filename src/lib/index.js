import imgUpload from './imgUpload.vue'

const myPlugin = {    
    install(Vue, options) {
        Vue.prototype.imgUpload = imgUpload.upload;
        Vue.component(imgUpload.name, imgUpload)
    }
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(myPlugin)
  }

export default myPlugin

