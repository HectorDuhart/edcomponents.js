import EDButton from "eddom/src/dom/EDButton.js"
import EDSvgClose from "../svg/EDSvgClose.js"

export default class EDMenuButtonClose extends EDButton {
    constructor(p) {
        p.class = ["EDMenuButton", "EDMenuButtonClose"]
        p.append = new EDSvgClose({})
        super(p)
    }
}