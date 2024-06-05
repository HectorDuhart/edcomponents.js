export default class Carousel {
    
    moveToSlide(pId) {
        const currPosition = (this.slideWidth * (pId - 1))
        this.currentSlide = pId
        this.DOMElement.scrollLeft = currPosition

		this.setMapPointer(pId)
        if(this.onMove) {
            this.onMove(this.currentSlide)
        }
    }

    slideBackward() {
        
        if(this.currentSlide > 1) {
            this.moveToSlide(this.currentSlide - 1)
        }
    }

    slideForward() {
        if(this.currentSlide < this.slideCount) {
            this.moveToSlide(this.currentSlide + 1)
        }
    }

    initTouch() {

        this.touch = {
            startX: 0,
            startY: 0,
            threshold: 50,
            allowedTime: 800,
            startTime: 0
        }

        this.DOMElement.addEventListener("touchmove", (evt) => {

            const touchObj = evt.changedTouches[0]
            const distance = touchObj.pageX - this.touch.startX // get total dist traveled by finger while in contact with surface
            this.DOMElement.scrollLeft = this.DOMElement.scrollLeft - distance

        }, false)

        this.DOMElement.addEventListener("touchstart", (evt) => {
            const touchObj = evt.changedTouches[0]
            this.touch.startX = touchObj.pageX
            this.touch.startY = touchObj.pageY
            this.touch.startTime = new Date().getTime()
        }, false)

        this.DOMElement.addEventListener("touchend", (evt) => {

            const touchObj = evt.changedTouches[0]
            const distance = touchObj.pageX - this.touch.startX
            const elapsedTime = new Date().getTime() - this.touch.startTime

            if(
                (elapsedTime <= this.touch.allowedTime)
                && (Math.abs(distance) >= this.touch.threshold)
                && (Math.abs(touchObj.pageY - this.touch.startY) <= 100)
            ) {
                if(Math.sign(distance) > 0) {
                    return this.slideBackward()
                }
                return this.slideForward()
                
            }

            return this.moveToSlide(this.currentSlide)

            //evt.preventDefault()

        }, false)

    }

	setMapPointer(pId) {
		if(this.MAPElement) {
			for(var i = 0, len = this.MAPElement.children.length; i < len; i++) {
				this.MAPElement.children[i].classList.remove("TumbMapActive")
			}
			this.MAPElement.children[pId-1].classList.add("TumbMapActive")
		}
	}

	constructor(p) {

        this.onMove = p.onMove
        this.DOMElement = document.getElementById(p.id)
		this.MAPElement = document.getElementById(p.mapId)
        this.slideCount = this.DOMElement.children.length
        this.slideWidth = this.DOMElement.scrollWidth / this.slideCount // validate div by zero
        this.moveToSlide(1)

        this.initTouch()

    }
}
