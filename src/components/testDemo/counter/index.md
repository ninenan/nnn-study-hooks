## 非 Dome 类 hooks

### renderHook

renderHook：顾名思义，这个函数就是用来渲染 Hooks，它会帮助我们解决 Hooks 只能在组件中使用的问题（生成一个专门用来测试的 TestComponent)。

用法：

```ts
function renderHook<Result, Props>(
  render: (props: Props) => Result,
  options?: RenderHookOptions<Props>
): RenderHookResult<Result, Props>;
```

入参：

render： callBack 函数，这个函数会在 TestComponent 每次被重新渲染的时候调用，所以这个函数放入我们想测试的 Hooks 就行；
options：可选的 options，有两个属性，分别是 initialProps 和 wrapper。
options 的参数：

initialProps：TestComponent 初始的 props；
wrapper：用来指定 TestComponent 的父级组件（Wrapper Component)，这个组件可以是一些 ContextProvider 等用来为 TestComponent 的 Hooks 提供测试数据的东西。
出参：renderHook，共返回三个参数，分别是：

result：结果，是一个对象结构，包含 current（保存 TestComponent 返回的 callback 值）和 error（所有错误存放的值）；
render：用来重新渲染 TestComponent，并且可以接受一个 newProps（参数）传递给 TestComponent；
unmount：用来卸载 TestComponent，主要用来覆盖一些 useEffect cleanup 函数的场景。

### act

act：这个函数和 React 自带的 test-utils 的 act 函数是同一个函数，通过这个函数，我们可以将所有会更新到组件状态的操作封装在它的 callback 下，简单来说，我们如果对 TestComponent 有操作，改变 result 的值，就需要放到 act 下。

### Demo

```ts
import useConunter from './index';
import { act, renderHook } from '@testing-library/react';

describe('useConuter 测试', () => {
  it('add + 1', () => {
    const { result } = renderHook(() => useConunter(9)); // useCounter 是自定义的 hook
    expect(result.current[0]).toEqual(9);

    // 执行自定义 hook 中的操作
    act(() => {
      result.current[1].add();
    });

    expect(result.current[0]).toEqual(10);
  });
});
```

## Dom 类 Hooks

### useEventListener

useEventListener：优雅地使用 addEventListener，帮助我们监听各种事件，如点击、键盘、滚动等。

分析：在 addEventListener 之上封装，也就是说这个钩子没有返参的情况，我们只需要考虑入参即可。

event 事件：需要告诉监听的是事件，如 click、keydown；
回调函数：监听后所执行的回调函数；
目标值：具体监听哪个节点的，还是全局的。
