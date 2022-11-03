<template>
  <div class="menutree" :class="meneClass">
    <template v-for="(item,index) in menuData">
      <el-menu-item v-if="!item.menuList || !item.menuList.length" :key="index" :index="String(item.menuID)" @click="jump(item)">
        <!-- <i v-if="!item.imgcode&&item.menuIcon" class="el-icon-location" /> -->
        <svg-icon
          v-if="item.menuIcon"
          class="menuicon"
          style="width: 20px; height: 20px;margin-left:-6px;margin-right:8px"
          :icon-class="item.menuIcon"
        />
        <svg-icon
          v-if="item.menuIconPre"
          class="menuiconpre"
          style="width: 20px; height: 20px;margin-left:-6px;margin-right:8px"
          :icon-class="item.menuIconPre"
        />
        <span slot="title">{{ item.menuCName }}</span>
      </el-menu-item>
      <el-submenu v-if="item.menuList && item.menuList.length" :key="index" :index="String(item.menuID)">
        <template slot="title">
          <!-- <i v-if="!item.imgcode&&item.menuIcon" class="el-icon-menu" /> -->
          <svg-icon
            v-if="item.menuIcon"
            class="menuicon"
            style="width: 20px; height: 20px;margin-left:-6px;margin-right:8px;"
            :icon-class="item.menuIcon"
          />
          <svg-icon
            v-if="item.menuIcon"
            class="menuiconpre"
            style="width: 20px; height: 20px;margin-left:-6px;margin-right:8px"
            :icon-class="item.menuIconPre"
          />
          <span>{{ item.menuCName }}</span>
        </template>
        <menu-tree :menu-data="item.menuList" :menu-index="menuIndex+1" @jump="jump" />
      </el-submenu>
    </template>
  </div>
</template>

<script>
import MenuTree from './MenuTree'
export default {
  name: 'MenuTree',
  components: { MenuTree },
  props: {
    menuData: {
      type: Array,
      default: function() {
        return []
      }
    },
    menuIndex: {
      type: Number,
      default: function() {
        return 1
      }
    }
  },
  computed: {
    meneClass() {
      return 'menutree' + this.menuIndex
    }
  },
  methods: {
    jump(item) {
      console.log('jump')
      this.$emit('jump', item)
    }
  }
}
</script>
<style lang="scss">
.menuicon{

}
</style>
