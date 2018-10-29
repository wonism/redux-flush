export default function createFlushOption() {
  const flushed = {};

  return () => next => (action) => {
    const { type, meta = {}, ...reducedAction } = action;
    const { flush: shouldFlush, interval = 400, omitKey = [], buncher = '' } = meta;
    const keys = Object.keys(reducedAction);
    const now = Date.now();

    if (!shouldFlush) {
      return next(action);
    }

    if (!flushed[`${type}${buncher}`]) {
      flushed[`${type}${buncher}`] = { type, now };
    }

    keys.forEach((key) => {
      if (omitKey.includes(key)) {
        flushed[`${type}${buncher}`][key] = reducedAction[key];
      } else {
        flushed[`${type}${buncher}`][key] = flushed[`${type}${buncher}`][key]
          ? [...flushed[`${type}${buncher}`][key], reducedAction[key]]
          : [reducedAction[key]];
      }
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        if (flushed[`${type}${buncher}`]) {
          const { now: n, ...newAction } = flushed[`${type}${buncher}`];

          delete flushed[`${type}${buncher}`];

          resolve(
            next({
              ...newAction,
              type,
            })
          );
        }
      }, interval - (now - flushed[`${type}${buncher}`].now));
    });
  };
}
