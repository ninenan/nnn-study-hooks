import { Button } from 'nnn-toy-ui';
import { useSyncExternalStore } from 'react';
import { combineReducers, createStore } from 'redux';

// https://zh-hans.react.dev/reference/react/useSyncExternalStore
const reducer = (count = 1, action: { type: string }) => {
  switch (action.type) {
    case 'ADD':
      return count + 1;
    case 'DEL':
      return count - 1;
    default:
      return count;
  }
};

// 注册 reducer，并创建 store
const rootReducer = combineReducers({ count: reducer });
const store = createStore(rootReducer, { count: 2 });

function DemoUseSyncExternalStore() {
  const state = useSyncExternalStore(
    store.subscribe,
    () => store.getState().count
  );

  return (
    <div>
      <div>数据源: {state}</div>
      <Button btnType="primary" onClick={() => store.dispatch({ type: 'ADD' })}>
        ADD + 1
      </Button>
      <br />
      <Button btnType="primary" onClick={() => store.dispatch({ type: 'DEL' })}>
        DEL + 1
      </Button>
    </div>
  );
}

export default DemoUseSyncExternalStore;
