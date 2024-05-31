// Basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adjust camera position
camera.position.set(150, 150, 150);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// Create a group for the floor, objects, and the wall
const group = new THREE.Group();
scene.add(group);

// Create the floor
const floorWidth = 200;
const floorDepth = 200;
const floorHeight = 2;

// Define materials for each face of the box
const materials = [
  new THREE.MeshBasicMaterial({ color: 0x808080 }), // left
  new THREE.MeshBasicMaterial({ color: 0x808080 }), // right
  new THREE.MeshBasicMaterial({ color: 0x222831 }), // top
  new THREE.MeshBasicMaterial({ color: 0x808080 }), // bottom
  new THREE.MeshBasicMaterial({ color: 0x808080 }), // front
  new THREE.MeshBasicMaterial({ color: 0x808080 }), // back
];

const floorGeometry = new THREE.BoxGeometry(
  floorWidth,
  floorHeight,
  floorDepth
);
const floor = new THREE.Mesh(floorGeometry, materials);
floor.position.y = -floorHeight / 2;
group.add(floor);

// Create the translucent wall
const wallWidth = 2;
const wallHeight = 25;
const wallDepth = floorDepth;

const wallWidth2 = floorWidth;
const wallHeight2 = wallHeight;
const wallDepth2 = 2;

const wallGeometry = new THREE.BoxGeometry(wallWidth, wallHeight, wallDepth);

const wallGeometry2 = new THREE.BoxGeometry(
  wallWidth2,
  wallHeight2,
  wallDepth2
);

const wallMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.1,
});

const wallPosY = wallHeight / 2;

// Create and position each wall
const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
wall1.position.set(-floorWidth / 2 - wallWidth / 2, wallPosY, 0);
group.add(wall1);

const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
wall2.position.set(floorWidth / 2 + wallWidth / 2, wallPosY, 0);
group.add(wall2);

const wall3 = new THREE.Mesh(wallGeometry2, wallMaterial);
wall3.position.set(0, wallPosY, -floorDepth / 2 - wallWidth / 2);
group.add(wall3);

const wall4 = new THREE.Mesh(wallGeometry2, wallMaterial);
wall4.position.set(0, wallPosY, floorDepth / 2 + wallWidth / 2);
group.add(wall4);

// Add random objects on the floor
const objectCount = 15;
const objectSizeRange = { min: 3, max: 8 };
const floorAreaWidth = floorWidth - 10; // Reduce floor area width by 5 units on each side
const floorAreaDepth = floorDepth - 10; // Reduce floor area depth by 5 units on each side

// Generate and position random objects within the reduced floor area bounds
for (let i = 0; i < objectCount; i++) {
  const size =
    Math.random() * (objectSizeRange.max - objectSizeRange.min) +
    objectSizeRange.min;
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshBasicMaterial({
    color: Math.random() * 0xffffff,
  });
  const object = new THREE.Mesh(geometry, material);

  object.position.x = Math.random() * floorAreaWidth - floorAreaWidth / 2;
  object.position.y = size / 2;
  object.position.z = Math.random() * floorAreaDepth - floorAreaDepth / 2;

  group.add(object);
}

// Handle floor rotation with input range elements
const rotateXInput = document.getElementById("rotateX");
const rotateYInput = document.getElementById("rotateY");

rotateXInput.addEventListener("input", (event) => {
  const value = event.target.value;
  group.rotation.x = THREE.MathUtils.degToRad(value);
});

rotateYInput.addEventListener("input", (event) => {
  const value = event.target.value;
  group.rotation.y = THREE.MathUtils.degToRad(value);
});

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Handle window resize to adjust camera aspect ratio and renderer size
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
