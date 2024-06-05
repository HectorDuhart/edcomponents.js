import EDUL from "eddom/src/dom/EDUL.js"
import EDDiv from "eddom/src/dom/EDDiv.js"
import EDMenuOption from "./EDMenuOption.js"
import EDMenuOptionExp from "./EDMenuOptionExp.js"

export default class EDMenuContainer extends EDDiv {
    
    closeMenu() {
        this.entriesContainer.children.forEach((el) => {
            el.closeMenu()
        })
    }

    afterRender() {

        if(!this.isSubMenu) {
            const bcolor = window.getComputedStyle(this.DOMElement).getPropertyValue("background-color");
            window.simpleMenuColor = bcolor
        }
        
        
        if(this.isSubMenu) {
            this.entriesContainer.DOMElement.style.setProperty('background-color', window.simpleMenuColor);
        }
    }

    constructor(p) {
        
        super(p)
        this.class.push("EDSimpleMenu")
        this.entries = p.entries
        this.isMobile = p.isMobile
        this.isSubMenu = p.isSubMenu ? p.isSubMenu : false 
        this.menuEvent = p.menuEvent

        const menuClass = this.isSubMenu ? "EDSubMenuContainer" : "EDMenuContainer"

        this.appendChild(
            new EDUL({
                class: menuClass,
                store: (el) => {
                    this.entriesContainer = el
                }
            })
        )

        if(this.isSubMenu) {
            this.class.push("EDSimpleSubMenu")
        }

        if(!this.isMobile) {
            this.entriesContainer.addEvent("mouseleave", (evt) => {
                this.closeMenu()
            })
        }

        Object.entries(this.entries).forEach(([url, entry]) => {

            if(entry.entries) {
                this.entriesContainer.appendChild(
                    new EDMenuOptionExp({
                        name: entry.name,
                        url: entry.url,
                        entries: entry.entries,
                        isMobile: this.isMobile,
                        menuEvent: this.menuEvent,
                        closeAll: () => {
                            this.closeMenu()
                        }
                    })
                )

            } else {
                this.entriesContainer.appendChild(
                    new EDMenuOption({
                        name: entry.name,
                        url: entry.url,
                        isMobile: this.isMobile,
                        menuEvent: this.menuEvent,
                        closeAll: () => {
                            this.closeMenu()
                        }
                    })
                )
            }
            
        })
    }
}