import * as THREE from 'three'
import type {
  Options,
  ModelParams,
  MaterialParams,
  Vector,
} from '@/types/three/types'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import CameraControls from 'camera-controls'
import { GUIController } from 'dat.gui'
export type MeshDataExpand = {
  info?: MaterialParams
  infoIndex?: number
} & THREE.Object3D<THREE.Event>

//实例化
export class WSHall {
  _options: Options
  _renderer: THREE.WebGLRenderer
  _camera: THREE.PerspectiveCamera
  _scene: THREE.Scene
  _controls: CameraControls
  _clock: THREE.Clock
  _includes: Array<THREE.Object3D<THREE.Event>>
  _blockMeshs: Array<THREE.Object3D<THREE.Event>>
  _materials: Array<MeshDataExpand>
  _lookatCameraSize: number
  _transformControls: TransformControls
  _orbitControls: OrbitControls
  _gui: GUIController[]
  constructor(options: any) {
    this._options = Object.assign(
      {
        container: document.body,
        cameraPosition: { x: 0, y: 0, z: 0 },
        cameraHeight: 2,
        materialDepth: 1,
        maxSize: 1,
        debugMode: 0,
        viewportDeg: 30,
        mode: 'preview',
      },
      options,
    )
    this._renderer = new THREE.WebGLRenderer({
      //抗锯齿
      antialias: true,
    })
    this._includes = []
    this._materials = []
    this._clock = new THREE.Clock()
    this.renderInit()
    this._camera = new THREE.PerspectiveCamera(
      45,
      this._options.container.clientWidth /
        this._options.container.clientHeight,
      0.1,
      100000,
    )
    this.cameraInit()
    this._scene = new THREE.Scene()
    this.sceneInit()
    this._renderer.render(this._scene, this._camera)
    this._controls = this.createCameraControls()
    // this._orbitControls = this.createOrbitControls()
    // this._controls = this.createCameraControls()
    this._lookatCameraSize = 1e-5
    this._transformControls = this.createTransformControls()
    this.initTransFormControl()
    // this._controls = this.createOrbitControls()
    this.controlsInit()
    this.setResizeEvent()
    this.initEvent()
    this._blockMeshs = []
    this._options.debugMode && this.initAxesHelper()
    this._gui = []
    this.initResize()
  }
  setResizeEvent = () => {
    const w = this._options.container.clientWidth,
      h = this._options.container.clientHeight

    window.addEventListener('resize', () => {
      //代码执行
      console.log('resize')

      this._renderer.setSize(w, h)
      this._renderer.setPixelRatio(window.devicePixelRatio)
    })
  }
  private initResize() {
    window.addEventListener('resize', () => {
      // 更新相机参数
      this._camera.aspect =
        this._options.container.clientWidth /
        this._options.container.clientHeight
      this._camera.updateProjectionMatrix()
      // 更新渲染尺寸
      this._renderer.setSize(
        this._options.container.clientWidth,
        this._options.container.clientHeight,
      )
      this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
  }
  private initTransFormControl() {
    // this._transformControls.setMode('rotate')
    this._transformControls.addEventListener('mouseUp', () => {
      this._controls.enabled = !false
    })
    this._transformControls.addEventListener('mouseDown', () => {
      console.log('按下')

      this._controls.enabled = false
    })
    this._transformControls.addEventListener('objectChange', () => {
      const { position, scale, rotation } = this._transformControls.object!
      console.log(position, rotation)
    })
  }
  private createOrbitControls = () => {
    const oc = new OrbitControls(this._camera, this._renderer.domElement)
    this._camera.position.set(0, 20, 100)
    oc.enableDamping = true
    return oc
  }
  private createTransformControls = () => {
    const transformControls = new TransformControls(
      this._camera,
      this._renderer.domElement,
    )
    transformControls.setSpace('local')
    this.addScene(transformControls)

    return transformControls
  }
  private cameraInit = () => {
    this._camera.position.set(15, 10, 0)
  }

  /**
   * @description: 镜头控制器调整
   * @return {*}
   */
  private thirdPerspective = () => {
    this._controls.maxDistance = 1e-5
    // this._controls.dragToOffset = false
    this._controls.distance = 1
    this._controls.azimuthRotateSpeed = -1
    this._controls.polarRotateSpeed = 1e-5
    // this._controls.minZoom = .5
    // this._controls.maxZoom = 5
    // this._controls.mouseButtons.wheel = CameraControls.ACTION.ZOOM
    this._controls.saveState()
    const cp = this._options.cameraPosition
    const cla = this._options.cameraLookAt

    //坐标之间 cp---lookat--------cla
    const lookat = new THREE.Vector3(cp?.x, cp?.y, cp?.z).lerp(
      new THREE.Vector3(cla?.x, cla?.y, cla?.z),
      this._lookatCameraSize,
    )

    this._controls.setLookAt(
      cp?.x,
      cp?.y,
      cp?.z,
      lookat?.x,
      lookat?.y,
      lookat?.z,
      true,
    )
    // this._controls?.update()
  }

  private createCameraControls = () => {
    CameraControls.install({ THREE: THREE })
    return new CameraControls(this._camera, this._renderer.domElement)
  }
  private renderInit = () => {
    const { clientWidth, clientHeight } = this._options.container as HTMLElement
    this._renderer.setPixelRatio(window.devicePixelRatio) //像素比
    this._renderer.setSize(clientWidth, clientHeight) //宽高
    this._options.container.appendChild(this._renderer.domElement)
  }
  private sceneInit = () => {
    this.envLightInit()

    // this._scene.background = new THREE.Color(0xffffff);
  }
  private initAxesHelper = () => {
    this.addScene(new THREE.AxesHelper(1000))
  }
  private initEvent() {
    //射线
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    let startXY: any[] = []
    //方向
    let direction: 'left' | 'right'
    //转向系数
    let coefficient = 0

    const onchange = async (event: any) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
      //射线计算
      raycaster.setFromCamera(pointer, this._camera)
      //计算交点
      const intersects = raycaster.intersectObjects(this._includes)
      console.log('点击', intersects[0])
      if (
        this._blockMeshs.some(
          (item) => item.name === intersects[0]?.object.name,
        )
      )
        return
      if (intersects[0].object.name === 'floor_floor_0') {
        const mesh = intersects[0]
        const v3 = mesh.point
        // console.log(mesh);
        this._options?.beforeMove?.()
        //坐标之间 cp---lookat--------cla
        this._controls.moveTo(
          Math.max(Math.min(v3.x, 999), -999),
          this._options?.cameraHeight ?? 1,
          Math.max(Math.min(v3.z, 999 / 2), -999 / 2),
          true,
        )
        console.log(coefficient, direction)

        function getDeg() {
          const viewportDeg = this._options.viewportDeg
          return direction == 'left'
            ? viewportDeg * coefficient
            : -viewportDeg * coefficient
        }
        this._controls.rotate(
          getDeg.apply(this) * THREE.MathUtils.DEG2RAD,
          0,
          true,
        )
      } else {
        const mesh = intersects[0]
        const v3 = mesh.point
        // console.log(mesh);
        const object = mesh.object as MeshDataExpand
        const info = object.info
        const infoIndex = mesh.object?.infoIndex as number
        const item = info!.preview
        // item&&this._controls.lookInDirectionOf(item?.lookAt.x,5,item?.lookAt.z,true)
        info?.onClick(info, infoIndex, mesh.object.uuid)
        const cp = item.position
        const cla = item.lookAt
        const lookAt = new THREE.Vector3(cp.x, cp.y, cp.z).lerp(
          new THREE.Vector3(cla.x, cla.y, cla.z),
          this._lookatCameraSize,
        )

        if (this._options.mode == 'edit') {
        } else {
          !this._options.debugMode &&
            this._controls.setLookAt(
              item.position.x,
              item.position.y,
              item.position.z,
              lookAt.x,
              lookAt.y,
              lookAt.z,
              true,
            )
        }

        // item&&this._controls.moveTo(item.position.x,item.position.y,item.position.z, true).then(()=>{

        // })
      }
      if (intersects[0].object && this._options.debugMode) {
        this._transformControls.attach(intersects[0].object)
      }
    }
    this._options.container.addEventListener('mousedown', (e) => {
      startXY = [e.clientX, e.clientY]
    })
    this._options.container.addEventListener('mouseup', (e) => {
      const [sx, sy] = startXY
      const winWidth = window.innerWidth
      const zero = winWidth / 2
      e.clientX > zero ? (direction = 'right') : (direction = 'left')
      coefficient = Math.abs(e.clientX - zero) / zero

      if (Math.abs(e.clientX - sx) > 3 || Math.abs(e.clientY - sy) > 3) {
        return
      }
      onchange(e)
    })

    // this._controls.addEventListener('control', () => {

    //     // fs()
    //     if (!noClick) noClick = true
    //     console.log("control", noClick);

    // })
    // this._controls.addEventListener('controlstart', () => {
    //     noClick = false
    //     console.log("controlstart", noClick);

    // })
    // this._controls.addEventListener('transitionstart', () => {
    //     // noClick=false
    //     console.log("transitionstart");

    // })
    // this._controls.addEventListener('rest', () => {
    //     // noClick=false
    //     console.log("rest",);

    // })
    // this._controls.addEventListener('wake', () => {
    //     // noClick=false
    //     console.log("wake",);

    // })
    // this._controls.addEventListener('sleep', () => {
    //     noClick = false
    //     console.log("sleep===========================",);

    // })

    // this._controls.addEventListener('controlend', () => {

    //     console.log("controlend", noClick);
    //     if (noClick) setTimeout(() => {

    //         noClick = false
    //         console.log("settiome", noClick);
    //     }, 0);

    // })
  }
  choicMaterial(material: MaterialParams | undefined) {
    if (!material) return
    console.log(material, 11111)
    const item = material.preview
    const cp = item?.position
    const cla = item?.lookAt
    const lookAt = new THREE.Vector3(cp?.x, cp?.y, cp?.z).lerp(
      new THREE.Vector3(cla?.x, cla?.y, cla?.z),
      this._lookatCameraSize,
    )
    this._controls.setLookAt(
      item?.position.x,
      item?.position.y,
      item?.position.z,
      lookAt.x,
      lookAt.y,
      lookAt.z,
      true,
    )
  }
  findMeshByInfoAttr(fn: (info: MaterialParams | undefined) => boolean) {
    return this._materials.find((item) => fn(item.info))
  }
  getMaterialCoordinateDirection(mesh: MeshDataExpand) {
    this._gui = []
    const info = mesh.info
    if (info) {
      const { lookAt, position } = info.preview
      const movableList: Array<'x' | 'y' | 'z'> = []
      for (let key in position) {
        const s = key as 'x' | 'y' | 'z'
        position[s] == lookAt[s] && movableList.push(s)
      }
      return movableList
    }
  }
  /**
   * @description: 环境光初始化
   * @return {*}
   */
  private envLightInit = () => {
    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 1.5)
    light.position.set(0, 0, 0)
    this.addScene(light)
    console.log('场景', this._scene)
    return light
  }
  /**
   * @description: 环境添加
   * @param {THREE} obj3d
   * @return {*}
   */
  addScene = (obj3d: THREE.Object3D) => {
    this._scene.add(obj3d)
  }
  removeScene = (obj3d: THREE.Object3D) => {
    this._scene.remove(obj3d)
  }
  clearMaterialInScene() {
    this._options.mode === 'edit' &&
      this._materials.forEach((item) => {
        this.removeScene(item)
      })
    this._materials = []
  }
  private controlsInit = () => {
    this.animate()
    this.thirdPerspective()
  }
  private animate = () => {
    this._renderer.render(this._scene, this._camera)
    this.controlAni()
    // this.controlObAni()
    requestAnimationFrame(this.animate)

    // this.controlObAni()
  }
  private controlObAni = () => {
    this._orbitControls?.update()
    this._renderer.render(this._scene, this._camera)
  }

