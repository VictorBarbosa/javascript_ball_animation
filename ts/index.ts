var div: HTMLDivElement, pos1: any, pos2: any, pos3: any, pos4: any;
const maxDown = 360
class Index {

    constructor() {
        div = <HTMLDivElement>document.getElementById('page1')
        if (div != null) {
            div.style.top = '360px'
            div.style.left = '165px'
            div.onmousedown = Index.prototype.dragMouseDown
        }
    }
    dragMouseDown(e: any) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = Index.prototype.closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = Index.prototype.elementDrag;
    }
    elementDrag(e: any) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        div.style.top = (div.offsetTop - pos2) + "px";
        div.style.left = (div.offsetLeft - pos1) + "px";
    }
    closeDragElement() {
        Index.prototype.goDowmElement()
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
    goDowmElement(goDown?: number) {
        goDown = goDown == null ? (div.offsetTop - pos2) : goDown
        let index = goDown
        let dowm = setInterval(() => {
            if (index < maxDown) {
                div.style.top = index + "px";
                index++
            }
            else {
                let newGoDown = goDown || 0
                if (newGoDown < 300) {
                    Index.prototype.goUpElement(newGoDown + 40)
                } else {
                    Index.prototype.goUpElement(newGoDown + 5)
                }
                clearInterval(dowm)
            }
        }, 1)
    }
    goUpElement(max: number) {
        let index = 360
        let _up = setInterval(() => {
            if (index > max) {
                div.style.top = index + "px";
                index--
            } else {

                if (max == 360) {
                    clearInterval(_up)
                } else {
                    clearInterval(_up)
                    Index.prototype.goDowmElement(max)
                }
            }
        }, 1)
    }
}
window.onload = () => { new Index(); }