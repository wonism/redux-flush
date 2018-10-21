import { CLICK_EVENT } from './actionTypes';

export default (state = {}, { type, ...action }) => {
  if (type === CLICK_EVENT) {
    return {
      ...state,
      num: action.num,
      rand: [...state.rand, ...action.rand],
    };
  }

  return state;
};
