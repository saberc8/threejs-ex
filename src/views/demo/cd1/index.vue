<template>
  <div class="bg">
    121221
    <div class="canvas" id="canvas"></div>
  </div>
</template>

<script setup lang="ts">
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
  import gsap from 'gsap'
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    10000,
  )
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(900, 900)

  camera.position.set(6000, -10, 50)

  const controls = new OrbitControls(camera, renderer.domElement)
  // 透明
  scene.background = new THREE.Color(0xa0a0a0)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
  scene.add(ambientLight)

  const directionLight = new THREE.DirectionalLight(0xffffff, 0.4)
  scene.add(directionLight)

  new GLTFLoader().load('/gem.glb', (gltf) => {
    console.log(gltf)
    // hdr贴图
    gltf.scene.traverse((obj: any) => {
      console.log(obj, 1)
      if (obj.isMesh) {
        // environment_L.hdr贴图
        obj.material.envMapIntensity = 3
        obj.material.envMap = scene.environment
        obj.material.needsUpdate = true
        obj.material.metalness = 1
        obj.material.roughness = 0.2
        obj.material.emissiveIntensity = 0.5
        obj.material.metalness = 1
      }
    })
    scene.add(gltf.scene)
  })

  new RGBELoader().load('/environment_L.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = texture
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.render(scene, camera)
  })

  // 旋转glb
  gsap.to(scene.rotation, {
    duration: 10,
    y: Math.PI * 2,
    repeat: -1,
    ease: 'none',
  })
  renderer.setClearAlpha(0)
  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    controls.update()
  }
  onMounted(() => {
    const canvas = document.getElementById('canvas')
    console.log(canvas)

    canvas?.appendChild(renderer.domElement)
    animate()
  })
</script>

<style>
  .bg {
    position: relative;
    height: 100vh;
    background-color: rgb(255, 255, 255);
  }

  .canvas {
    position: absolute;
    right: 0;
    top: 0;
    width: 900px;
    height: 900px;
    background-color: #497655;
  }
</style>
