const loadCount = () => {
  const count = localStorage['count'];
  const counter = document.getElementById('counter');
  counter.textContent = count;
  counter.classList.toggle('minus', count < 0);
}

const addCount = (diff) => {
  localStorage['count'] = +(localStorage['count'] || 0) + diff;
  localStorage['time'] = Date.now();
  loadCount();
}

const setCount = (count) => {
  localStorage['count'] = count;
  localStorage['time'] = Date.now();
  loadCount();
}

window.addEventListener('DOMContentLoaded', e => {
  if (!localStorage['count']) localStorage['count'] = 0;
  if (!localStorage['time']) localStorage['time'] = Date.now();
  loadCount();

  document.getElementById('add').addEventListener('click', e => addCount(+1));
  document.getElementById('sub').addEventListener('click', e => addCount(-1));
  document.getElementById('set').addEventListener('click', e => {
    const count = parseInt(prompt('Set count to: ')) || 0;
    setCount(count);
  });
  document.getElementById('reset').addEventListener('click', e => {
    if (confirm('Reset Count?')) setCount(0);
  });

  setInterval(() => {
    const time = +localStorage['time'];
    let ss = Math.floor((Date.now() - time) / 1000);
    let hh = Math.floor(ss / 3600);
    ss %= 3600;
    let mm = Math.floor(ss / 60).toString().padStart(2, 0);
    ss = (ss % 60).toString().padStart(2, 0);
    document.getElementById('time').textContent = `${hh}:${mm}:${ss}`
  }, 100);
});