/**
 * 场景中的地板
 */
import * as THREE from 'three/build/three'
class Plane{
    constructor(scene: any){
        let planeGeometry = new THREE.PlaneGeometry(100, 100);
        let planeMaterial = new THREE.MeshLambertMaterial({
            color: 0xbfbfbf
        });
        let plane = new THREE.Mesh(planeGeometry, planeMaterial);
        // plane.position.set(36.0, -2.0, -10.0);
        plane.rotation.x = -Math.PI/2;
        scene.add(plane);
    }
}
export { Plane }