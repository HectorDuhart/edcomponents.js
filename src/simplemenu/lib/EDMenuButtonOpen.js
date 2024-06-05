import EDButton from "eddom/src/dom/EDButton.js"
import EDSvgMenu from "../svg/EDSvgMenu.js"

export default class EDMenuButtonOpen extends EDButton {
    constructor(p) {
        p.class = ["EDMenuButton", "EDMenuButtonOpen"]
        p.append = new EDSvgMenu({})
        super(p)
    }
}