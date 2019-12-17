<template>
  <div class="bottom bg-gray">
    <div class="w1400">
      <ul class="font14">
        <li class="fl">官网</li>
        <li class="fl">Github</li>
        <li class="fl">Docs</li>
      </ul>
    </div>
  </div>

</template>

<script>
  import {connect} from '@/api/util'

  export default {
    name: "bottom-bar",
    methods: {

      /**
       * @disc: url 连接
       * @params: name, parameter, type
       * @date: 2019-08-22 14:26
       * @author: Wave
       */
      toUrl(name, parameter, type) {
        let newPath = connect(name, parameter, type);
        if (newPath.success) {
          this.$router.push(newPath.data);
        }
      },
    }
  }
</script>

<style lang="less">
  @import "./../assets/css/style";

  .bottom {
    height: 60px;
    bottom: 0;
    width: 100%;
    position: fixed;
    .w1400 {
      height: 100%;
      line-height: 60px;
      ul {
        li {
          padding: 0 10px;
          color: #dedede;
          cursor: pointer;
          &:first-child {
            padding: 0 10px 0 0;
          }
        }
      }
    }
  }
</style>
