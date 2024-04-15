import * as THREE from 'three'
import { Options, ModelParams, MaterialParams } from '@/model/three/types'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import CameraControls from 'camera-controls';
import gsap from 'gsap'


//实例化
export class WSHall {
    _options: Options
    _renderer: THREE.WebGLRenderer
    _camera: THREE.PerspectiveCamera
    _scene: THREE.Scene
    _controls: CameraControls
    _clock: THREE.Clock
    _includes: Array<any>
    _blockMeshs: Array<THREE.Object3D<THREE.Event>>
    _lookatCameraSize: number
    _transformControls: TransformControls
    _orbitControls: OrbitControls
    _booths: any[]
    constructor(options: Options) {

        this._options = Object.assign({
            container: document.body,
            cameraPosition: { x: 0, y: 0, z: 0 },
            cameraHeight: 2,
            picDepth: 1,
            maxSize: 1,
            debugMode: 0,
            viewportDeg:30
        }, options)

        this._renderer = new THREE.WebGLRenderer({
            //抗锯齿 
            antialias: true,

        })
        this._includes = []
        this._booths = []

        this._clock = new THREE.Clock()
        this.renderInit()
        this._camera = new THREE.PerspectiveCamera(75, this._options.container.clientWidth / this._options.container.clientHeight, .1, 100000)
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

        this.initEvent()
        this._blockMeshs = []


    }
    private initTransFormControl() {
        this._transformControls.addEventListener('mouseUp', () => {
            this._controls.enabled = !false
        })
        this._transformControls.addEventListener('mouseDown', () => {
            console.log("按下");

            this._controls.enabled = false
        })
        this._transformControls.addEventListener('objectChange', () => {
            const { position, scale, rotation } = this._transformControls.object
            console.log(position);

        })

    }
    private createOrbitControls = () => {
        const oc = new OrbitControls(this._camera, this._renderer.domElement)
        this._camera.position.set(0, 20, 100);
        oc.enableDamping = true
        return oc
    }
    private createTransformControls = () => {
        const transformControls = new TransformControls(this._camera, this._renderer.domElement)
        transformControls.setSpace('local')
        this.addScene(transformControls)


        return transformControls
    }
    private cameraInit = () => {

        this._camera.position.set(15, 8, 0)


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
        const lookat = new THREE.Vector3(cp?.x, cp?.y, cp?.z).lerp(new THREE.Vector3(cla?.x, cla?.y, cla?.z), this._lookatCameraSize)

        this._controls.setLookAt(cp?.x, cp?.y, cp?.z, lookat?.x, lookat?.y, lookat?.z, true)
        // this._controls?.update()


    }
    /**
     * @description: 创建自定义控制器
     * @return {*}
     */
    private createCameraControls = () => {
        CameraControls.install({ THREE: THREE });
        return new CameraControls(this._camera, this._renderer.domElement);
    }
    private renderInit = () => {
        const { clientWidth, clientHeight } = this._options.container as HTMLElement
        this._renderer.setPixelRatio(window.devicePixelRatio)//像素比
        this._renderer.setSize(clientWidth, clientHeight)//宽高
        this._options.container.appendChild(this._renderer.domElement)
    }
    private sceneInit = () => {
        this.envLightInit()


        // this._scene.background = new THREE.Color(0xffffff);

        this.addScene(new THREE.AxesHelper(1000))
    }

