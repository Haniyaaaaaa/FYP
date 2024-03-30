import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls"; // Import OrbitControls
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

function Interactive3DModel({ width = "700px", height = "300px" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      3000
    );

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    const axesHelper = new THREE.AxesHelper(3);
    const pixelRatio = window.devicePixelRatio || 2;
    renderer.setPixelRatio(pixelRatio);
    scene.add(axesHelper);

    // Load the 3D model (replace with your actual loading logic)
    const objLoader = new OBJLoader();
    objLoader.load("/models/House.obj", (obj) => {
      console.log(obj);

      if (obj) {
        if (obj instanceof THREE.Object3D) {
          const model = obj.type === "Group" ? obj.children : [obj];

          model.forEach((child) => {
            if (child instanceof THREE.Object3D) {
              scene.add(child);
            } else {
              console.error("Invalid model structure!");
            }
          });

          console.log("Scene added successfully");
        } else {
          console.error("Invalid model structure!");
        }
      } else {
        console.error("Error loading model!");
      }
    });

    camera.position.z = 5;
    camera.position.y = 2;

    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Add OrbitControls for rotation and panning
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // Update controls before rendering
      renderer.render(scene, camera);
    };

    animate();
  }, []); // Re-render if modelPath or fieldOfView changes

  return (
    <canvas ref={canvasRef} style={{ width, height }} /> // Set desired width and height
  );
}

export default Interactive3DModel;



