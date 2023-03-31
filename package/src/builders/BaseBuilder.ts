export abstract class BuilderBase<State = unknown> {
	public _state: State;

	constructor(state: State) {
		this._state = state;
	}

	public $if(condition: unknown, ifTruthy: (builder: this) => this) {
		return condition ? ifTruthy(this) : this;
	}

	public $reduce<T extends unknown>(collection: T[], accumulator: (builder: this, itm: T) => this) {
		return collection.reduce(accumulator, this);
	}

	public clone(): this {
		const Class: any = this.constructor;
		const clone = new Class();
		clone._state = { ...this._state };
		return clone;
	}
}
