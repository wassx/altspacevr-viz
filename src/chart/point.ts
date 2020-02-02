/*!
 * Copyright (c) Stefan Wasserbauer. All rights reserved.
 * Licensed under the MIT License.
 */

import {Actor, AssetContainer, PrimitiveShape, Vector3} from "@microsoft/mixed-reality-extension-sdk";
import {v4 as uuid} from 'uuid';

export class Point {

	public actor: Actor;

	constructor(private readonly _assets: AssetContainer) {
		this.actor = Actor.CreatePrimitive(this._assets, {
			definition: {
				shape: PrimitiveShape.Sphere,
				uSegments: 3,
				vSegments: 3,
				dimensions: Vector3.One()
			},
			actor: {
				name: uuid(),
				// transform: {
				// 	local: {
				// 		position: dat.position,
				// 		scale: {x: 0.01, y: 0.01, z: 0.01}
				// 	}
				// },
				appearance: {
					enabled: true
					// materialId: this._blueMat.id
				}

			}
		});
		Point.reset(this);
	}

	public static reset(obj: Point) {
		obj.actor.transform = undefined;
		obj.actor.parentId = '';
		obj.actor.appearance.materialId = '';
		obj.actor.appearance.enabled = true;
	}

}
