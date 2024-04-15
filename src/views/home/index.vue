<template>
  <div class="home-container">
    <h2 class="title">3d 演 示</h2>
    <div v-for="(item, index) in list" :key="index">
      <div
        class="button button-gradient"
        @mouseenter="addClass($event.target, 'start')"
        @mouseleave="removeClass($event.target, 'start')"
        @click="() => $router.push(item.path)"
      >
        {{ item.name }}
        <div class="lines">
          <div>
            <svg viewBox="0 0 165 48">
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                rx="4"
                ry="4"
                pathLength="10"
              ></rect></svg
            ><svg viewBox="0 0 165 48">
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                rx="4"
                ry="4"
                pathLength="10"
              ></rect></svg
            ><svg viewBox="0 0 165 48">
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                rx="4"
                ry="4"
                pathLength="10"
              ></rect></svg
            ><svg viewBox="0 0 165 48">
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                rx="4"
                ry="4"
                pathLength="10"
              ></rect>
            </svg>
          </div>
          <div>
            <svg viewBox="0 0 165 48">
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                rx="4"
                ry="4"
                pathLength="10"
              ></rect></svg
            ><svg viewBox="0 0 165 48">
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                rx="4"
                ry="4"
                pathLength="10"
              ></rect></svg
            ><svg viewBox="0 0 165 48">
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                rx="4"
                ry="4"
                pathLength="10"
              ></rect></svg
            ><svg viewBox="0 0 165 48">
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                rx="4"
                ry="4"
                pathLength="10"
              ></rect>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const list = [
    {
      name: '3d展厅',
      path: '/demo/art',
    },
    {
      name: '虚拟人',
      path: '/demo/virtual-humans',
    },
    {
      name: '可视化大屏',
      path: '/demo/dashboard',
    },
  ]

  // 鼠标移入添加类名
  const addClass = (el: any, className: string) => {
    if (el.classList) {
      el.classList.add(className)
    } else {
      el.className += ' ' + className
    }
  }

  const removeClass = (el: any, className: string) => {
    if (el.classList) {
      el.classList.remove(className)
    } else {
      el.className = el.className.replace(
        new RegExp(
          '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
          'gi',
        ),
        ' ',
      )
    }
  }
</script>

<style lang="scss">
  .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #000000;
    .title {
      // 文字渐变色
      background: linear-gradient(105.23deg, #01a4ff 33.35%, #01ffc2 115.77%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 40px;
      margin-top: -200px;
    }
  }

  .button {
    width: 165px;
    height: 48px;
    cursor: pointer;
    border-radius: 4px;
    margin: 20px 0;
    text-align: center;
    line-height: 48px;
  }
  .button-gradient {
    -webkit-tap-highlight-color: transparent;
    appearance: none;
    outline: none;
    border: none;
    background: linear-gradient(105.23deg, #01a4ff 33.35%, #01ffc2 115.77%);
    position: relative;
    color: #000000;
    box-shadow: 0 1px 2px rgba(0, 0, 0), 0 4px 16px rgba(0, 0, 0),
      0 4px 24px rgba(0, 0, 0);
  }

  .button-transparent {
    -webkit-tap-highlight-color: transparent;
    appearance: none;
    outline: none;
    position: relative;
    box-shadow: 0 1px 2px rgba(0, 0, 0), 0 4px 16px rgba(0, 0, 0),
      0 4px 24px rgba(0, 0, 0);
  }

  .button-gradient.start .lines svg,
  .button-transparent.start .lines svg {
    animation: stroke 0.3s linear;
  }

  .button-gradient .lines,
  .button-transparent .lines {
    position: absolute;
    inset: 0;
    mix-blend-mode: hard-light;
    pointer-events: none;
    z-index: 1;
  }

  .button-gradient .lines > div,
  .button-transparent .lines > div {
    position: absolute;
    inset: 0;
  }

  .button-gradient .lines > div:last-child,
  .button-transparent .lines > div:last-child {
    transform: rotate(180deg);
  }

  .button-gradient .lines > div svg {
    display: block;
    position: absolute;
    inset: 0;
    overflow: visible;
    fill: none;
    stroke-width: 2;
    stroke: #01a4ff;
    width: 100%;
    height: 100%;
    stroke-dasharray: 12 12;
    stroke-dashoffset: 12;
    opacity: 0;
    transform: rotate(-1deg) translate3d(0, 0, 0);
  }

  .button-transparent .lines > div svg {
    display: block;
    position: absolute;
    inset: 0;
    overflow: visible;
    fill: none;
    stroke-width: 2;
    stroke: #c9e9ff;
    width: 100%;
    height: 100%;
    stroke-dasharray: 12 12;
    stroke-dashoffset: 12;
    opacity: 0;
    transform: rotate(-1deg) translate3d(0, 0, 0);
  }

  .button-gradient .lines > div svg:nth-child(1) {
    stroke: #01ffc2;
  }

  .button-transparent .lines > div svg:nth-child(1) {
    stroke: #f8fcff;
  }

  .button-gradient .lines > div svg:nth-child(2),
  .button-transparent .lines > div svg:nth-child(2) {
    stroke-width: 6px;
    filter: blur(20px);
  }

  .button-gradient .lines > div svg:nth-child(3),
  .button-transparent .lines > div svg:nth-child(3) {
    stroke-width: 5px;
    filter: blur(6px);
  }

  .button-gradient .lines > div svg:nth-child(4),
  .button-transparent .lines > div svg:nth-child(4) {
    stroke-width: 10px;
    filter: blur(56px);
  }

  @keyframes stroke {
    30%,
    55% {
      opacity: 1;
    }

    100% {
      stroke-dashoffset: 5;
      opacity: 0;
    }
  }
</style>
