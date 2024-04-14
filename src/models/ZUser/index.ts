import Entity from '../Entity';

export default interface ZUser extends Entity {
  deviceId?: string; // 기기아이디
  deviceName?: string; // 기기이름
  email?: string; // 이메일
  password?: string; // 비밀번호
  nickname?: string; // 별명
  level?: number; // 레벨
  title?: string; // 칭호
}