  /**
   * @description: 控制器帧渲染函数
   * @return {*}
   */
  private controlAni = () => {
    // snip
    const delta = this._clock.getDelta()
    const hasControlsUpdated = this._controls.update(delta)
    // this._renderer.render(this._scene, this._camera)

    if (hasControlsUpdated) {
      this._renderer.render(this._scene, this._camera)
    }
    // this._renderer.render(this._scene, this._camera)
  }
  /**
   * @description: Mesh适配
   * @return {*}
   */
  private fitMesh(width: number, height: number) {
    const maxSize = this._options.maxSize

    if (maxSize) {
      if (width > maxSize && height > width) {
        height = (maxSize / width) * height
        width = maxSize
      } else {
        width = (maxSize / height) * width
        height = maxSize
      }
      console.log(width, height)
    }

    return { width, height }
  }
  private createMesh(
    width: number = 1,
    height: number = 1,
    z: number = 1,
    texture: THREE.Texture,
  ) {
    const geometry = new THREE.BoxGeometry(width, height, z)
    const material = new THREE.MeshBasicMaterial({ color: 0xeeeeee })
    const imgMaterial = new THREE.MeshBasicMaterial({ map: texture })
    const cube = new THREE.Mesh(geometry, [
      ...Array.from({ length: 5 }, (k, v) => material),
      imgMaterial,
    ])

    return { cube, geometry, material }
  }
  async loadMaterials(items: MaterialParams[]) {
    const textureLoader = new THREE.TextureLoader()
    items.forEach(async (item, index) => {
      const { url, id, position, scale, rotation } = item
      const texture = await textureLoader.loadAsync(url)
      const { width, height } = this.fitMesh(
        texture.image.width,
        texture.image.height,
      )
      const { cube } = this.createMesh(
        width,
        height,
        this._options.materialDepth,
        texture,
      )
      if (position) {
        cube.position.set(position.x, position.y, position.z)
      }
      if (scale) {
        const { x, y, z } = scale
        cube.scale.set(x, y, z)
      }
      if (rotation) {
        cube.rotateY(rotation)
      }
      Object.assign(cube, { info: item, infoIndex: index })

      this.addScene(cube)
      this._includes.push(cube)
      this._materials.push(cube)
    })

    // this._booths[1].material=imgMaterial
  }

