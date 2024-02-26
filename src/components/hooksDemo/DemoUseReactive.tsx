import useReactive from '@/hooks/useReactive';
import { Button } from 'nnn-toy-ui';

const DemoUseReactive = () => {
  const state = useReactive({
    count: 0,
    name: 'nnn',
    flag: true,
    bugs: ['react', 'hook'],
    arr: [] as Array<string | number>,
    addArr(item: string | number) {
      this.arr.push(item);
    },
    get arrCount() {
      return this.arr.length;
    }
  });

  return (
    <>
      <div>基本使用</div>
      <div>count: {state.count}</div>
      <div>name: {state.name}</div>
      <div>flag: {JSON.stringify(state.flag)}</div>
      <div>arr: {JSON.stringify(state.arr)}</div>
      <div>arrCount: {state.arrCount}</div>
      <div>
        <p>count 操作</p>
        <Button onClick={() => state.count++}>count ++</Button>
        <Button onClick={() => state.count--}>count --</Button>
        <Button onClick={() => (state.count = 8)}>count === 8</Button>
      </div>
      <div>
        <p>name && flag 操作</p>
        <Button onClick={() => (state.name = 'xxx')}>name===xxx</Button>
        <Button onClick={() => (state.flag = !state.flag)}>
          {JSON.stringify(state.flag)}
        </Button>
      </div>
      <div>
        <p>数组操作</p>
        <Button onClick={() => state.arr.push(Math.floor(Math.random() * 100))}>
          push
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={() => state.arr.pop()}>
          pop
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={() => state.arr.shift()}>
          shift
        </Button>
        <Button
          style={{ marginLeft: 8 }}
          onClick={() => state.arr.unshift(Math.floor(Math.random() * 100))}
        >
          unshift
        </Button>
        <Button onClick={e => state.addArr(e.currentTarget.innerText)}>
          val
        </Button>
      </div>
    </>
  );
};

export default DemoUseReactive;
