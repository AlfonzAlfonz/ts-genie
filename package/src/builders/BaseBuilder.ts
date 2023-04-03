export abstract class BuilderBase<State = unknown> {
	public _state: State;

	constructor(state: State) {
		this._state = state;
	}

	public $if(condition: unknown, ifTruthy: (builder: this) => this) {
		return condition ? ifTruthy(this) : this;
	}

	public $reduce<T extends unknown>(
		iterable: Iterable<T>,
		accumulator: (builder: this, itm: T) => this
	) {
		let result = this;
		for (const itm of iterable) {
			result = accumulator(result, itm);
		}
		return result;
	}

	public clone(): this {
		const Class: any = this.constructor;
		const clone = new Class();
		clone._state = { ...this._state };
		return clone;
	}
}
