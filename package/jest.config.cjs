// @ts-check
/** @type {import("jest").Config} */
const config = {
	roots: ["<rootDir>/src"],
	extensionsToTreatAsEsm: [".ts"],
	preset: "ts-jest/presets/default-esm",
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
};

module.exports = config;
