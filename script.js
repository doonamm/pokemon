setInterval(createSnowFlake, Math.floor(Math.random()*100) + 70)

var isFullScreen = false;

document.addEventListener('dblclick', ()=>{
    if(!isFullScreen){
        document.documentElement.requestFullscreen();
    }
    else
        document.exitFullscreen();
    isFullScreen = !isFullScreen;
})

function createSnowFlake(){
    const snow_flake = document.createElement('i');
    const font_size = window.getComputedStyle(document.querySelector('.fa-snowflake')).getPropertyValue('font-size');

    snow_flake.classList.add('fas', 'fa-snowflake');

    const randomTime = Math.round(Math.random()*5) + 4;

    snow_flake.style.left = Math.random()*document.body.clientWidth + 'px';
    snow_flake.style.animationDuration = randomTime + 's';
    snow_flake.style.opacity = Math.random();
    snow_flake.style.fontSize = Math.round(Math.random()*10) - 5 + parseInt(font_size) + 'px';

    document.body.appendChild(snow_flake);
    console.log(document.body.offsetWidth);
    setTimeout(()=>{
        snow_flake.remove();
    }, randomTime*1000);
}