import ts from "typescript";
import { BuilderBase } from "./BaseBuilder.js";
import { TsGenieParam, resolveParam } from "./utils.js";

interface State {
	tag?: ts.Expression;
	head: string;
	parts: (string | ts.Expression)[];
}

export class TemplateStringBuilder extends BuilderBase<State> {
	public constructor() {
		super({
			head: "",
			parts: [],
		});
	}

	public tag(tag: TsGenieParam<ts.Expression>) {
		const c = this.clone();
		c._state.tag = resolveParam(tag);
		return c;
	}

	public str(value: string) {
		const c = this.clone();
		if (!c._state.head || !c._state.parts.length) {
			c._state.head += value;
			return c;
		}

		c._state.parts = [...c._state.parts.slice(0, -1), c._state.parts.at(-1) + value];
		return c;
	}

	public expr(expression: TsGenieParam<ts.Expression>) {
		const c = this.clone();
		if (!c._state.head) {
			c._state.head = "";
		}
		c._state.parts = [...c._state.parts, resolveParam(expression), ""];
		return c;
	}

	public into() {
		let template: ts.TemplateLiteral;

		if (!this._state.parts.length) {
			template = ts.factory.createNoSubstitutionTemplateLiteral(this._state.head);
		} else {
			const i = this._state.parts.slice(0, -2).values();
			const span = [];

			while (true) {
				const [id, str] = [i.next(), i.next()];
				if (str.done) break;
				span.push(
					ts.factory.createTemplateSpan(
						id.value as ts.Identifier,
						ts.factory.createTemplateMiddle(str.value as string)
					)
				);
			}

			const [id, str] = this._state.parts.slice(-2);
			span.push(
				ts.factory.createTemplateSpan(
					id as ts.Identifier,
					ts.factory.createTemplateTail(str as string)
				)
			);

			template = ts.factory.createTemplateExpression(
				ts.factory.createTemplateHead(this._state.head),
				span
			);
		}

		return this._state.tag
			? ts.factory.createTaggedTemplateExpression(this._state.tag, [], template)
			: template;
	}
}
