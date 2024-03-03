export default interface Entity {
  fid?: string; // Firebase Primary Key
  id?: number; // RDBMS Primary Key
  regDate?: number; // 등록일 (millisecond)
  modDate?: number; // 수정일 (millisecond)
  delYn?: string; // 삭제여부 ('Y'/'N')
}
