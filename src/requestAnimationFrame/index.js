import './style.css'
import { digitScroll } from "./script.js";
const { scrollStop, scrollResume, scrollReverse, scrollTo } =
  digitScroll("digit");
document.getElementById("stopBtn").addEventListener("click", () => {
  scrollStop();
});
document.getElementById("resumeBtn").addEventListener("click", () => {
  scrollResume();
});
document.getElementById("reverseBtn").addEventListener("click", () => {
  scrollReverse();
});
const input = document.getElementById("to");
document.getElementById("toBtn").addEventListener("click", () => {
  const value = input.value;
  scrollTo(value === "" ? undefined : +value);
});

