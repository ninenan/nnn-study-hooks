import useUpdate from '@/hooks/useUpdate';
import { Button } from 'nnn-toy-ui';

function DemoUseUpdate() {
  const update = useUpdate();

  return (
    <div>
      <div>time: {Date.now()}</div>
      <Button btnType="warning" onClick={() => update()}>
        update
      </Button>
    </div>
  );
}

export default DemoUseUpdate;
