import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const canvas = document.querySelector("#bg"); // get the canvas element
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true }); // alpha: true allows transparent background
renderer.setSize(window.innerWidth, window.innerHeight); // set the size of the canvas
document.body.appendChild(renderer.domElement); // add the canvas to the body of the document
const scene = new THREE.Scene(); // create a scene
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
); // create a camera

//Loading screen
const loadingManager = new THREE.LoadingManager();

loadingManager.onLoad = () => {
  
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.classList.add("fade-out");
  // optional: remove loader from DOM via event listener
 setTimeout(() => {
  document.body.removeChild(loadingScreen);
 }, 1000);
}


const houseloader = new GLTFLoader(loadingManager); // create a house loader
const moonloader = new GLTFLoader(); // create a moon loader

//Set the camera position
camera.position.z = 5;
camera.position.y = 0.1;

//Load the models
var house;
var moon;

//Load the house model
houseloader.load(
  "/models/house.glb",
  function (gltf) {
    house = gltf.scene;
    house.scale.set(0.7, 0.7, 0.7);
    scene.add(house);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

//Load the moon model
moonloader.load(
  "/models/moon.glb",
  function (gltf) {
    moon = gltf.scene;
    moon.scale.set(0.02, 0.02, 0.02);
    scene.add(moon);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

//Load the background texture for the sphere
const sphereTexture = new THREE.TextureLoader().load(
  "/background_emissive.jpeg"
);

//Create the sphere
const geometry = new THREE.SphereGeometry(1, 32, 32);

//apply the texture to the inside of the sphere
const material = new THREE.MeshBasicMaterial({
  map: sphereTexture,
  side: THREE.BackSide,
});
const sphere = new THREE.Mesh(geometry, material);
sphere.scale.set(20, 20, 20);
scene.add(sphere);

//Set the renderer size and pixel ratio
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//Add lights to the scene
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(pointLight, ambientLight);

// Light helper
// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);

//Resize the canvas when the window is resized
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

//Animate
function animate() {
  requestAnimationFrame(animate);
  //rotate the objects
  if (moon) moon.rotation.y += -0.01;
  if (house) house.rotation.y += 0.001;
  if (sphere) sphere.rotation.y += 0.001;

  //make the moon orbit the house
  if (moon) {
    moon.position.x = 2 * Math.cos(Date.now() * 0.0005);
    moon.position.z = 2 * Math.sin(Date.now() * 0.0005);
  }

  //Update the camera position on scroll
  window.addEventListener("scroll", updateCamera);

  //Render the scene and camera
  renderer.render(scene, camera);
}
animate();

//Update the camera position on scroll
function updateCamera() {
  //rotate the world
  scene.rotation.x = window.scrollY / 500;
  scene.rotation.y = window.scrollY / 500;
  camera.position.z = 5 + window.scrollY / 100;
}

function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

// To check the scroll position on page load
reveal();


function hackerEffect(){

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  document.querySelector("#hacked1").onmouseover = event => {
    let iterations = 0
    let interval = setInterval(() => {
      event.target.innerText =  event.target.innerText.split("").map((letter, index) => 
      {

        if(index < iterations)
        {
          return event.target.dataset.value[index];
        }
        return letters[Math.floor(Math.random() * 26)]
      })
      
      .join("");

      if (iterations >= 9) {
        clearInterval(interval);
      }

      iterations++;
    }, 50);
}

  document.querySelector("#hacked2").onmouseover = event => {
    let iterations = 0
    let interval = setInterval(() => {
      event.target.innerText =  event.target.innerText.split("").map((letter, index) => 
      {

        if(index < iterations)
        {
          return event.target.dataset.value[index];
        }
        return letters[Math.floor(Math.random() * 26)]
      })
      
      .join("");

      if (iterations >= 9) {
        clearInterval(interval);
      }

      iterations++;
    }, 50);
}
  document.querySelector("#hacked3").onmouseover = event => {
    let iterations = 0
    let interval = setInterval(() => {
      event.target.innerText =  event.target.innerText.split("").map((letter, index) => 
      {

        if(index < iterations)
        {
          return event.target.dataset.value[index];
        }
        return letters[Math.floor(Math.random() * 26)]
      })
      
      .join("");

      if (iterations >= 9) {
        clearInterval(interval);
      }

      iterations++;
    }, 50);
}
}

hackerEffect();