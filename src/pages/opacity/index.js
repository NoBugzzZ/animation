import './index.css'

const ul = document.querySelector("#digit>ul");
const lis = document.querySelectorAll("#digit>ul>li");
lis[0].style.opacity = 1;

const liCount = lis.length;
const intervalPerLI = 1000;
const animationPerLI = 500;
const intervalPerStep = 10;
const step = 1 / (animationPerLI / intervalPerStep);
const intervals = Array.from({ length: liCount });

let i = 0;
setInterval(() => {
  slide(i++);
  i = i % liCount;
}, animationPerLI + intervalPerLI);

function slide(index) {
  const preIndex = index;
  const postIndex = (index + 1) % liCount;
  clearInterval(intervals[(index - 1 + liCount) % liCount]);
  clearInterval(intervals[index]);
  // console.log(`${(index - 1+liCount) % liCount}:${lis[(index - 1+liCount) % liCount].style.opacity}; ${index}:${lis[index].style.opacity}`)
  lis[(index - 1 + liCount) % liCount].style.opacity = 0;
  // console.log(`${(index - 1+liCount) % liCount}:${lis[(index - 1+liCount) % liCount].style.opacity}; ${index}:${lis[index].style.opacity}`)
  intervals[preIndex] = setInterval(() => {
    lis[preIndex].style.opacity -= step;
    if (lis[preIndex].style.opacity <= 0) {
      clearInterval(intervals[preIndex]);
      lis[preIndex].style.opacity = 0;
    }
  }, intervalPerStep);

  intervals[postIndex] = setInterval(() => {
    lis[postIndex].style.opacity = +lis[postIndex].style.opacity + step;
    if (lis[postIndex].style.opacity >= 1) {
      clearInterval(intervals[postIndex]);
      lis[postIndex].style.opacity = 1;
    }
  }, intervalPerStep);
}
