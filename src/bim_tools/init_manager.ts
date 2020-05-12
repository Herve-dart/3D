/**
 * SceneManager场景中的数据管理者
 * 通过为管理者注册对象的方式，将threeJS场景和业务中的场景分离
 * 将大部分精力放在数据的修改上
 * --------------------------------------------------
 * 场景管理者实例
 * manager:
 *  camera: 相机
 *  scene: 场景
 *  renderer: 渲染器
 *  TWEEN: 动画管理
 *  controls: 场景控制器
 */
import * as THREE from 'three/build/three'
import { InitGLTFLoader } from './gltf_loader'
import { Lights } from './lights'
import { Plane } from './floor'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import TWEEN from '@tweenjs/tween.js'

// 类类型接口限定SceneManager
interface SceneConfig{
    scene: any;
    camera: any;
    renderer: any;
    controls: any;
}
class SceneManager implements SceneConfig{

    camera: any;
    renderer: any;
    scene: any;
    controls: any;
    TWEEN: any;

    private gltfLoader: any = new InitGLTFLoader();
    // 初始化场景中的对象
    constructor(id){
        this.scene = new THREE.Scene();
        new Lights(this.scene);
        // new Plane(this.scene);
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 0.001, 1000.0);
        this.camera.position.set(-10, 40, 50);
        this.camera.lookAt(this.scene.position);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setClearColor(0x000);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputEncoding = THREE.GammaEncoding;
        // this.renderer.shadowMap.enabled = true;
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        document.getElementById(id).appendChild(this.renderer.domElement);
        this.TWEEN = TWEEN;
        this.renderer.render(this.scene, this.camera);

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth/ window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // 加载模型
    loadBim(path:string, ...modelnames:string[]):any{
        let obj = new THREE.Object3D();
        let group = new THREE.Group();
        group.visible = false;
        this.scene.add(group);
        let length = modelnames.length;
        let num = 0;
        for(let index in modelnames){
            this.gltfLoader.loader.load(path + modelnames[index] + '/model.gltf', (model) => {
                obj = model.scene.children[0];
                obj.index = index;
                group.add(obj);
                num ++;
                if(num === length){
                    // 当最后一层模型
                    // 重新计算target
                    let box = new THREE.Box3();
                    let range = box.expandByObject(group);
                    console.log(TWEEN);
                    new TWEEN.Tween(this.controls.target)
                        .to({x: (range.max.x + range.min.x)/ 2, z: (range.max.z + range.min.z)/ 2}, 1000)
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .start();
                    group.visible = true;
                }
            });
        }
        return group;
    }
}
export { SceneManager }