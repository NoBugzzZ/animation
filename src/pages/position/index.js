import './index.css'

const ul = document.querySelector("#digit>ul");
const lis = document.querySelectorAll("#digit>ul>li");
ul.appendChild(lis[0].cloneNode(true));
const liHeight = lis[0].offsetHeight;
const liCount = lis.length + 1;
const intervalPerLI = 1000;
const animationPerLI = 1000;
const intervalPerStep = 10;
const times = animationPerLI / intervalPerStep;

let i = 1;
setInterval(() => {
  slide(i++);
  i = i % liCount;
  i = i == 0 ? 1 : i;
}, intervalPerLI + animationPerLI);
let timer = null;
function slide(index) {
  clearInterval(timer);
  ul.style.top = `${(-(index - 1 + liCount) % liCount) * liHeight}px`;
  console.log(
    `${(index - 1 + liCount) % liCount}:${-+ul.offsetTop / liHeight}`
  );
  const currentOffsetTop = ul.offsetTop;
  const targetOffsetTop = -liHeight * index;
  const totalLen = targetOffsetTop - currentOffsetTop;
  const step = totalLen / times;
  let count = 1;
  timer = setInterval(() => {
    ul.style.top = `${currentOffsetTop + step * count++}px`;
    if (ul.offsetTop < targetOffsetTop) {
      ul.style.top = `${targetOffsetTop}px`;
      clearInterval(timer);
    }
  }, intervalPerStep);
}
