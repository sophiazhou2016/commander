<template>
  <div class="skeleton">
    <!-- swiperBanner 滚动广告位 -->
    <div class="swiperBanner">
      <div class="bannerbkg">
        <img src="../../../assets/img/paipaidaibai@3x.png">
      </div>
    </div>
    <!-- contentTitle 标题 -->
    <div class="contentTitle"></div>
    <!-- lineAdItem 条形广告位 -->
    <div class="lineAdItem borderBottom">
      <div class="imgContent">
        <div class="imgbkg"></div>
      </div>
      <div class="mainContent">
        <div class="titlebkg"></div>
        <div class="descbkg"></div>
      </div>
      <div class="iconContent">
        <img src="../../../assets/img/more@3x.png">
      </div>
    </div>
    <div class="lineAdItem borderBottom">
      <div class="imgContent">
        <div class="imgbkg"></div>
      </div>
      <div class="mainContent">
        <div class="titlebkg"></div>
        <div class="descbkg"></div>
      </div>
      <div class="iconContent">
        <img src="../../../assets/img/more@3x.png">
      </div>
    </div>
    <div class="lineAdItem">
      <div class="imgContent">
        <div class="imgbkg"></div>
      </div>
      <div class="mainContent">
        <div class="titlebkg"></div>
        <div class="descbkg"></div>
      </div>
      <div class="iconContent">
        <img src="../../../assets/img/more@3x.png">
      </div>
    </div>
    <!-- <div class="contentTitle"></div> -->
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
    <!-- <div class="contentTitle"></div> -->
    <!-- shopDataGroup 商城运营广告位 -->
    <!-- <div class="shopDataGroup">
      <div class="shopBanner">
        <div class="imgContent">
          <div class="imgbkg"></div>
        </div>
        <div class="mainContent"></div>
      </div>
      <div class="shopBanner">
        <div class="imgContent">
          <div class="imgbkg"></div>
        </div>
        <div class="mainContent"></div>
      </div>
      <div class="shopBanner last">
        <div class="imgContent">
          <div class="imgbkg"></div>
        </div>
        <div class="mainContent"></div>
      </div>
    </div> -->
  </div>
</template>

<style lang="scss">
@import '../../../common/style/util.scss';
@import '@/common/style/borderLine.scss';
@include border-line-style(#f1f2f4);
body {
  background: #fff;
  margin: 0;
}
.app {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  background-color: #fff;
}
.skeleton {
  padding: pxToVw(10) pxToVw(15);

  .contentTitle {
    height: pxToVw(12);
    width: pxToVw(140);
    // border-radius: pxToVw(10);
    // background: #F3F5FD;
    margin: pxToVw(13) 0 pxToVw(15) pxToVw(13);
    background-image: linear-gradient(270deg, #fafbff 25%, #f3f5fd 100%);
  }

  .swiperBanner {
    width: 100%;
    height: pxToVw(65);
    margin: pxToVw(20) 0 pxToVw(25);
    // width: pxToVw(339);
    display: flex;
    justify-content: center;
    align-items: center;

    .bannerbkg {
      width: pxToVw(305);
      height: pxToVw(65);
      background: #f3f5fd;
      border-radius: pxToVw(32.5);
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: pxToVw(78);
        height: pxToVw(33.5);
        margin-top: pxToVw(4);
      }
    }
  }
  .lineAdItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .imgContent {
      height: pxToVw(42);
      width: pxToVw(42);
      margin: pxToVw(12) pxToVw(10);
      .imgbkg {
        background: #f3f5fd;
        height: pxToVw(42);
        width: pxToVw(42);
        border-radius: pxToVw(15);
      }
    }
    .mainContent {
      flex: 1;
      .titlebkg {
        height: pxToVw(12);
        width: pxToVw(80);
        // border-radius: pxToVw(5);
        // background: #F3F5FD;
        margin-bottom: pxToVw(8);
        background-image: linear-gradient(270deg, #fafbff 25%, #f3f5fd 100%);
        border-radius: 1px;
      }
      .descbkg {
        height: pxToVw(10);
        width: pxToVw(106);
        // border-radius: pxToVw(3);
        background: #f3f5fd;
        background-image: linear-gradient(270deg, #fafbff 25%, #f3f5fd 100%);
        border-radius: 1px;
      }
    }
    .iconContent {
      img {
        margin-top: pxToVw(3);
        height: pxToVw(22);
        width: pxToVw(22);
      }
    }
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
      background: #f8fafe;
      border-radius: pxToVw(4);

      .imgContent {
        height: pxToVw(42);
        width: pxToVw(42);
        margin: pxToVw(12) pxToVw(10);
        .imgbkg {
          background: #e5eaf9;
          height: pxToVw(42);
          width: pxToVw(42);
          border-radius: pxToVw(15);
        }
      }
      .mainContent {
        flex: 1;
        .titlebkg {
          height: pxToVw(12);
          width: pxToVw(60);
          //   border-radius: pxToVw(5);
          //   background: #F3F5FD;
          margin-bottom: pxToVw(8);
          background-image: linear-gradient(270deg, #f3f5fb 25%, #e6e9f7 100%);
        }
        .descbkg {
          height: pxToVw(10);
          width: pxToVw(84);
          //   border-radius: pxToVw(3);
          //   background: #F3F5FD;
          background-image: linear-gradient(270deg, #f3f5fb 25%, #e6e9f7 100%);
        }
      }
    }
  }
  .shopDataGroup {
    display: flex;
    justify-content: space-between;
    margin: pxToVw(15) 0;
    .shopBanner {
      width: pxToVw(108);
      border-radius: pxToVw(4);
      .imgContent {
        height: pxToVw(108);
        width: pxToVw(108);
        margin-bottom: pxToVw(15);
        .imgbkg {
          background: #f3f5fd;
          height: pxToVw(108);
          width: pxToVw(108);
          border-radius: pxToVw(15);
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .mainContent {
        height: pxToVw(20);
        width: pxToVw(108);
        // border-radius: pxToVw(5);
        background: #f3f5fd;
      }
    }
    .last {
      margin-right: pxToVw(7);
    }
  }
}
</style>
