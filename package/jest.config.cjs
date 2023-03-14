module.exports = {
	roots: ["<rootDir>/src"],
	testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
	transform: {
		"^.+\\.(ts|tsx)$": ["ts-jest", { useESM: true }],
	},
	preset: "ts-jest",
	testEnvironment: "node",
	extensionsToTreatAsEsm: [".ts"],
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
};