    private initEvent() {
        //射线
        const raycaster = new THREE.Raycaster()
        const pointer = new THREE.Vector2()
        let startXY: any[] = []
        //方向
        let direction:'left'|'right'
        //转向系数
        let coefficient=0
 
         

        const onchange = (event: any) => {
            pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
            //射线计算
            raycaster.setFromCamera(pointer, this._camera)
            //计算交点
            const intersects = raycaster.intersectObjects(this._includes)
            console.log("点击", intersects[0]);
            if (this._blockMeshs.some(item => item.name === intersects[0]?.object.name)) return
            if (intersects[0].object.name === 'floor_floor_0') {
                const mesh = intersects[0]
                const v3 = mesh.point
                console.log(mesh);
                //坐标之间 cp---lookat--------cla
                this._controls.moveTo(Math.max(Math.min(v3.x, 999), -999), this._options?.cameraHeight ?? 1, Math.max(Math.min(v3.z, 999 / 2), -999 / 2), true)
                console.log(coefficient,direction);
                
                function getDeg(){
                    const   viewportDeg=this._options.viewportDeg
                    return     direction=='left'?viewportDeg*coefficient:-viewportDeg*coefficient
                }
                this._controls.rotate(  getDeg.apply(this) * THREE.MathUtils.DEG2RAD, 0, true )
            } else {
                const mesh = intersects[0]
                const v3 = mesh.point

                // console.log(mesh);
                const info=mesh.object.info as MaterialParams
                const item =info.preview 
                info?.onClick(info,)
                item&&this._controls.lookInDirectionOf(item?.lookAt.x,5,item?.lookAt.z,true)
                this._controls.setLookAt(item?.position.x,item?.position.y,item?.position.z,item?.lookAt.x,item?.lookAt.y,item?.lookAt.z,true)
                // item&&this._controls.moveTo(item.position.x,item.position.y,item.position.z, true).then(()=>{
                
                // })
            
           


            }
            if (intersects[0].object && this._options.debugMode) {
                this._transformControls.attach(intersects[0].object)
            }





        }
        this._options.container.addEventListener("mousedown", (e) => {
            startXY = [e.clientX, e.clientY]


        })
        this._options.container.addEventListener("mouseup", (e) => {
            const [sx, sy] = startXY
            const winWidth=window.innerWidth
            const zero=winWidth/2
            e.clientX>zero?(direction='right'):(direction='left')
            coefficient=Math.abs(e.clientX-zero)/zero
            
            
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
    /**
     * @description: 环境光初始化
     * @return {*}
     */
    private envLightInit = () => {
        // 环境光   
        const light = new THREE.AmbientLight(0xffffff, 1.5);
        light.position.set(0, 0, 0);
        this.addScene(light)
        console.log("场景", this._scene);
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
        const delta = this._clock.getDelta();
        const hasControlsUpdated = this._controls.update(delta);
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
            if (width > maxSize) {
                height = (maxSize / width) * height
                width = maxSize
            } else {
                width = (maxSize / height) * width
                height = maxSize
            }
            // console.log(width, height);

        }

        return { width, height }
    }
    private createMesh(width: number = 1, height: number = 1, z: number = 1, texture: THREE.Texture) {

        const geometry = new THREE.BoxGeometry(width, height, z);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        const imgMaterial = new THREE.MeshBasicMaterial({ map: texture })
        const cube = new THREE.Mesh(geometry, [
            ...Array.from({ length: 5 }, (k, v) => material),
            imgMaterial
        ])
        return { cube, geometry, material }
    }
    async loadMaterials(items: MaterialParams[]) {
        const textureLoader = new THREE.TextureLoader()
        items.forEach(async (item) => {
            const { url, id, position, scale, rotation } = item
            const texture = await textureLoader.loadAsync(url)
            console.log('texture', texture);


            const { width, height } = this.fitMesh(texture.image.width, texture.image.height)


            const { cube } = this.createMesh(width, height, this._options.picDepth, texture)
            if (position) {
                console.log('position', position);

                cube.position.set(position.x, position.y, position.z)
            }
            if (scale) {
                const { x, y, z } = scale
                cube.scale.set(x, y, z)
            }
            Object.assign(cube, { info: item })
            // if(rotation){
            //     cube.rotation.set(rotation)
            // }
            this._includes.push(cube)

            this.addScene(cube)

        })

        // this._booths[1].material=imgMaterial
    }

    replaceImg = async (item: THREE.Mesh) => {
        const textureLoader = new THREE.TextureLoader()
        const texture = await textureLoader.loadAsync('./img/WechatIMG35.jpeg')

        // texture.rotation=Math.PI
        console.log(item, '我的手');
        const imgMaterial = new THREE.MeshBasicMaterial({ map: texture })
        item.material = imgMaterial

        console.log(item, '我的手');



    }
    loadModel = async ({ url, position, scale, callback, onProgress }: ModelParams) => {
        const model = await this.loadGLTF({ url, onProgress })
        if (position) {
            model.position.set(position.x, position.y, position.z)
        }
        if (scale) {
            model.scale.set(scale.x, scale.y, scale.z)
        }
        console.log(model, '整体');
        this._booths = model.children.filter(item => {
            return item.name.includes("paintings")
        })
        console.log(this._booths);

        // this.replaceImg(this._booths[1])

        console.log(this._booths[1], 1233);

        this.addScene(model)
        this._includes.push(model.children[21])
        this._blockMeshs.push(model.children[22])

    }
    loadGLTF = ({ url, onProgress }: any) => {
        return new Promise<THREE.Object3D>((resolve, reject) => {
            const loader = new GLTFLoader().setPath('./model/')
            loader.load(url, gltf => {
                console.log(gltf, "gltf");

                const model = gltf.scene//获得场景第一个模型 


                resolve(model)
            }, progress => {//进度
                onProgress(progress)
            })
        })
    }

    pathAnimation=()=> {
        // const animationProgress = { value: 0 };

        // const cameraControls=this._controls
        // // gsap.fromTo(
        // //     animationProgress,
        // //     {
        // //         value: 0
        // //     },
        // //     {
        // //         value: 1,
        // //         duration: 3,
        // //         overwrite: true,
        // //         paused: true,
        // //         onUpdateParams: [animationProgress],
        // //         onUpdate({ value }) {

        // //             // if (!this.isActive()) return;

        // //             // curve.getPoint(value, _tmp);
        // //             const cameraX = _tmp.x;
        // //             const cameraY = _tmp.y;
        // //             const cameraZ = _tmp.z;
        // //             const lookAtX = 0;
        // //             const lookAtY = 0;
        // //             const lookAtZ = 0;

        // //             cameraControls.setLookAt(
        // //                 cameraX,
        // //                 cameraY,
        // //                 cameraZ,
        // //                 lookAtX,
        // //                 lookAtY,
        // //                 lookAtZ,
        // //                 false, // IMPORTANT! disable cameraControls's transition and leave it to gsap.
        // //             );

        // //         },
        // //         onStart() {

        // //             cameraControls.enabled = false;

        // //         },
        // //         onComplete() {

        // //             cameraControls.enabled = true;

        // //         },

        // //     }



        // // )

        // cameraControls.setLookAt( _tmp.x, _tmp.y, _tmp.z, 0, 0, 0, true );

    }


}