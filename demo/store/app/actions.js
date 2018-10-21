import { CLICK_EVENT } from './actionTypes';

export const handleClick = num => ({
  type: CLICK_EVENT,
  num,
  rand: Math.floor(Math.random() * 10) + 1,
  meta: {
    flush: true,
    interval: 1000,
    omitKey: ['num'],
  },
});
