document.getElementById("touch-demo").addEventListener("touchstart", (event, dom)=>{
    event.srcElement.classList.add("animation-rotate")
})
document.getElementById("touch-demo").addEventListener("touchend", (event, dom)=>{
    event.srcElement.classList.remove("animation-rotate")
})
