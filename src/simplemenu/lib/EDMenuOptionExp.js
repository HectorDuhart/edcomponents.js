import EDDiv from "eddom/src/dom/EDDiv.js"
import EDMenuOption from "./EDMenuOption.js"
import EDMenuContainer from "./EDMenuContainer.js"
import EDSvgExpDw from "../svg/EDSvgExpDw.js"

export default class EDMenuOptionExp extends EDMenuOption {
    
    openMenu() {
        this.isOpen = true
        this.svg.DOMElement.classList.add("EDRotate180")
        
        this.menuContainer.appendChild(
            new EDMenuContainer({
                isSubMenu: true,
                parent: this.menuContainer.DOMElement,
                entries: this.entries,
                isMobile: this.isMobile,
                menuEvent: this.menuEvent,
                store: (el) => {
                    this.subMenu = el
                }
            })
        )

        this.subMenu.render()
    }

    closeMenu() {

        if(this.isOpen) {
            
            this.isOpen = false
            this.svg.DOMElement.classList.remove("EDRotate180")
            this.subMenu.unrender()
        }
    }

    onClick() {
        
        this.menuEvent({
            type: "OpenSubMenu",
            name: this.name
        })

        if(this.isOpen) {
            return this.closeMenu()
        }

        this.closeAll()
        this.openMenu()
    }

    onMouseEnter() {
        this.onClick()
    }

    constructor(p) {

        super(p)

        this.entries = p.entries
        this.isOpen = false

        if(this.url) {

            this.entries = {}
            this.entries[this.url] = {
                name: this.name,
                url: this.url
            }
            
            Object.entries(p.entries).forEach(([url, entry]) => {
                
                this.entries[url] = entry
            })

        }

        this.class.push("EDMenuOptionExp")

        this.button.appendChild(
            new EDSvgExpDw({
                store: (el) => {
                    this.svg = el
                }
            })
        )

        this.appendChild(
            new EDDiv({
                store: (el) => {
                    this.menuContainer = el
                }
            })
        )

    }
}