export default function createFlushOption() {
  const flushed = {};

  return () => next => (action) => {
    const { type, meta = {}, ...reducedAction } = action;
    const { flush: shouldFlush, interval = 4500 } = meta;
    const keys = Object.keys(reducedAction);
    const now = Date.now();

    if (!shouldFlush) {
      return next(action);
    }

    if (!flushed[type]) {
      flushed[type] = { type, now };
    }

    keys.forEach((key) => {
      flushed[type][key] = flushed[type][key]
        ? [...flushed[type][key], reducedAction[key]]
        : [reducedAction[key]];
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        if (flushed[type]) {
          const { now: n, ...newAction } = flushed[type];

          delete flushed[type];

          resolve(next({
            ...newAction,
            type,
          }));
        }
      }, interval - (now - flushed[type].now));
    });
  };
}
