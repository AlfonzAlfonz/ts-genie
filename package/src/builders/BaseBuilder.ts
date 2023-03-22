export abstract class BuilderBase<State = unknown> {
	public _state: State;

	constructor(state: State) {
		this._state = state;
	}

	public clone(): this {
		const Class: any = this.constructor;
		const clone = new Class();
		clone._state = { ...this._state };
		return clone;
	}
}
