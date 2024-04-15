<template>
  <div id="canvas"></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { WSHall } from './useHall'
let hall: WSHall

onMounted(() => {

  hall = new WSHall({
    debugMode:0,
    container: document.getElementById('canvas') || document.body,
    cameraLookAt: { x: .1, y: 10, z: 0 },
    cameraPosition: { x: 0, y: 10, z: -70 },
    cameraHeight: 15,
    maxSize: 10,
    picDepth: .1,
    viewportDeg:45
  })
  hall.loadModel({
    url: '../../../../public/art.glb',
    position: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    onProgress: (p: any) => {
      console.log(p);
    }
  })
  hall.loadMaterials([
    {
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fbao%2Fuploaded%2Fi4%2F373592367%2FO1CN01wQIqn01TM8FgJsiie_%21%210-item_pic.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1682129450&t=dc68a4e27778f133ed282b0f27856746',
      position:{x: 60.895203636309725, y: 21.18942212519617, z: 62.14758975002996},
      scale: { x: 1, y: 1, z: 1 }, 
      id: '12',
      preview:{
        position:{x: 60.895203636309725, y: 21.196526457515933, z: 50.214673415170715},
        lookAt:{x: 60.895203636309725, y: 21.18942212519617, z: 62.14758975002996}
      },
      onClick:(item)=>{
        console.log(item);
      }
    },
    {
      url: './img/shufa.jpeg',
      position:{x: 35.895203636309725, y: 21.18942212519617, z: 62.14758975002996},
      scale: { x: 1, y: 1, z: 1 },
      id: '13',
      preview:{
        position:{x: 35.895203636309725, y: 21.196526457515933, z: 50.214673415170715},
        lookAt:{x: 35.895203636309725, y: 21.18942212519617, z: 62.14758975002996}
      },
      onClick:(item)=>{
        
      }
    },
    {
      url: './img/shufa1.jpeg',
      position:{x: -60.895203636309725, y: 21.18942212519617, z: 62.14758975002996},
      scale: { x: 1, y: 1, z: 1 },
      id: '14',
      preview:{
        position:{x: -60.895203636309725, y: 21.18942212519617, z: 50.14758975002996},
        lookAt:{x: -60.895203636309725, y: 21.18942212519617, z: 62.14758975002996}
      },
      onClick:(item)=>{
        
      }
    },
    {
      url: './img/shufa2.jpeg',
      position:{x: -80.895203636309725, y: 21.18942212519617, z: 62.14758975002996},
      scale: { x: 1, y: 1, z: 1 },
      id: '15',
      preview:{
        position:{x: -80.895203636309725, y: 21.18942212519617, z: 50.14758975002996},
        lookAt:{x: -80.895203636309725, y: 21.18942212519617, z: 62.14758975002996}
      },
      onClick:(item)=>{
        
      }
    },

    {
      url: './img/shufa3.jpeg',
      position:{x: -20.895203636309725, y: 21.18942212519617, z: 62.14758975002996},
      scale: { x: 1, y: 1, z: 1 },
      id: '16',
      preview:{
        position:{x: -20.895203636309725, y: 21.18942212519617, z: 50.14758975002996},
        lookAt:{x: -20.895203636309725, y: 21.18942212519617, z: 62.14758975002996},
      },
      onClick:(item)=>{
        
      }
    },
    {
      url: './img/WechatIMG35.jpeg',
      position:{x: -40.895203636309725, y: 21.18942212519617, z: 62.14758975002996},
      scale: { x: 2, y: 2, z: 2 },
      id: '14',
      preview:{
        position:{x: -40.895203636309725, y: 21.18942212519617, z: 50.14758975002996},
        lookAt:{x: -40.895203636309725, y: 21.18942212519617, z: 62.14758975002996},
      },
      onClick:(item)=>{
        
      }
    },


  ])
})





</script>
<style>
#canvas {
  width: 100vw;
  height: 100vh;


}
</style>