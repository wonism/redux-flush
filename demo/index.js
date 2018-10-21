import store from './store';
import * as appActions from './store/app/actions';

store.subscribe(() => {
  const state = store.getState();
  const { num, rand } = state.app;

  document.getElementById('number').textContent = num;
  document.getElementById('random').textContent = rand.join(', ');
});

{
  let num = 0;

  document.querySelector('button').addEventListener('click', () => {
    store.dispatch(appActions.handleClick(num));
    num += 1;
  });
}
