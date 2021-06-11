import { observable, action, runInAction } from 'mobx';

class SidebarStore {
  // private selectedIndex: number;

  // @observable itemData: SidebarItemType[];

  constructor() {
    // this.itemData = observable.array([
    //   {
    //     id: '0000535-dasdasd',
    //     name: '默认',
    //     selected: true,
    //   },
    //   {
    //     id: '0012535-xxxxasx',
    //     name: '游戏',
    //   },
    // ]);
  }

  @action
  addItem = () => {
    runInAction(() => {
      const item = {
        name: '新建分组',
        id: String(+Date.now()),
      };
    });
  };
}

const sidebarStore = new SidebarStore();
export { sidebarStore, SidebarStore };
