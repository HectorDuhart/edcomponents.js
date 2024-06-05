import EDMenuButtonOpen from "./EDMenuButtonOpen.js"
import EDMenuButtonClose from "./EDMenuButtonClose.js"
import EDMenuContainer from "./EDMenuContainer.js"

export default class EDSimpleMenu {
    
    render() {
        if(this.isReady) {

            if(this.isMobile) {
                this.renderOpenButton()
                if(this.beginOpen) {
                    this.renderMenu()
                }
                return true
            }

            this.renderMenu()
            
        }
    }

    renderOpenButton() {
        this.button = new EDMenuButtonOpen({
            css: this.buttonCSS,
            parent: this.buttonLoc,
            onClick: (evt) => {
                this.renderMenu()
            }
        })

        this.button.render()
        
    }

    unrenderMenu() {
        this.fireEvent({
            type: "CloseMenu"
        })
        this.button.unrender()
        this.menuContainer.unrender()
        this.renderOpenButton()
    }

    renderMenu() {
        
        this.fireEvent({
            type: "OpenMenu"
        })

        if(this.button) {
            
            this.button.unrender()
        }
        
        this.menuContainer = new EDMenuContainer({
            parent: this.menuLoc,
            entries: this.entries,
            css: this.menuCSS,
            isMobile: this.isMobile,
            menuEvent: this.fireEvent
        })

        if(this.isMobile) {
            this.button = new EDMenuButtonClose({
                css: this.buttonCSS,
                parent: this.buttonLoc,
                onClick: (evt) => {
                    this.unrenderMenu()
                }
            })

            this.button.render()
        }

        this.menuContainer.render()
        
    }

    fireEvent(p) {
        const customEvent = new CustomEvent(
            "simple-menu", { detail: p }
        )

        document.dispatchEvent(customEvent)
    }

    constructor(p) {

        this.isReady = false
        this.isActive = (p.isActive == false) ? false : true
        this.beginOpen = p.beginOpen
        this.breakWidth = p.breakWidth ? p.breakWidth : 991
        this.isMobile = (window.innerWidth <= this.breakWidth)

        

        
        this.buttonCSS = `
            .EDMenuButton {
                border: 0;
                border-radius: .5em;
                padding: 0.5em;
                display: flex;
                align-items: center;
            }
            
            .EDMenuButton svg {
                width: 1.5em;
                height: 1.5em;
            }
        `

        this.menuCSS = `

            .EDMenuOptionButton svg {
                height: 1.5em;
                width: 1.5em;
                fill: inherit;
            }

            .EDMenuOptionButton span {
                color: inherit;
            }

            .EDRotate180 {
                transform: rotate(180deg);
            }
        `
        
        if(!this.isMobile) {
            this.menuCSS+= `

                .EDSimpleSubMenu {
                    position: absolute;
                }

                .EDMenuContainer {
                    margin-top: 1em;
                    list-style: none;
                    display: flex;
                    gap: 0.5em;
                }

                .EDMenuOptionButton {
                    background-color: inherit;
                    font-family: inherit;
                    border: 0;
                    border-radius: .5em;
                    padding: 1.5em 1em 1.5em 1em;
                    height: 2.5em;
                    display: flex;
                    align-items: center;
                    width: 100%;
                }

                .EDMenuOptionButton svg {
                    display: none;
                }

                .EDSubMenuContainer {
                    border-width: 1px;
                    border-style: solid;
                    box-shadow: 6px 6px 18px 0px rgba(0, 0, 0, 0.2);
                    list-style: none;
                    padding: 0.5em;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    position2: absolute;
                    margin-top: 1em;
                    gap: 0.5em;
                }

                .EDSubMenuContainer .EDMenuOption {
                    width: 100%;
                }
            `
        } else {
            this.menuCSS+= `
                .EDMenuContainer {
                    padding: 1em .5em 0em .5em;
                }

                .EDMenuContainer, .EDSubMenuContainer {
                    list-style: none;
                }

                .EDMenuContainer>.EDMenuOption {
                    border-top-width: 1px;
                    border-top-style: solid;
                }

                .EDMenuOptionButton {
                    background-color: inherit;
                    font-family: inherit;
                    border: 0;
                    padding: 1em;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .EDSubMenuContainer>.EDMenuOption {
                    padding-left: 1em;
                }
            `
        }

        if(this.isMobile) {
            this.buttonLoc = document.getElementById(p.mobile.buttonId)
            this.menuLoc = document.getElementById(p.mobile.menuId)
        } else {
            this.buttonLoc = "document.getElementById(p.desktop.buttonId)"
            this.menuLoc = document.getElementById(p.desktop.menuId)
        }

        if(
            this.isActive
            && this.buttonLoc
            && this.menuLoc
            && p.entries
            && (Object.keys(p.entries).length > 0)
        ) {
            this.entries = p.entries
            this.isReady = true
        }
    }
}