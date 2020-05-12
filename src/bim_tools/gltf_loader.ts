/**
 * gltf模型的加载器
 */
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
class InitGLTFLoader{
    loader:any = new GLTFLoader();
    dracoLoader = new DRACOLoader();
    constructor(){
        this.dracoLoader.setDecoderPath('three/examples/js/libs/draco');
        this.loader.setDRACOLoader( this.dracoLoader );
    }
}
export { InitGLTFLoader }