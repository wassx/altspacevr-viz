"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mixed_reality_extension_sdk_1 = require("@microsoft/mixed-reality-extension-sdk");
class Earth {
    constructor(_assets, _context) {
        this._assets = _assets;
        this._context = _context;
    }
    init(baseUrl) {
        const bodyName = 'earth';
        mixed_reality_extension_sdk_1.Actor.Create(this._context, {
            actor: {
                name: 'Text',
                transform: {
                    app: { position: { x: 0, y: 0.5, z: 0 } }
                },
                text: {
                    contents: "Hi!",
                    anchor: mixed_reality_extension_sdk_1.TextAnchorLocation.MiddleCenter,
                    color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
                    height: 0.3
                }
            }
        });
        const earthParent = mixed_reality_extension_sdk_1.Actor.Create(this._context, {
            actor: {
                name: `${bodyName}-parent`,
                transform: {
                    app: { position: { x: 0, y: 0.5, z: 0 } }
                }
            }
        });
        console.log(`${baseUrl}/assets/${bodyName}.gltf`);
        mixed_reality_extension_sdk_1.Actor.CreatePrimitive(this._assets, {
            definition: {
                dimensions: { x: 1, y: 1, z: 1 },
                shape: mixed_reality_extension_sdk_1.PrimitiveShape.Sphere,
                uSegments: 12,
                vSegments: 12
            },
            addCollider: true,
            actor: {
                name: 'testobj',
                transform: {
                    app: { position: { x: 1, y: 1, z: 1 } }
                }
            }
        });
        const model = mixed_reality_extension_sdk_1.Actor.CreateFromGltf(this._assets, {
            uri: `${baseUrl}/assets/${bodyName}.gltf`,
            actor: {
                name: `${bodyName}-body`,
                transform: {
                    local: { scale: { x: 1, y: 1, z: 1 } }
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
exports.Earth = Earth;
//# sourceMappingURL=earth.js.map