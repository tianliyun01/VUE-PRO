<template>
  <div class="menutree" :class="meneClass">
    <template v-for="(item,index) in menuData">
      <el-menu-item v-if="!item.menuTreeDtoList || !item.menuTreeDtoList.length" :key="index" :index="String(item.menuUrl)" @click="jump(item)">
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
        <span slot="title">{{ item.menuName }}</span>
      </el-menu-item>
      <el-submenu v-if="item.menuTreeDtoList && item.menuTreeDtoList.length" :key="index" :index="String(item.menuUrl)">
        <template slot="title">
          <!-- <i v-if="!item.imgcode&&item.menuIcon" class="el-icon-menu" /> -->
          <svg-icon
            v-if="item.menuIcon"
            class="menuicon"
            style="width: 20px; height: 20px;margin-left:-6px;margin-right:8px;"
            :icon-class="item.menuIcon"
          />
          <span>{{ item.menuName }}</span>
        </template>
        <menu-tree :menu-data="item.menuTreeDtoList" :menu-index="menuIndex+1" @jump="jump" />
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
