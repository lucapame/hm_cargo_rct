export interface WhereQuery extends Query {
  type: 'where';
  field: string;
  value: any;
  condition: string;
}

export interface OrderByQuery extends Query {
  type: 'orderBy';
  orderByField: string;
  orderDirection: 'asc' | 'desc';
}

export interface limitType {
  type: 'limit';
  number: number;
}

export interface srartEndAt {
  type: 'startAt' | 'endAt';
  value: number;
}

export interface Query {
  type: 'orderBy' | 'where' | 'limit' | 'startAt' | 'endAt';
}

export class WhereQuery implements WhereQuery {
  type: 'where' = 'where';
  field: string;
  value: any;
  condition: string;
  constructor(field: string, condition: any, value: any) {
    this.field = field;
    this.value = value;
    this.condition = condition;
  }
}

export class OrderByQuery implements OrderByQuery {
  type: 'orderBy' = 'orderBy';
  orderByField: string;
  orderDirection: 'asc' | 'desc';
  constructor(orderByField: string, orderDirection: 'asc' | 'desc') {
    this.type = 'orderBy';
    this.orderByField = orderByField;
    this.orderDirection = orderDirection;
  }
}

export class LimitQuery implements limitType {
  type: 'limit' = 'limit';
  number: number;
  constructor(number: number) {
    this.number = number;
  }
}

export class StartAtQuery implements srartEndAt {
  type: 'startAt' | 'endAt';
  value: number;
  constructor(type: 'startAt' | 'endAt', value: any) {
    this.type = type;
    this.value = value;
  }
}
