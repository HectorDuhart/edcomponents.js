import EDSvg from "eddom/src/dom/EDSvg.js"
import EDSvgRect from "eddom/src/dom/EDSvgRect.js"

export default class EDSvgMenu extends EDSvg {
    
    constructor(p) {
        p.viewBox = "0 0 103.7 88.9"
        p.append = [
            new EDSvgRect({
                width: "103.7",
                height: "19.5"
            }),
            new EDSvgRect({
                width: "103.7",
                height: "19.5",
                y: "34.7"
            }),
            new EDSvgRect({
                width: "103.7",
                height: "19.5",
                y: "69.4"
            })
        ]
                
        super(p)
    }
}