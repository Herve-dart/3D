/**
 * 场景中的灯光
 */
import * as THREE from 'three/build/three'
class Lights{
    constructor(scene: any){
        let lightGourp = new THREE.Group();
        let ambientLight = new THREE.AmbientLight(0x515151);
        let pointLight = new THREE.PointLight(0x515151, 1, 10000);
        let hemiLight = new THREE.HemisphereLight(0x515151, 0x515151, 1);
        lightGourp.add(ambientLight);
        lightGourp.add(pointLight);
        pointLight.position.set(10, 30, 20);
        lightGourp.add(hemiLight);
        lightGourp.groupName = 'light';
        scene.add(lightGourp);
    }
}
export { Lights }