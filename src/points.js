// 正方体和球体的转换，基于CPU计算
import './css/lay.less'
let { SceneManager } = require('./bim_tools/init_manager')

let manager = new SceneManager('container')

let moreObj, lessObj, moreLength, lessLength
let position1 = [], position2 = []
// 正方体粒子
let geometry = new THREE.BoxGeometry(20, 20, 20, 40, 40, 40)
// 球体粒子
let sphereGeometry = new THREE.SphereGeometry(10, 60, 60)
// 确定顶点数较多的实体
if(geometry.vertices.length > sphereGeometry.vertices.length){
    moreObj = geometry
    lessObj = sphereGeometry
}else{
    moreObj = sphereGeometry
    lessObj = geometry
}
moreLength = moreObj.vertices.length
lessLength = lessObj.vertices.length

moreObj.vertices.forEach((o) => {
    position1.push(o.clone())
})
lessObj.vertices.forEach((o) => {
    position2.push(o.clone())
})

for(let i = lessLength, j = 0; i < moreLength; i++, j++){
    j %= lessLength
    position2[i] = position2[j]
}

console.log(position1.length)
console.log(position2.length)

let pointMaterial = new THREE.PointsMaterial({size: .2, color: 0xffffff})
let particle = new THREE.Points(moreObj, pointMaterial)

let pos = {val: 1}
let tween = new manager.TWEEN.Tween(pos).to({val: 0}, 2000)
.easing(manager.TWEEN.Easing.Quadratic.InOut)
.delay(1000)
.onUpdate(callback)
let backTween = new manager.TWEEN.Tween(pos).to({val: 1}, 2000)
.easing(manager.TWEEN.Easing.Quadratic.InOut)
.delay(1000)
.onUpdate(callback)
tween.chain(backTween)
backTween.chain(tween)
tween.start()
function callback(){
    let vertices = particle.geometry.vertices
    for(let i = 0; i < vertices.length; i++){
        let position = vertices[i]
        position.x = position1[i].x* pos.val + position2[i].x* (1 - pos.val)
        position.y = position1[i].y* pos.val + position2[i].y* (1 - pos.val)
        position.z = position1[i].z* pos.val + position2[i].z* (1 - pos.val)
    }
    particle.geometry.verticesNeedUpdate = true
}

manager.scene.add(particle)

animate(); 
function animate(){
    manager.controls.update()
    manager.TWEEN.update()
    requestAnimationFrame(animate)
    manager.renderer.render(manager.scene, manager.camera)
}