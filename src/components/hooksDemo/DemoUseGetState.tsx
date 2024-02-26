import useGetState from '@hooks/useGetState';
import { Button } from 'nnn-toy-ui';

function DemoUseGetState() {
  const [val, setState, getState] = useGetState(3);

  return (
    <div>
      <p>val: {val}</p>
      <Button
        onClick={() =>
          setState(() => {
            let nextVal = val;
            return ++nextVal;
          })
        }
      >
        add
      </Button>
      <div>getState:{getState()}</div>
    </div>
  );
}

export default DemoUseGetState;
