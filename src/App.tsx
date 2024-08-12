import DemoHooks from '@/components/hooksDemo/DemoHooks';
import './App.css';
import Hello from './components/Hello';
import logo from './logo.svg';
// import DemoUseState from '@components/demo/DemoUseState';
// import DemoUseEffect from '@components/demo/DemoUseEffect';
// import DemoUseContext from '@components/demo/DemoUseContext';
// import DemoUseReducer from '@components/demo/DemoUseReducer';
// import DemoUseMemo from '@components/demo/DemoUseMemo';
// import DemoUseCallback from '@components/demo/DemoUseCallback';
// import DemoUseRef from '@components/demo/DemoUseRef';
// import DemoUseImperativeHandle from '@components/demo/DemoUseImperativeHandle';
// import DemoUseLayoutEffect from '@components/demo/DemoUseLayoutEffect';
// import DemoUseSyncExternalStore from '@components/demo/DemoUseSyncExternalStore';
// import DemoUseTransition from '@components/demo/DemoUseTransition';
// import DemoUseDeferredValue from '@components/demo/DemoUseDeferredValue';
// import DemoUseLatest from '@components/hooksDemo/DemoUseLatest';
// import DemoUseMount from '@components/demo/DemoUseMount';
// import DemoUseUnmountedRef from '@components/demo/DemoUseUnmountedRef';
// import DemoUseSafeState from '@components/demo/DemoUseSafeState';
// import DemoUseUpdate from '@components/demo/DemoUseUpdate';
// import DemoUseCreation from '@components/demo/DemoUseCreation';
// import DemoUseReactive from '@components/hooksDemo/DemoUseReactive';
// import DemoUseGetState from '@components/demo/DemoUseGetState';
// import DemoUseCountDown from '@components/hooksDemo/DemoUseCountDown';
// import DemoUseDebounceFn from '@components/hooksDemo/DemoUseDebounceFn';
// import DemoUseLockFn from '@components/hooksDemo/DemoUseLockFn';
import DemoForm from '@components/hooksDemo/DemoForm';
// import TestDemo from '@components/testDemo';
// import DemoUseTimeout from '@components/hooksDemo/DemoUseTimeout';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Hello message={'hello world'} />
        <DemoHooks />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <DemoForm />
      </header>
    </div>
  );
}

export default App;
