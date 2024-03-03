import Entity from './Entity';

export default class EntityClass<T extends Entity> {
  entity?: T;

  constructor(entity: T) {
    this.entity = entity;
  }

  get() {
    return this.entity;
  }

  remove() {
    if (this.entity?.delYn === 'N') {
      this.entity.delYn = 'Y';
    }
    return this.entity;
  }
}
