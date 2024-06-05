import EDSvg from "eddom/src/dom/EDSvg.js"
import EDSvgPath from "eddom/src/dom/EDSvgPath.js"

export default class EDSvgClose extends EDSvg {
    
    constructor(p) {
        p.viewBox = "0 0 64 64"
        p.append = new EDSvgPath({
            d: `
                M64 7.1L56.9 0 32 24.9 7.1 0 0 
                7.1 24.9 32 0 56.9 7.1 64 32 
                39.1 56.9 64l7.1-7.1L39.1 32 
                64 7.1z
            `
        })

        super(p)
    }
}