import {
    Actor,
    AssetContainer,
    Context,
    PrimitiveShape,
    TextAnchorLocation
} from '@microsoft/mixed-reality-extension-sdk';

export class Earth {
    constructor(private readonly _assets: AssetContainer, private readonly _context: Context) {
    }


    public init(baseUrl: string): void {
        const bodyName = 'earth';

        Actor.Create(this._context, {
            actor: {
                name: 'Text',
                transform: {
                    app: {position: {x: 0, y: 0.5, z: 0}}
                },
                text: {
                    contents: "Hi!",
                    anchor: TextAnchorLocation.MiddleCenter,
                    color: {r: 30 / 255, g: 206 / 255, b: 213 / 255},
                    height: 0.3
                }
            }
        });

        const earthParent = Actor.Create(this._context, {
            actor: {
                name: `${bodyName}-parent`,
                transform: {
                    app: {position: {x: 0, y: 0.5, z: 0}}
                }
            }
        });

        console.log(`${baseUrl}/assets/${bodyName}.gltf`);

        Actor.CreatePrimitive(this._assets, {
            definition: {
                dimensions: {x: 1, y: 1, z: 1},
                shape: PrimitiveShape.Sphere,
                uSegments: 12,
                vSegments: 12
            },
            addCollider: true,
            actor: {
                name: 'testobj',
                transform: {
                    app: {position: {x: 1, y: 1, z: 1}}
                }
            }
        });


        const model = Actor.CreateFromGltf(this._assets, {
            uri: `${baseUrl}/assets/${bodyName}.gltf`,
            actor: {
                name: `${bodyName}-body`,
                transform: {
                    local: {scale: {x: 1, y: 1, z: 1}}
                },
                parentId: earthParent.id,
                collider: {
                    geometry: {
                        shape: 'sphere',
                        radius: 0.5
                    }
                }
            }

        });

    }

}
