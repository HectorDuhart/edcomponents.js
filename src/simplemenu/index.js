import EDSimpleMenu from "./lib/EDSimpleMenu.js"

if(window.mobileMenu) {
    const MobileMenu = new EDSimpleMenu(window.mobileMenu)
    MobileMenu.render()
}