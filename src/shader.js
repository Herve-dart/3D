// 基于GPU计算的粒子转换效果
import './css/lay.less'
let { SceneManager } = require('./bim_tools/init_manager')

let manager = new SceneManager('container')

// 顶点着色器
let vertexShader = `
    attribute float size;
    attribute vec3 position2;
    uniform float val;
    varying vec3 vPos;
    void main() {
        // vColor = color;
        vPos.x = position.x * val + position2.x * (1.-val);
        vPos.y = position.y* val + position2.y * (1.-val);
        vPos.z = position.z* val + position2.z * (1.-val);
        vec4 mvPosition = modelViewMatrix * vec4( vPos, 1.0 );
        gl_PointSize = size* (300./-mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
    }
`
// 片元着色器
let fragmentShader = `
    uniform vec3 color;
    uniform sampler2D texture;
    varying vec3 vPos;
    void main() {
        vec3 vColor = vec3(vPos.x/50., vPos.y/50., vPos.z/50.);
        gl_FragColor = vec4( color * vColor, 1.0 );
        gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );
    }
`
// 恒定的与顶点无关的变量
let uniforms = {
    color: {
        value: new THREE.Color(0xfffffff)
    },
    texture: {
        value: new THREE.TextureLoader().load('https://game.gtimg.cn/images/tgideas/2017/three/shader/dot.png')
    },
    val: {
        val: 1.0,
    },
}
// 着色器材质
let shaderMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
})
// 正方体
let box = new THREE.BoxGeometry(16, 16, 16, 20, 20, 20)
// 球体
let sphere = new THREE.SphereGeometry(10, 40, 40)
let moreObj, lessObj, moreLen, lessLen, morePos, lessPos
// 计算顶点数较多和较少的实体，增加较少顶点数的实体到最多长度
if(box.vertices.length >= sphere.vertices.length){
    moreObj = box
    lessObj = sphere
}else{
    moreObj = sphere
    lessObj = box
}
moreObj = new THREE.BufferGeometry().fromGeometry(moreObj)
lessObj = new THREE.BufferGeometry().fromGeometry(lessObj)
morePos = moreObj.attributes.position.array
lessPos = lessObj.attributes.position.array
moreLen = morePos.length
lessLen = lessPos.length
let position2 = new Float32Array(moreLen)
position2.set(lessPos)
for(let i = lessLen, j = 0; i < moreLen; i += 3, j += 3){
    position2[i] = position2[j%lessLen]
    position2[i + 1] = position2[j%lessLen + 1]
    position2[i + 2] = position2[j%lessLen + 2]
}
var sizes = new Float32Array(moreLen/3);
for (var i = 0; i < moreLen/3; i++) {
    sizes[i] = 4;
}
moreObj.addAttribute('size', new THREE.BufferAttribute(sizes, 1));
moreObj.addAttribute('position2', new THREE.BufferAttribute(position2, 3));

let particleSystem = new THREE.Points(moreObj, shaderMaterial)

let pos = {val: 1.0}
let tween = new manager.TWEEN.Tween(pos)
.to({val: 0.0}, 2000)
.easing(manager.TWEEN.Easing.Quadratic.InOut)
.delay(1000)
.onUpdate(callback)
let tweenBack = new manager.TWEEN.Tween(pos)
.to({val: 1.0}, 2000)
.easing(manager.TWEEN.Easing.Quadratic.InOut)
.delay(1000)
.onUpdate(callback)
tween.chain(tweenBack)
tweenBack.chain(tween)
tween.start()
function callback(){
    particleSystem.material.uniforms.val.value = pos.val
}
manager.scene.add(particleSystem)
animation()

function animation(){
    let time = Date.now()* 0.005
    if(particleSystem){
        let bufferObj = particleSystem.geometry
        // particleSystem.rotation.y = time
        let sizes = bufferObj.attributes.size.array
        let len = sizes.length
        for(let i = 0; i < len; i++){
            sizes[i] = (1.0 + Math.sin(0.01* i + time))* 1.0
        }
        console.log(sizes[10])
        bufferObj.attributes.size.needsUpdate = true
    }
    manager.controls.update()
    manager.TWEEN.update()
    manager.renderer.render(manager.scene, manager.camera)
    requestAnimationFrame(animation)
}