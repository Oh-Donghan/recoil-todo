import { atom, selector } from 'recoil';

export const enum Categories {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
});

export const categories = atom({
  key: 'categories',
  default: ['TO_DO', 'DOING', 'DONE'],
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      const savedCategories = localStorage.getItem('categories');
      if (savedCategories !== null) {
        setSelf(JSON.parse(savedCategories));
      }

      onSet((newCategories) => {
        localStorage.setItem('categories', JSON.stringify(newCategories));
      });
    },
  ],
})

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
  // 로컬스토리지에 저장
  effects_UNSTABLE: [
    // setSelf -> 로컬스토리지에서 toDo데이터를 불러와 toDoState의 초기값으로 설정
    // onSet -> toDoState가 변경될 때마다 변경된 toDo 데이터를 로컬 스토리지에 저장
    ({ setSelf, onSet }) => {
      const saveToDo = localStorage.getItem('todo');
      if (saveToDo !== null) {
        setSelf(JSON.parse(saveToDo));
      }

      onSet((newToDo) => {
        localStorage.setItem('todo', JSON.stringify(newToDo));
      });
    },
  ],
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
