import './css/lay.less'
let { SceneManager } = require('./bim_tools/init_manager')
/**
 * 场景管理者实例
 * camera、scene、renderer
 */
let manager = new SceneManager('container');
let bimGroup = manager.loadBim('./resource/lm/', 'AA01_Bimzx_1F', 'AA01_Bimzx_2F', 'AA01_Bimzx_3F', 'AA01_Bimzx_RF');

//

animate(); 
function animate(){
    manager.controls.update();
    manager.TWEEN.update();
    requestAnimationFrame(animate);
    manager.renderer.render(manager.scene, manager.camera);
}