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
    Vector3
} from "@microsoft/mixed-reality-extension-sdk";

export interface PointsData {
    name: string;
    id: string;
    position: Vector3;
    color: Color4;
}

export class ScatterCube {
    private _container: Actor;
    private _blueMat: Material;


    constructor(private readonly _assets: AssetContainer, private readonly _context: Context, private readonly _baseUrl: string) {
        this.init();
        this._blueMat = this._assets.createMaterial('default', {
            color: Color3.Magenta()
        });
    }

    init(): void {
        this._container = Actor.Create(this._context, {
            actor: {
                name: `chart-parent`,
                transform: {
                    app: {
                        position: {x: 1.5, y: 0, z: 0},
                    }
                }
            }
        });

        Actor.CreatePrimitive(this._assets, {
            definition: {
                shape: PrimitiveShape.Plane,
                uSegments: 10,
                vSegments: 10,
                dimensions: Vector3.One()
            },
            actor: {
                name: 'x-plane',
                parentId: this._container.id,
                // appearance: {
                //     materialId: this._blueMat.id
                // }
            }
        });

        Actor.CreatePrimitive(this._assets, {
            definition: {
                shape: PrimitiveShape.Plane,
                uSegments: 10,
                vSegments: 10,
                dimensions: Vector3.One()
            },
            actor: {
                name: 'y-plane',
                parentId: this._container.id,
                transform: {
                    local: {
                        rotation: Quaternion.FromEulerAngles(90 * DegreesToRadians, 0, 0),
                    }
                },
                // appearance: {
                //     materialId: this._blueMat.id
                // }
            }
        });
    }

    public update(data: PointsData[]): void {

        for (const child of this._container.children) {
            child.destroy();
        }

        for (const dat of data) {

            Actor.CreatePrimitive(this._assets, {
                definition: {
                    shape: PrimitiveShape.Sphere,
                    uSegments: 3,
                    vSegments: 3,
                    dimensions: Vector3.One()
                },
                actor: {
                    name: `${dat.name}-test`,
                    parentId: this._container.id,
                    transform: {
                        local: {
                            position: dat.position,
                            scale: {x: 0.01, y: 0.01, z: 0.01}
                        }
                    },
                    appearance: {
                        materialId: this._blueMat.id
                    }

                }
            })
        }

    }
}
