<template>
  <div class="skeleton">
    <!-- 小icon图标 -->
    <div class="contentTitle"></div>
    <div class="ppcardAdContent">
      <div v-for="item in [1,2,3,4]" class="serviceItem">
        <div class="imgContent">
          <div class="imgbkg"></div>
        </div>
        <div class="mainContent"></div>
      </div>
    </div>
    <div class="contentTitle"></div>
    <div class="ppcardAdContent">
      <div v-for="item in [1,2,3,4]" class="serviceItem">
        <div class="imgContent">
          <div class="imgbkg"></div>
        </div>
        <div class="mainContent"></div>
      </div>
    </div>
    <div class="contentTitle"></div>
    <!-- rectAdGroup 方形广告位 -->
    <div class="rectAdGroup">
        <div class="rectAdItem left">
          <div class="imgContent">
            <div class="imgbkg"></div>
          </div>
          <div class="mainContent">
            <div class="titlebkg"></div>
            <div class="descbkg"></div>
          </div>
        </div>
        <div class="rectAdItem">
          <div class="imgContent">
            <div class="imgbkg"></div>
          </div>
          <div class="mainContent">
            <div class="titlebkg"></div>
            <div class="descbkg"></div>
          </div>
        </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../common/style/util.scss';
body {
    background-color: transparent;
    margin: 0;
    padding-top: pxToVw(12);
}
.skeleton {
  padding: pxToVw(10) pxToVw(15) pxToVw(10);
//   margin-top: pxToVw(12);
  background-color: #fff;
  border-radius: pxToVw(8);

  .contentTitle {
    height: pxToVw(25);
    width: pxToVw(150);
    border-radius: pxToVw(10);
    background: #F3F5FD;
    margin: pxToVw(30) 0 pxToVw(10);
  }
  .rectAdGroup {
    display: flex;
    justify-content: space-between;
    margin: pxToVw(15) 0;
    .left {
      margin-right: pxToVw(7);
    }

    .rectAdItem {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: pxToVw(166);
      height: pxToVw(80);
      border-radius: pxToVw(4);

      .imgContent {
        height: pxToVw(42);
        width: pxToVw(42);
        margin: pxToVw(12) pxToVw(10);
        .imgbkg {
          background: #F3F5FD;
          height: pxToVw(42);
          width: pxToVw(42);
          border-radius: pxToVw(15);
        }
      }
      .mainContent {
        flex: 1;
        .titlebkg {
          height: pxToVw(15);
          width: pxToVw(75);
          border-radius: pxToVw(5);
          background: #F3F5FD;
          margin-bottom: pxToVw(8);
        }
        .descbkg {
          height: pxToVw(10);
          width: pxToVw(95);
          border-radius: pxToVw(3);
          background: #F3F5FD;
        }
      }
    }
  }

  .ppcardAdContent {
    margin-bottom: pxToVw(20);
    padding: 0 pxToVw(8);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap ;

    .serviceItem {
      width: pxToVw(60);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .imgContent {
        height: pxToVw(42);
        width: pxToVw(42);
        margin: pxToVw(12) 0;
        display: flex;
        justify-content: center;
        width: 100%;
        .imgbkg {
          background: #F3F5FD;
          height: pxToVw(42);
          width: pxToVw(42);
          border-radius: pxToVw(21);
        }
      }
      .mainContent {
        height: pxToVw(20);
        width: pxToVw(60);
        border-radius: pxToVw(5);
        background: #F3F5FD;
      }
    }
  }
}
</style>
