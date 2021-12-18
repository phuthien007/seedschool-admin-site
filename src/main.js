import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './routes/index.js'
import ImageUploader from 'vue-image-upload-resize'

Vue.use(ImageUploader);

Vue.config.productionTip = false

// App.use(
//   cors({
//     credentials: true,
//     origin: "http://seedschool.herokuapp.com/",
//   })
// )
// // Enable pre-flight for all routes
// app.options("*", cors())

new Vue({
  vuetify,
  router: router,
  render: h => h(App)
}).$mount('#app')
