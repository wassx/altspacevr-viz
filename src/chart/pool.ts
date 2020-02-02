/*!
 * Copyright (c) Stefan Wasserbauer. All rights reserved.
 * Licensed under the MIT License.
 */

import {AssetContainer} from "@microsoft/mixed-reality-extension-sdk";
import {Point} from "./point";

export class Pool {

	private readonly _pool: Map<string, Point>;
	private readonly _freeObj: string[];
	private readonly _func: Resettable<Point>;

	constructor(func: Resettable<Point>, private readonly _assets: AssetContainer) {
		this._pool = new Map<string, Point>();
		this._freeObj = [];
		this._func = func;
	}

	public get(): Point {
		if (this._pool.size && this._freeObj.length) {
			const freeId = this._freeObj.splice(0, 1)[0];
			const point = this._pool.get(freeId);
			point.actor.appearance.enabled = true;
			return point;
		}
		const obj = new this._func(this._assets);
		this._pool.set(obj.actor.name, obj);

		obj.actor.appearance.enabled = true;

		return obj;
	}

	public release(name: string): void {
		const obj = this._pool.get(name);
		if (this._func.reset) {
			this._func.reset(obj);
		}
		if (obj) {
			obj.actor.appearance.enabled = false;
			this._freeObj.push(obj.actor.name);
		}
	}

}

export interface Resettable<T extends {}> {
	// constructor
	new(_assets: AssetContainer): T;

	// static
	reset?(obj: T): void;
}
