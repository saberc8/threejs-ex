<template>
  <!-- 3d -->
  <div id="container" style="width: 1000px; height: 500px"></div>
</template>
 
<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
 
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      mesh: null,
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
    };
  },
  created() {},
  mounted() {
    this.init();
  },
 
  methods: {
    // 初始化
    init() {
      this.createScene(); // 创建场景
      this.loadGLTF(); // 加载GLTF模型
      this.createLight(); // 创建光源
      this.createCamera(); // 创建相机
      this.createRender(); // 创建渲染器
      this.createControls(); // 创建控件对象
      this.render(); // 渲染
    },
    // 创建场景
    createScene() {
      this.scene = new THREE.Scene();
    },
    // 加载GLTF模型
    loadGLTF() {
      const THIS = this;
      const loader = new GLTFLoader();
      loader.load(
        //this.publicPath + "static/gltf/ha/scene.gltf",
        this.publicPath + "static/gltf/devicegltf/scene.gltf",
        (model) => {
          model.scene.children[0].scale.set(50, 50, 50);
          this.scene.add(model.scene.children[0]);
        }
      );
    },
 
    // 创建光源
    createLight() {
      // 环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // 创建环境光
      this.scene.add(ambientLight); // 将环境光添加到场景
 
      const spotLight = new THREE.SpotLight(0xffffff); // 创建聚光灯
      spotLight.position.set(150, 150, 150);
      spotLight.castShadow = true;
      this.scene.add(spotLight);
    },
    // 创建相机
    createCamera() {
      const element = document.getElementById("container");
      const width = element.clientWidth; // 窗口宽度
      const height = element.clientHeight; // 窗口高度
      const k = width / height; // 窗口宽高比
      // PerspectiveCamera( fov, aspect, near, far )
      this.camera = new THREE.PerspectiveCamera(35, k, 0.1, 1000);
      this.camera.position.set(150, 150, 150); // 设置相机位置
 
      this.camera.lookAt(new THREE.Vector3(10, 40, 0)); // 设置相机方向
      this.scene.add(this.camera);
    },
    // 创建渲染器
    createRender() {
      const element = document.getElementById("container");
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(element.clientWidth, element.clientHeight); // 设置渲染区域尺寸
      this.renderer.shadowMap.enabled = true; // 显示阴影
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.setClearColor(0x3f3f3f, 1); // 设置背景颜色
      //this.renderer.setClearColor(0xf5f5f5, 1); // 设置背景颜色
      element.appendChild(this.renderer.domElement);
    },
 
    render() {
      if (this.mesh) {
        this.mesh.rotation.z += 0.006;
      }
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render);
    },
    // 创建控件对象
    createControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
  },
};
</script>