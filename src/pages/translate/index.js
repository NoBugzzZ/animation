import "./index.css";

const ul = document.querySelector("#digit>ul");
const lis = document.querySelectorAll("#digit>ul>li");
ul.appendChild(lis[0].cloneNode(true));
const liHeight = lis[0].offsetHeight;
const liCount = lis.length + 1;
const intervalPerLI = 500;
const animationPerLI = 500;
const intervalPerStep = 10;
const times = Math.floor(animationPerLI / intervalPerStep);

let i = 1;
setInterval(() => {
  slide(i++);
  i = i % liCount;
  i = i == 0 ? 1 : i;
}, intervalPerLI + animationPerLI);
let timer = null;
function slide(index) {
  clearInterval(timer);
  const currentOffsetTop = (-(index - 1 + liCount) % liCount) * liHeight;
  ul.style.transform = `translateY(${
    (-(index - 1 + liCount) % liCount) * liHeight
  }px)`;
  const targetOffsetTop = -liHeight * index;
  const totalLen = targetOffsetTop - currentOffsetTop;
  const step = totalLen / times;
  let count = 1;
  timer = setInterval(() => {
    ul.style.transform = `translateY(${currentOffsetTop + step * count++}px)`;
    if (count > times) {
      ul.style.transform = `translateY(${targetOffsetTop}px)`;
      clearInterval(timer);
    }
  }, intervalPerStep);
}
