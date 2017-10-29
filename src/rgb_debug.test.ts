import { expect } from "chai";
import { Light } from "./ipso/light";
import { pointInTriangle } from "./lib/math";
import { values } from "./lib/object-polyfill";
import { conversions } from "./modules/conversions";
import { predefinedColors } from "./modules/predefined-colors";
// tslint:disable:no-unused-expression

describe.only("RGB debug =>", () => {

	const rawLight = {
		5706: "0",
		5707: 0,
		5708: 255,
		5709: 9647,
		5710: 17842,
		5711: 0,
		5850: 1,
		5851: 76,
		9003: 0,
	};
	const light = new Light().parse(rawLight).createProxy();

	it.only("debugs", () => {
		for (const prop of Object.keys(light)) {
			const isString = typeof light[prop] === "string";
			console.log(`${prop}: ${isString ? "'" : ""}${light[prop]}${isString ? "'" : ""}`);
		}
		// let {r, g, b} = conversions.rgbFromString("dcf0f8");
		// console.log({r, g, b});
		// const {x, y, Y} = conversions.rgbToCIExyY(r, g, b);
		// console.log({_x: x * 65279, _y: y * 65279});
		// console.log({x, y, Y});
		// ({r, g, b} = conversions.rgbFromCIExyY(x, y));
		// console.log({r, g, b});
		// const hex = conversions.rgbToString(r, g, b);
		// console.log(hex);
	});

});
