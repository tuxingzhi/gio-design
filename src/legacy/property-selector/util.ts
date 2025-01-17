import { has } from 'lodash';
import { PropertyItem, PropertyTypes } from './interfaces';
import { Dimension } from './types';

type MapedType = 'usr' | 'event' | 'avar' | 'itm';
type TypeMapping = (input: Dimension) => PropertyItem;

type Mapper = {
  [key: string]: MapedType;
};

export const DimensionGroupTypeMapper: Mapper = {
  cs: 'event',
  ads: 'event',
  page: 'event',
  app: 'event',
  event: 'event',
  item: 'itm',
  people: 'event',
  visitor: 'event',
  element: 'event',
  conversion: 'event',
  user: 'usr',
  tag: 'usr',
  geo: 'avar',
  device: 'avar',
  origin: 'avar',
};

export const PropertyGroupOrder = [
  'event',
  'item',
  'page',
  'element',
  'app',
  'cs',
  'ads',
  'conversion',
  'people',
  'visitor',
  'geo',
  'device',
  'origin',
  'user',
  'tag',
];
const PreparedNormalDimensionIdMap = (id: string) => {
  const groupMap = {
    page: ['p', 'd', 'rp'], // 域名,页面,页面来源
    element: ['v', 'idx'], // ，元素内容，元素位置
    device: ['b', 'cv'], // 应用平台和app版本归属到-设备分类
  };
  if (groupMap.page.includes(id)) return ['page', '页面'];
  if (groupMap.element.includes(id)) return ['element', '无埋点事件属性'];
  return ['device', '设备'];
};

const regroup = (data: PropertyItem): PropertyItem => {
  const { isSystem, groupId, type, typeName } = data;
  let newType = type;
  let newTypeName = typeName;
  if (type === 'avar') {
    newType = 'event';
    newTypeName = PropertyTypes[newType];
  }

  let groupName = isSystem ? `预置${typeName}` : `自定义${typeName}`;
  if (groupId === 'tag') {
    groupName = '用户标签';
  }

  return {
    ...data,
    groupName,
    type: newType,
    typeName: newTypeName,
  } as PropertyItem;
};

// eslint-disable-next-line import/prefer-default-export
export const dimensionToPropertyItem: TypeMapping = (item: Dimension, locale = 'zh-CN') => {
  const result: PropertyItem = { label: item.name, value: item.id, ...item };
  const { id, groupId, type: _type, associatedKey } = item;

  result.iconId = groupId;

  if (groupId === 'normal' && _type === 'global') {
    const [newGroupId, newGroupName] = PreparedNormalDimensionIdMap(id);
    result.groupId = newGroupId;
    result.groupName = newGroupName;
    result.iconId = newGroupId;
  }

  const dimensionGroupType = DimensionGroupTypeMapper[result.groupId ?? 'event'];
  result.previewTypeName = PropertyTypes[dimensionGroupType === 'avar' ? 'event' : dimensionGroupType];

  // 多物品模型，物品属性不再作为事件绑定属性，而是作为事件属性的属性来展示，作为事件属性的子集
  // 所以，当存在parentId的时候，物品属性，和事件属性同组
  if (groupId === 'item' && _type === 'itm' && associatedKey) {
    result.iconId = 'item';
    result.groupId = 'event';
    result.previewTypeName = '维度表';
    if (locale === 'en-US') {
      result.groupName = 'event variable';
    }
    result.groupName = '事件变量';
  }

  // 虚拟属性需要添加到事件属性中，但是有自己的type和groupId，所以和维度表（多物品模型）做相同处理
  if (groupId === 'virtual' && _type === 'vvar') {
    result.iconId = 'virtual';
    result.groupId = 'event';
    result.groupName = '虚拟属性';
    result.previewTypeName = '虚拟属性';
  }

  const gOrder = PropertyGroupOrder.indexOf(result.groupId as string);
  result.groupOrder = gOrder > -1 ? gOrder : 99999;

  result.type = DimensionGroupTypeMapper[result.groupId || 'unkown'];
  result.typeName = PropertyTypes[result.type];
  const tOrder = ['event', 'avar', 'usr'].indexOf(result.type);
  result.typeOrder = tOrder > -1 ? tOrder : 99999;

  if (has(item, 'isSystem')) {
    return regroup(result);
  }
  return result;
};

export function getShortPinyin(word: string) {
  let idx = -1;
  const MAP = 'ABCDEFGHJKLMNOPQRSTWXYZ';
  const boundaryChar = '驁簿錯鵽樲鰒餜靃攟鬠纙鞪黁漚曝裠鶸蜶籜鶩鑂韻糳';

  if (!String.prototype.localeCompare) {
    return word[0];
  }

  return word
    .split('')
    .map((c) => {
      if (/[^\u4e00-\u9fa5]/.test(c)) {
        return c;
      }
      for (let i = 0; i < boundaryChar.length; i += 1) {
        if (boundaryChar[i].localeCompare(c, 'zh-CN-u-co-pinyin') >= 0) {
          idx = i;
          break;
        }
      }
      return MAP[idx];
    })
    .join('');
}
export function isPromise(obj: any) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function promisify<T = unknown>(func: Function) {
  return (...arg: any) =>
    new Promise<T>((resolve, reject) => {
      const res = func(...arg);
      if (isPromise(res)) {
        return res.then(resolve).catch(reject);
      }
      return resolve(res);
    });
}
