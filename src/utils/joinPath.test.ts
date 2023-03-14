import { joinPath } from "./joinPath.js";

test("joinPath", () => {
	expect(joinPath()).toBe("");
	expect(joinPath("a")).toBe("a");
	expect(joinPath("a", "b")).toBe("a/b");
	expect(joinPath("a/", "b")).toBe("a/b");
	expect(joinPath("a", "/b")).toBe("a/b");
	expect(joinPath("a/", "/b/")).toBe("a/b/");
	expect(joinPath("/a", "b")).toBe("/a/b");
	expect(joinPath("", "a", "", "b", "")).toBe("a/b");
});
