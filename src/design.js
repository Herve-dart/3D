import './css/cesium/lay.less'

let viewer = new Cesium.Viewer(document.getElementById('container'));
let scene = viewer.scene;
viewer.baseLayerPicker.viewModel.selectedImagery = viewer.baseLayerPicker.viewModel.imageryProviderViewModels[1];
let model = scene.primitives.add(new Cesium.Cesium3DTileset({
    url: './resource/HD/tileset.json'
}));

viewer.zoomTo(model);