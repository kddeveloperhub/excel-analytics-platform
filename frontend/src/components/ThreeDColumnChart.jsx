import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeDColumnChart = ({ data }) => {
  const mountRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mountRef.current.clientWidth, 400);
    mountRef.current.appendChild(renderer.domElement);

    data.forEach((val, i) => {
      const geometry = new THREE.BoxGeometry(0.5, val / 10, 0.5);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = i - data.length / 2;
      cube.position.y = val / 20;
      scene.add(cube);
    });

    camera.position.z = 5;
    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  }, [data]);

  return <div ref={mountRef}></div>;
};

export default ThreeDColumnChart;
    