import EDSvg from "eddom/src/dom/EDSvg.js"
import EDSvgPath from "eddom/src/dom/EDSvgPath.js"

export default class EDSvgExpDw extends EDSvg {
    
    constructor(p) {
        p.viewBox = "0 0 16 16"
        p.append = new EDSvgPath({
            d: `
                M3 5.5L8 10.5L13 5.5
            `
        })

        super(p)
    }
}