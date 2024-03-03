import Entity from './Entity';

export default class EntityListClass<T extends Entity> {
  entityList?: T[];

  constructor(entityList: T[]) {
    this.entityList = entityList;
  }

  get() {
    return this.entityList;
  }

  findByFid(fid?: string) {
    return this.entityList?.find(entity => entity?.fid === fid);
  }

  remove(fid?: string) {
    if (!fid) {
      throw new Error('fid 값이 존재하지 않습니다.');
    }
    if (this.entityList && this.entityList?.length >= 0) {
      const index = this.entityList?.findIndex(entity => entity.fid === fid);
      this.entityList[index].delYn = 'Y';
      return this.entityList;
    } else {
      throw new Error('데이터가 존재하지 않습니다.');
    }
  }
}
