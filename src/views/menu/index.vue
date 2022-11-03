<template>
  <div class="iframe-container">
    <iframe
      id="menuiframe"
      :src="url"
      frameborder="no"
      style="width: 100%; min-height: calc(100vh - 55px)"
      scrolling="auto"
    />
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
export default {
  name: 'Menu',
  data() {
    return {
      token: '',
      url: ''
    }
  },
  created() {
    // this.url = `${this.$route.query.url}?token=${getToken}`this.$route.query.url + '?token=' + getToken()
  }
}
</script>
<style lang="scss" scoped>
.iframe-container {
  margin: 10px 10px 0;
}
</style>
