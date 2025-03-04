import {
  DanmuMsgTypeEnum,
  ILiveUser,
  WsMessageContentTypeEnum,
} from '@/interface';
import { ILiveRoom, LiveRoomTypeEnum } from '@/types/ILiveRoom';
import { IUser } from '@/types/IUser';

/** websocket连接状态 */
export enum WsConnectStatusEnum {
  /** 已连接 */
  connection = 'connection',
  /** 连接中 */
  connecting = 'connecting',
  /** 已连接 */
  connected = 'connected',
  /** 断开连接中 */
  disconnecting = 'disconnecting',
  /** 已断开连接 */
  disconnect = 'disconnect',
  /** 重新连接 */
  reconnect = 'reconnect',
  /** 客户端的已连接 */
  connect = 'connect',
}

/** websocket消息类型 */
export enum WsMsgTypeEnum {
  /** 用户进入聊天 */
  join = 'join',
  /** 用户进入聊天完成 */
  joined = 'joined',
  /** 用户进入聊天 */
  otherJoin = 'otherJoin',
  /** 用户退出聊天 */
  leave = 'leave',
  /** 用户退出聊天完成 */
  leaved = 'leaved',
  /** 当前所有在线用户 */
  liveUser = 'liveUser',
  /** 用户发送消息 */
  message = 'message',
  /** 房间正在直播 */
  roomLiving = 'roomLiving',
  /** 房间不在直播 */
  roomNoLive = 'roomNoLive',
  /** 获取在线用户 */
  getLiveUser = 'getLiveUser',
  /** 更新加入信息 */
  updateJoinInfo = 'updateJoinInfo',
  /** 心跳 */
  heartbeat = 'heartbeat',
  /** 开始直播 */
  startLive = 'startLive',
  /** 结束直播 */
  endLive = 'endLive',
  /** 直播pk秘钥 */
  livePkKey = 'livePkKey',
  /** 主播禁言用户 */
  disableSpeaking = 'disableSpeaking',
  /** 主播踢掉用户 */
  kick = 'kick',

  srsOffer = 'srsOffer',
  srsAnswer = 'srsAnswer',
  srsCandidate = 'srsCandidate',

  nativeWebRtcOffer = 'nativeWebRtcOffer',
  nativeWebRtcAnswer = 'nativeWebRtcAnswer',
  nativeWebRtcCandidate = 'nativeWebRtcCandidate',

  msrBlob = 'msrBlob',
  batchSendOffer = 'batchSendOffer',
}

/** 发送消息统一格式 */
export interface IReqWsFormat<T> {
  /** 消息id */
  request_id: string;
  /** 用户socket_id */
  socket_id: string;
  /** 用户信息 */
  user_info?: IUser;
  /** 用户token */
  user_token?: string;
  /** 消息时间戳 */
  time: number;
  data: T;
}

/** 接收消息统一格式 */
export interface IResWsFormat<T> {
  /** 消息id */
  request_id: string;
  /** 消息时间戳 */
  time: number;
  data: T;
}

export interface IWsFormat<T> {
  /** 消息id */
  request_id: string;
  /** 用户socket_id */
  socket_id: string;
  /** 用户信息 */
  user_info?: IUser;
  /** 用户token */
  user_token?: string;
  /** 消息时间戳 */
  time: number;
  data: T;
}

export type WsUpdateJoinInfoType = IWsFormat<{
  live_room_id: number;
  track?: { audio: number; video: number };
}>;

/** 直播pk秘钥 */
export type WSLivePkKeyType = IWsFormat<{
  live_room_id: number;
  key: string;
}>;

/** 获取在线用户 */
export type WSGetRoomAllUserType = IWsFormat<{
  liveUser: ILiveUser[];
}>;

/** 获取在线用户 */
export type WsGetLiveUserType = IWsFormat<{
  live_room_id: number;
}>;

/** 直播间正在直播 */
export type WsRoomLivingType = IWsFormat<{
  live_room: ILiveRoom;
  anchor_socket_id: string;
  socket_list?: string[];
}>;

