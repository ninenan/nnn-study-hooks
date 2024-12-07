import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import useCreation from '../useCreation';
import useLatest from '../useLatest';

type TDate = dayjs.ConfigType;

export interface IFormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export interface IOptions {
  targetDate?: TDate; // 目标时间
  interval?: number; // 变化时间
  onEnd?: () => void; // 结束回调时间
  targetTime?: number; // 剩余时间，精确到秒
}

const calcRemain = (target?: TDate) => {
  if (!target) {
    return 0;
  }
  const remain = dayjs(target).valueOf() - Date.now();
  return remain < 0 ? 0 : remain;
};

const calcFormat = (milliseconds: number): IFormattedRes => {
  return {
    days: Math.floor(milliseconds / 86400000),
    hours: Math.floor(milliseconds / 3600000) % 24,
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
    milliseconds: Math.floor(milliseconds) % 100
  };
};

export default ({ targetDate, targetTime, onEnd, interval }: IOptions) => {
  const target = useCreation(() => {
    if (targetTime) {
      return targetTime > 0 ? Date.now() + targetTime : undefined;
    } else {
      return targetDate;
    }
  }, [targetTime, targetDate]);

  const [remainTime, setRemainTime] = useState(() => calcRemain(target));
  const onEndRef = useLatest(onEnd);

  useEffect(() => {
    if (!target) return setRemainTime(0);

    setRemainTime(calcRemain(target));

    const timer = setInterval(() => {
      const remain = calcRemain(target);

      setRemainTime(remain);

      if (remain === 0) {
        clearInterval(timer);
        onEndRef.current?.();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [target, interval]);

  const formattedTime = useCreation(() => calcFormat(remainTime), [remainTime]);

  return [remainTime, formattedTime] as const;
};
