// import {Vector3} from 'three'
import { Pagination } from '../base/types'
export type RootStatus = '0' | '1' | '2' | '3' | '4'
export type Vector = { x: number; y: number; z: number }
export type Preview = {
  position: Vector
  lookAt: Vector
}
export type Options = {
  container: HTMLElement
  cameraHeight?: number
  cameraPosition?: Vector
  cameraLookAt?: Vector
  materialDepth?: number
  maxSize?: number
  debugMode: 0 | 1 | boolean
  mode: 'edit' | 'preview'
  beforeMove?: () => void
  viewportDeg?: 30 | 45 | 90 //30度 45度 90度
}
export type ModelParams = {
  url: string
  onProgress: (p: any) => void
  position?: Vector
  scale?: any
  callback?: any
}

export type MaterialParams = {
  position: Vector
  scale?: any
  rotation?: number
  url: string
  id: string
  preview: Preview
  materialId?: string
  materialName?: string
  areaStatus?: boolean
  areaIndex?: number
  exhibitionId?: string
  materialSource?: 'ART' | 'MATERIAL'
  onClick?: (item: MaterialParams, index: number, uuid: string) => void
}

export interface MateriaRespones {
  createBy: string
  createByName: any
  createTime: any
  updateBy: string
  updateByName: any
  updateTime: any
  rowsNo: any
  id: string
  exhibitionId: string
  materialId: string
  userId: string
  materialSource: string
  materialUrl: string
  position: string
  scale: string
  preview: string
  rotation: number
  star: boolean
  wish: boolean
  detail: MateriaDetail
}
export interface MateriaDetail {
  materialStatus: string
  materialUrl: string
  userPic: string
  materialDesc: string
  topFlag: string
  materialId: string
  userId: string
  categoryName: string
  content: string
  materialName: string
  style: string
  userNickName: string
  categoryId: string
  views: string
  height: number
  width: number
}
export interface Category {
  categoryId: string
  categoryName: string
  categoryAliasName: any
  categoryImg: any
  attributeList: any
}

export interface CommentParams {
  parentId?: string
  commentId?: string
  materialId: string
  mainId: string
  comment: string
}

export interface CommentQuery extends Pagination {
  objId: number | string
}

export interface CommentRespones {
  createBy: string
  createByName: any
  createTime: string
  updateBy: string
  updateByName: any
  updateTime: string
  rowsNo: any
  extra: Extra
  id: string
  parentId: any
  mainId: string
  likeNum: string
  content: string
  objId: string
  objType: string
  userId: string
  self: boolean
  star: boolean
  starCnt: number
}

export interface Extra {
  user: User
}

export interface User {
  id: string
  headImageUrl: string
  nickName: string
  name: string
}
