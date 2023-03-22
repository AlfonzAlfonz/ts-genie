import { joinPath } from "../utils/joinPath.js";
import { BuilderBase } from "./BaseBuilder.js";

interface State {
	filename: string[];
}

export class ModulePathBuilder extends BuilderBase<State> {
	public constructor(filename: string) {
		super({
			filename: trimSegments(filename.split("/")),
		});
	}

	public fromRoot(path: string) {
		let result = joinPath(
			...[...new Array(this._state.filename.length - 1)].fill(".."),
			...trimSegments(path.split("/"))
		);
		if (!result.startsWith(".")) result = `./${result}`;
		return result;
	}
}

const trimSegments = (s: string[]) => s.filter((x) => x !== ".").filter(Boolean);
