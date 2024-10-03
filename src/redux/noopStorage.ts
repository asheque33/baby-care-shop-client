import { Storage } from "redux-persist";

// redux/noopStorage.ts
const noopStorage: Storage = {
  getItem: () => Promise.resolve(null),
  setItem: () => Promise.resolve(),
  removeItem: () => Promise.resolve(),
};

export default noopStorage;
