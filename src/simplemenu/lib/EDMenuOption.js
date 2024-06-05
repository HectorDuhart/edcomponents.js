import EDLI from "eddom/src/dom/EDLI.js"
import EDButton from "eddom/src/dom/EDButton.js"
import EDSpan from "eddom/src/dom/EDSpan.js"

export default class EDMenuOption extends EDLI {
    
    onClick() {
        
        this.menuEvent({
            type: "LinkClick",
            name: this.name,
            url: this.url
        })

        if(this.url) {
            window.location.href = this.url
        }
        
    }

    onMouseEnter() {
       this.closeAll() 
    }

    closeMenu() {

    }

    constructor(p) {
        p.class = "EDMenuOption"
        super(p)
        this.closeAll = p.closeAll
        this.isMobile = p.isMobile
        this.url = p.url
        this.name = p.name
        this.menuEvent = p.menuEvent

        
        if(!this.isMobile) {
            this.addEvent("mouseenter", (evt) => {
                this.onMouseEnter()
            })
        }

        this.appendChild(
            new EDButton({
                class: "EDMenuOptionButton",
                store: (el) => {
                    this.button = el
                },
                append: [
                    new EDSpan({
                        text: this.name
                    })
                ],
                onClick: (evt) => {
                    this.onClick(this.url)
                }
            })
        )
    }
}