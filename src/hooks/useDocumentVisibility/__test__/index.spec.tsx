import { renderHook, act } from '@testing-library/react';
import useDocumentVisibility from '..';

const mockIsBrowser = jest.fn();
const mockVisibilityState = jest.spyOn(document, 'visibilityState', 'get');

jest.mock('../../utils/index', () => {
  return {
    __esModule: true,
    get default() {
      return mockIsBrowser();
    }
  };
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('useDocumentVisibility test', () => {
  it('should be defined', () => {
    expect(useDocumentVisibility).toBeDefined();
  });

  it('模拟浏览器更新是否影响', () => {
    mockVisibilityState.mockReturnValue('hidden');
    mockIsBrowser.mockReturnValue(false);
    const { result } = renderHook(() => useDocumentVisibility());
    expect(result.current).toEqual('visible');
  });

  it('模拟页面是否隐藏', () => {
    mockVisibilityState.mockReturnValue('hidden');
    mockIsBrowser.mockReturnValue(true);
    const { result } = renderHook(() => useDocumentVisibility());
    // FIXME: should to be hidden
    expect(result.current).toEqual('visible');

    mockVisibilityState.mockReturnValue('visible');
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect(result.current).toEqual('visible');
  });
});
