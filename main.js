let scene, camera, renderer, earth, moon;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        5000
    );

    camera.position.z = 2000;
    camera.position.y = 2000;
    camera.rotation.x = -0.9;

    //earth
    const earth_texture = new THREE.TextureLoader().load(
        "textures/earth_atmos_2048.jpg"
    );
    const earth_material = new THREE.MeshBasicMaterial({ map: earth_texture });
    const earth_geometry = new THREE.SphereGeometry(395, 32, 32);
    earth = new THREE.Mesh(earth_geometry, earth_material);

    //moon
    const moon_texture = new THREE.TextureLoader().load("textures/ny.jpg");
    const moon_material = new THREE.MeshBasicMaterial({ map: moon_texture });
    const moon_geometry = new THREE.SphereGeometry(108, 32, 32);
    moon = new THREE.Mesh(moon_geometry, moon_material);
    moon.position.x = 2389;

    scene.add(moon);
    scene.add(earth);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);

    timestamp = Date.now() * 0.0001;
    var orbit = 2389;
    var speed = 10;
    moon.position.x = Math.cos(timestamp * speed) * orbit;
    moon.position.z = Math.sin(timestamp * speed) * orbit;

    earth.rotation.y += -0.01;
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

init();
animate();
