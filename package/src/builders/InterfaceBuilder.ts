import ts, { TypeElement, TypeNode } from "typescript";
import {
	ResolvableType,
	TsGenieParam,
	WithHelper,
	isWithInto,
	resolveHelper,
	resolveParam,
	resolveType,
} from "./utils.js";
import { PropertyTypeBuilder } from "./PropertyTypeBuilder.js";
import { BuilderBase } from "./BaseBuilder.js";

interface State {
	modifiers: ts.ModifierLike[];
	name: string | ts.Identifier;
	typeParameters: ts.TypeParameterDeclaration[];
	heritageClauses: ts.HeritageClause[];
	members: TypeElement[];
}

export class InterfaceBuilder extends BuilderBase<State> {
	public constructor(name: string | ts.Identifier) {
		super({
			modifiers: [],
			name,
			typeParameters: [],
			heritageClauses: [],
			members: [],
		});
	}

	public export() {
		const c = this.clone();
		c._state.modifiers = [
			...c._state.modifiers,
			ts.factory.createToken(ts.SyntaxKind.ExportKeyword),
		];
		return c;
	}

	public typeParameter(
		name: string,
		_extends?: TsGenieParam<ResolvableType>,
		opts: { defaultType?: TypeNode } = {}
	) {
		const c = this.clone();
		c._state.typeParameters = [
			...c._state.typeParameters,
			ts.factory.createTypeParameterDeclaration(
				[],
				name,
				resolveType(resolveParam(_extends)),
				opts.defaultType
			),
		];
		return c;
	}

	public extends(
		..._extends: TsGenieParam<ts.ExpressionWithTypeArguments | string | ts.Identifier>[]
	) {
		const c = this.clone();
		c._state.heritageClauses = [
			...c._state.heritageClauses,
			ts.factory.createHeritageClause(
				ts.SyntaxKind.ExtendsKeyword,
				_extends.map((e) => {
					if (isWithInto(e)) e = e.into();
					if (typeof e === "string") e = ts.factory.createIdentifier(e);
					if (ts.isIdentifier(e)) e = ts.factory.createExpressionWithTypeArguments(e, []);
					return e;
				})
			),
		];
		return c;
	}

	public prop(
		name: string | ts.PropertyName,
		type: TsGenieParam<ResolvableType>,
		opts: { optional?: boolean } = {}
	) {
		const c = this.clone();
		c._state.members = [
			...c._state.members,
			ts.factory.createPropertySignature(
				[],
				name,
				opts.optional ? ts.factory.createToken(ts.SyntaxKind.QuestionToken) : undefined,
				resolveType(resolveParam(type))
			),
		];
		return c;
	}

	public props(props: WithHelper<TsGenieParam<ts.PropertySignature>[], PropertyTypeBuilder>) {
		const c = this.clone();
		c._state.members = [
			...c._state.members,
			...resolveHelper(props, new PropertyTypeBuilder()).map(resolveParam),
		];
		return c;
	}

	public into() {
		return ts.factory.createInterfaceDeclaration(
			this._state.modifiers,
			this._state.name,
			this._state.typeParameters,
			this._state.heritageClauses,
			this._state.members
		);
	}
}
