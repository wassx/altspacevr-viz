/*!
 * Copyright (c) Stefan Wasserbauer. All rights reserved.
 * Licensed under the MIT License.
 */

import {
	Actor,
	AssetContainer,
	Color3,
	Color4,
	Context,
	DegreesToRadians,
	Material,
	PrimitiveShape,
	Quaternion,
	ScaledTransform,
	Vector3
} from "@microsoft/mixed-reality-extension-sdk";
import {v4 as uuid} from "uuid";
import {Point} from "./point";
import {Pool} from "./pool";

export interface PointsData {
	name: string;
	id: string;
	position: Vector3;
	color: Color4;
}

export class ScatterCube {
	private _container: Actor;
	private _blueMat: Material;
	private _dataPointsContainer: Actor;
	private _pool: Pool;

	constructor(
		private readonly _assets: AssetContainer,
		private readonly _context: Context,
		private readonly _baseUrl: string) {
		this._pool = new Pool(Point, _assets);
		this.init();
		this._blueMat = this._assets.createMaterial('default', {
			color: Color3.Magenta()
		});
	}

	public init(): void {
		this._container = Actor.Create(this._context, {
			actor: {
				name: `chart-parent`,
				transform: {
					app: {
						position: {x: 1.5, y: 0, z: 0},
					}
				},
				grabbable: true
			}
		});

		this._dataPointsContainer = Actor.Create(this._context, {
			actor: {
				name: `data-points-parent`,
				parentId: this._container.id,
				// transform: {
				//     app: {
				//         position: {x: 1.5, y: 0, z: 0},
				//     }
				// }
			}
		});

		Actor.CreatePrimitive(this._assets, {
			definition: {
				shape: PrimitiveShape.Plane,
				uSegments: 1,
				vSegments: 1,
				dimensions: Vector3.One()
			},
			actor: {
				name: 'x-plane',
				parentId: this._container.id,
				transform: {
					local: {position: {x: 0.5, y: 0.0, z: 0.5}}
				}
				// appearance: {
				//     materialId: this._blueMat.id
				// }
			}
		});

		Actor.CreatePrimitive(this._assets, {
			definition: {
				shape: PrimitiveShape.Plane,
				uSegments: 1,
				vSegments: 1,
				dimensions: Vector3.One()
			},
			actor: {
				name: 'y-plane',
				parentId: this._container.id,
				transform: {
					local: {
						rotation: Quaternion.FromEulerAngles(90 * DegreesToRadians, 0, 0),
						position: {x: 0.5, y: 0.5, z: 0.0}
					}
				},
				// appearance: {
				//     materialId: this._blueMat.id,
				//
				// }
			}
		});
	}

	public async update(data: PointsData[]): Promise<void> {

		for (const child of this._dataPointsContainer.children) {
			// this._pool.release(child.name);
			child.destroy();
		}

		await this.createPoints(data);
	}

	private async createPoints(data: PointsData[]): Promise<void> {
		for (const dat of data) {
			Actor.CreatePrimitive(this._assets, {
				definition: {
					shape: PrimitiveShape.Sphere,
					uSegments: 3,
					vSegments: 3,
					dimensions: Vector3.One()
				},
				actor: {
					name: uuid(),
					parentId: this._dataPointsContainer.id,
					transform: {
						local: {
							position: dat.position,
							scale: {x: 0.01, y: 0.01, z: 0.01}
						}
					},
					appearance: {
						// enabled: true,
						materialId: this._blueMat.id
					}

				}
			});
			// const point = this._pool.get();
			// point.actor.parentId = this._dataPointsContainer.id;
			// point.actor.transform.local = new ScaledTransform().copy({
			// 	position: dat.position,
			// 	scale: new Vector3(0.01, 0.01, 0.01)
			// });
			// point.actor.appearance.materialId = this._blueMat.id;
		}
	}
}
