<template>
  <div class="container">
    <div id="water-dom"></div>
  </div>
</template>

<script setup lang="ts">
  import * as THREE from 'three'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
  import gsap from 'gsap'
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('./draco/')
  // const MODEL_URL = './factory.glb'
  const MODEL_URL = './water/uploads/620-2-1.glb'

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  )
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  })
  // 创建 GLTFLoader 实例，并传递 DRACOLoader 实例
  const loader = new GLTFLoader()
  loader.setDRACOLoader(dracoLoader)

  const controls = new OrbitControls(camera, renderer.domElement)
  const light = new THREE.AmbientLight(0xffffff, 1)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  // 背景 白色
  scene.background = new THREE.Color(0x191919)
  loader.load(
    MODEL_URL,
    (gltf) => {
      // 处理材质和纹理
      gltf.scene.traverse((child) => {
        if (child.isMesh && child.name === '立方体036') {
          console.log(child, child.name)
          console.log('立方体036')
          // 给立方体036这个mesh，表面增加一个蓝色的材质，长度10
          child.material = new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            side: THREE.DoubleSide,
          })

        }
      })
      scene.add(gltf.scene)
    },
    (xhr) => {
      // console.log((xhr.loaded / xhr.total) * 100 + '% 已加载')
    },
    (error) => {
      console.error('加载模型时出错:', error)
    },
  )
  camera.position.z = 369.3198680803063
  camera.position.y = 238.40815268415315
  camera.position.x = 12.02838705295468
  // 设置渲染器大小
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 添加到dom
  document.body.appendChild(renderer.domElement)
  // 添加光源
  scene.add(light)
  scene.add(directionalLight)

  // 给模型的每个部分添加点击事件
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  window.addEventListener('click', (event) => {
    event.preventDefault()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children, true)
    if (intersects.length > 0) {
      console.log(intersects[0].object.name)
      const intersection = intersects[0]

      // 获取点击的 mesh
      const clickedMesh = intersection.object

      // 平滑移动过去，上方斜视角45度看点击的mesh
      gsap.to(camera.position, {
        x: clickedMesh.position.x + 10,
        y: clickedMesh.position.y + 100,
        z: clickedMesh.position.z + 100,
        duration: 1,
      })
    }
  })
  // 渲染
  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  animate()
</script>

<style>
  .container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
</style>
