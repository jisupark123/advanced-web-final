// 식재료 보관 장소
// 냉동실, 냉장고, 실온

type StorageArea = 'freezer' | 'fridge' | 'roomTemp';

export function isStorageAreaType(a: string): a is StorageArea {
  return ['freezer', 'fridge', 'roomTemp'].includes(a);
}

type StorageAreaMapping = {
  [key in StorageArea]: string;
};

export const storageAreaMapping: StorageAreaMapping = {
  freezer: '냉동실',
  fridge: '냉장고',
  roomTemp: '실온',
};

export default StorageArea;