  replaceMaterial = async (
    newItem: { id: string; url: string },
    uuid: string,
  ) => {
    const currentMesh = this.findMeshInScene(
      uuid,
    ) as THREE.Object3D<THREE.Event> & { info: MaterialParams }
    if (
      this._options.mode != 'edit' ||
      !currentMesh ||
      currentMesh.info.url === newItem.url
    )
      return
    const info = currentMesh.info
    this.removeScene(currentMesh)
    Object.assign(info, newItem)
    this.loadMaterials([info])
  }
  private findMeshInScene(uuid: string) {
    return this._scene.children.find((item) => item.uuid == uuid)
  }
  loadModel = async ({
    url,
    position,
    scale,
    callback,
    onProgress,
  }: ModelParams) => {
    const model = await this.loadGLTF({ url, onProgress })
    if (position) {
      model.position.set(position.x, position.y, position.z)
    }
    if (scale) {
      model.scale.set(scale.x, scale.y, scale.z)
    }
    console.log(model, '整体')

    this.addScene(model)
    this._includes.push(model.children[21])
    this._blockMeshs.push(model.children[22])
  }
  loadGLTF = ({ url, onProgress }: any) => {
    return new Promise<THREE.Object3D>((resolve, reject) => {
      const loader = new GLTFLoader().setPath('./model/')
      loader.load(
        url,
        (gltf) => {
          console.log(gltf, 'gltf')

          const model = gltf.scene //获得场景第一个模型

          resolve(model)
        },
        (progress) => {
          //进度
          onProgress(progress)
        },
      )
    })
  }

  pathAnimation = () => {}
}

export function parseJsonToVector(val: string): Vector {
  return JSON.parse(val) as Vector
}
