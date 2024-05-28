  import * as THREE from "https://cdn.skypack.dev/three@0.132";
  import Stats from "https://cdn.skypack.dev/stats.js.fps";

console.log(THREE);

const stats = new Stats();
stats.showPanel(0);

/*--------------------
必須項目
--------------------*/

// キャンバスの取得
const canvas = document.querySelector(".webgl");

// サイズ
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// シーン
const scene = new THREE.Scene();

// カメラ
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, 6);
scene.add(camera);

// ライト
const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
directionalLight.position.set(0.5, 1, 0);
scene.add(directionalLight);

// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);

/*--------------------
オブジェクトの追加
--------------------*/







// ランダムな幾何学模様（線のみ）の生成関数
function createRandomGeometry() {
    const geometry = new THREE.BoxGeometry(0.7,0.7,0.7); // 小さなボックスジオメトリ
    const wireframe = new THREE.WireframeGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });
    const line = new THREE.LineSegments(wireframe, material);
    line.position.x = (Math.random() - 0.5) * 20;
    line.position.y = (Math.random() - 0.5) * 20;
    line.position.z = (Math.random() - 0.5) * 20;

    // ランダムな回転
    line.rotation.x = Math.random() * 2 * Math.PI;
    line.rotation.y = Math.random() * 2 * Math.PI;
    line.rotation.z = Math.random() * 2 * Math.PI;
    return line;
}

// 立方体のリストを保持
const geometries = [];

// 複数のランダムな幾何学模様をシーンに追加
for (let i = 0; i < 500; i++) { // 数を増やす
    const geometry = createRandomGeometry();
    geometries.push(geometry);
    scene.add(geometry);
};

const bufferGeometry = new THREE.BufferGeometry();
const count = 5000;
const vertices = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  vertices[i] = (Math.random() - 0.5) * 10;
}

bufferGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(vertices, 3)
);

const pointMaterial = new THREE.PointsMaterial({
  size: 0.025,
  sizeAttenuation: true,
  color: 0x000000,
});

const particles = new THREE.Points(bufferGeometry, pointMaterial);
scene.add(particles);

renderer.render(scene, camera);

window.addEventListener("resize", () => {
  // サイズのアップデート
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // カメラのアップデート
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // レンダラーのアップデート
  renderer.setSize(sizes.width, sizes.height);
});

// マウスに反応させる
const cursor = {
  x: 0,
  y: 0,
}

// 追加
const dist = {
  x: 0,
  y: 0,
}
window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = 0.5 - e.clientY / sizes.height;
});

// アニメーション
const animate = () => {
  stats.begin();
  renderer.render(scene, camera);
    stats.end();

  // カメラの移動（変更）
  dist.x += (cursor.x - dist.x) * 0.01;
  dist.y += (cursor.y - dist.y) * 0.01;
  camera.position.x = dist.x;
  camera.position.y = dist.y;

    geometries.forEach((geometry) => {
    geometry.rotation.x += 0.002;
    geometry.rotation.y += 0.002;
  });

  requestAnimationFrame(animate);
};

animate();
