<template>
  <div class="dashboard-container" />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard-container {
  background-image: url(../../assets/images/index_bg.png);
  /*width: 1482px;
  height: 900px;
  background-size: cover;*/
  min-height: 100vh;
  filter: opacity(0.3);
  background-size: 100% 100%;
}
</style>
