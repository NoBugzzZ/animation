export function digitScroll(id = '') {
    const list = Array.from({ length: 10 }, (_, index) => index);
    list.splice(0, 0, list[list.length - 1]);
    list.push(list[1]);

    const ul = document.createElement('ul');
    list.forEach((v) => {
        const li = document.createElement('li');
        li.innerText = v;
        ul.appendChild(li);
    })
    const digitContainer = document.getElementById(id);
    digitContainer.appendChild(ul);

    const liHeight = document.querySelector(`#${id}>ul>li`).offsetHeight;
    document.querySelector(`#${id}>ul`).style.top = `${-liHeight}px`;

    const liCount = list.length;
    const intervalPerLI = 1000;
    const animationPerLI = 1000;

    let i = 1;
    let stop = false;
    let direction = 1; //1为从上向下滚动,-1相反
    let timer = setTimeout(callback, intervalPerLI);
    let to = -1;
    let inUse = false;
    function callback() {
        inUse = true;
        const _direction = direction;
        const _to = to;
        animate((fraction) => {
            return fraction;
        }, (progress) => {
            ul.style.top = `${-i * liHeight - progress * liHeight * _direction}px`
        }, animationPerLI, () => {
            i = (i + 1 * _direction + liCount) % liCount;
            if (_direction === 1) {
                if (i === liCount - 1) {
                    ul.style.top = -liHeight;
                    i = 1;
                }
            } else if (_direction === -1) {
                if (i === 0) {
                    ul.style.top = -(liCount - 2) * liHeight;
                    i = liCount - 2;
                }
            }
            if (!stop) {
                timer = setTimeout(callback, intervalPerLI);
            } else {
                if (i !== _to && _to !== -1) {
                    timer = setTimeout(callback, intervalPerLI);
                } else if (_to !== -1) {
                    to = -1;
                }
            }
            inUse = false;
        })
    }
    function animate(timing = () => { }, draw = () => { }, duration, stopCallback = () => { }) {
        const start = performance.now();
        const requestID = requestAnimationFrame(function callback(time) {
            let fraction = (time - start) / duration;
            fraction = fraction > 1 ? 1 : fraction;
            const progress = timing(fraction);
            draw(progress);
            if (fraction < 1) {
                requestAnimationFrame(callback);
            } else {
                stopCallback();
            }
        });
    }
    function scrollStop() {
        clearTimeout(timer);
        stop = true;
        console.log("stop")
    }
    function scrollResume() {
        if (stop) {
            stop = false;
            timer = setTimeout(callback, intervalPerLI)
        }
    }
    function scrollReverse() {
        direction = -direction;
        console.log(`reverse,direction=${direction}`)
    }
    function scrollTo(value) {
        scrollStop();
        if (Number.isInteger(value)) {
            const _value = +value;
            if (_value <= 0 || _value >= liCount - 1 || i === _value) return;
            clearTimeout(timer);
            to = _value;
            if (!inUse) {
                timer = setTimeout(callback, intervalPerLI);
            } else {
                const interval = setInterval(() => {
                    if (!inUse) {
                        timer = setTimeout(callback, intervalPerLI);
                        clearInterval(interval);
                    }
                }, intervalPerLI / 10)
            }

        }

    }

    return {
        scrollStop,
        scrollResume,
        scrollReverse,
        scrollTo,
    }
}