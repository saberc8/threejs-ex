import type {RootStatus,Vector} from './types'


  export interface TemplateRespones {
    createBy: string
    createByName: any
    createTime: string
    updateBy: string
    updateByName: any
    updateTime: string
    rowsNo: any
    extra: Extra
    id: string
    roomNo: string
    roomName: string
    roomStatus: RootStatus
    auditStatus: string
    roomType: string
    roomCategory: string
    roomDesc: string
    topicPic: string
    period: string
    roomStart: string
    roomEnd: string
    location: {
      address:string
      statesId:string
      statesName:string
    }
    sponsor: string
    curator: string
    exhibitor: string
    evaluate: string
    publicFlag: boolean
    bgmusic: string
    userId: string
    views: number
    areaNum: any
    materialNum: number
    commentsNum: any
    templateId: string
    templateVo: TemplateVo
    materialVos: MaterialVo[]
    self: boolean
  }
  
  export interface Extra {
    colls: number
    comments: number
    wishlist: number
    views: number
    guide: boolean
  }
  
  export interface TemplateVo {
    createBy: string
    createByName: any
    createTime: any
    updateBy: string
    updateByName: any
    updateTime: any
    rowsNo: any
    id: string
    tempNo: string
    tempName: string
    tempStatus: string
    tempDesc: string
    tempType: string
    tempPic: string
    tempModel: string
    tempMap: any
    tempUrl: any
    areaNum: number
    position: any
    scale: any
    envVo: EnvVo
    areaVos: AreaVo[]
    envId: string
    
  }
  
  export interface EnvVo {
    createBy: string
    createByName: any
    createTime: string
    updateBy: string
    updateByName: any
    updateTime: any
    rowsNo: any
    id: string
    envNo: string
    envName: string
    debugMode: number
    container: any
    cameraLookAt: string
    cameraPosition: string
    cameraHeight: number
    maxSize: number
    materialDepth: number
    viewportDeg: number
  }
  
  export interface MaterialVo {
    createBy: string
    createByName: any
    createTime: any
    updateBy: string
    updateByName: any
    updateTime: any
    rowsNo: any
    id: string
    areaVo: AreaVo
    exhibitionId: string
    materialId: string
    userId: string
    materialSource:  "ART" | "MATERIAL"
    materialUrl: string
    position: Position
    scale: Scale
    preview: Preview
    rotation: number
    star: boolean
    wish: boolean
    detail: Detail
  }
  
  export type Position =Vector
  
  export type Scale = Vector
  export interface Preview {
    position: Position2
    lookAt: LookAt
  }
  export interface AreaVo {
    createBy: string
    createByName?: any
    createTime?: any
    updateBy: string
    updateByName?: any
    updateTime: string
    rowsNo?: any
    id: string
    templateId: string
    areaNo: string
    areaIndex: number
    areaName: string
    areaStatus: boolean
    areaDesc?: any
    areaType: string
    areaPic: string
    rotation: number
    scale: Vector
    position: Vector
    preview: Preview
  }
  
  export type Position2 =Vector
  export interface LookAt {
    x: number
    y: number
    z: number
  }
  
  export interface Detail {
    materialStatus: string
    materialUrl: string
    tinge: any
    materialNo?: string
    materialDesc: string
    materialId: string
    userId: string
    content: string
    scene: any
    materialName: string
    width: any
    style: string
    categoryId: string
    views: string
    height: any
    topFlag?: string
    userNickName: string
  }
  