/** 直播间没在直播 */
export type WsRoomNoLiveType = IResWsFormat<{ live_room_id: number }>;

export enum RemoteDeskBehaviorEnum {
  move,
  drag,
  pressButtonLeft,
  pressButtonRight,
  releaseButtonLeft,
  releaseButtonRight,
  setPosition,
  doubleClick,
  leftClick,
  rightClick,
  scrollDown,
  scrollUp,
  scrollLeft,
  scrollRight,

  keyboardType,
}

export type WsRemoteDeskBehaviorType = IWsFormat<{
  roomId: string;
  sender: string;
  receiver: string;
  type: RemoteDeskBehaviorEnum;
  x: number;
  y: number;
  keyboardtype: string | number;
}>;

export interface IDanmu {
  /** 消息类型 */
  msg_type: DanmuMsgTypeEnum;
  /** 消息内容类型 */
  content_type?: WsMessageContentTypeEnum;
  /** 消息内容 */
  content: string;
  live_room_id: number;
  redbag_send_id?: number;
  /** 消息id */
  msg_id?: number;
  isBilibili?: boolean;
}

/** ws消息 */
export type WsMessageType = IWsFormat<IDanmu>;

/** 禁言用户 */
export type WsDisableSpeakingType = IWsFormat<{
  request_id?: string;
  /** 被禁言用户socket_id */
  socket_id: string;
  /** 被禁言用户id */
  user_id: number;
  /** 直播间id */
  live_room_id: number;
  /** 禁言时长（单位：秒） */
  duration?: number;
  /** 禁言创建消息 */
  disable_created_at?: number;
  /** 禁言到期消息 */
  disable_expired_at?: number;
  /** 禁言成功 */
  disable_ok?: boolean;
  /** 解除禁言成功 */
  restore_disable_ok?: boolean;
  /** 是否正在禁言 */
  is_disable_speaking?: boolean;
  /** 是否解除禁言 */
  restore?: boolean;
}>;

/** 其他用户加入直播间 */
export type WsOtherJoinType = IWsFormat<{
  live_room_id: number;
  join_user_info?: IUser;
  join_socket_id: string;
  socket_list: string[];
}>;

/** 开始直播 */
export type WsStartLiveType = IWsFormat<{
  name: string;
  type: LiveRoomTypeEnum;
  /** 单位：毫秒 */
  msrDelay: number;
  /** 单位：毫秒 */
  msrMaxDelay: number;
}>;

/** 用户加入直播间 */
export type WsJoinType = IWsFormat<{
  live_room_id: number;
  live_room?: ILiveRoom;
  anchor_info?: IUser;
  isBilibili?: boolean;
  socket_list?: string[];
}>;

/** 用户离开直播间 */
export type WsLeavedType = IWsFormat<{
  socket_id: string;
  user_info?: IUser;
}>;

/** 心跳检测 */
export type WsHeartbeatType = IWsFormat<{
  live_room_id: number;
}>;

/** msr直播发送blob */
export type WsMsrBlobType = IWsFormat<{
  live_room_id: number;
  blob: any;
  blob_id: string;
  /** 单位：毫秒 */
  delay: number;
  /** 单位：毫秒 */
  max_delay: number;
}>;

export type WsStartRemoteDesk = IWsFormat<{
  sender: string;
  receiver: string;
  roomId: string;
}>;

export type WsBatchSendOffer = IWsFormat<{
  roomId: string;
  socket_list?: string[];
}>;

export type WsOfferType = IWsFormat<{
  live_room: ILiveRoom;
  sdp: any;
  sender: string;
  receiver: string;
  live_room_id: number;
}>;

export type WsAnswerType = IWsFormat<{
  sdp: any;
  sender: string;
  receiver: string;
  live_room_id: number;
}>;

export type WsCandidateType = IWsFormat<{
  live_room_id: number;
  candidate: RTCIceCandidate;
  receiver: string;
  sender: string;
}>;
