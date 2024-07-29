<template>
	<view class="all">
		<div ref="container" class="starBox"></div>
	</view>
</template>


<script>
	export default {
		data() {
			return {};
		},
		onLoad() {

		},
		methods: {

		}
	};
</script>


<script module="three" lang="renderjs">
	import * as THREE from "three";
	var vertexHeight;
	var planeDefinition;
	var planeSize;
	var totalObjects;
	var frame;
	var startTime;
	var camera;
	var scene;
	var uniforms;
	var material;
	var plane;
	var geometry;
	var renderer;
	export default {
		mounted() {
			this.initThree();
		},
		methods: {
			initThree() {
				vertexHeight = 15000;
				planeDefinition = 100;
				planeSize = 1245000;
				totalObjects = 30000;
				frame = 0;
				startTime = Date.now(); // 记录开始时间

				var container = this.$refs.container; // 获取容器元素

				camera = new THREE.PerspectiveCamera(
					55,
					window.innerWidth / window.innerHeight,
					1,
					400000
				);
				camera.position.z = 550000;
				camera.position.y = 10000;
				camera.lookAt(new THREE.Vector3(0, 6000, 0));

				scene = new THREE.Scene();
				scene.fog = new THREE.Fog(0x23233f, 1, 300000);

				uniforms = {
					time: {
						type: "f",
						value: 0.0
					}
				};

				material = new THREE.ShaderMaterial({
					uniforms: uniforms,
					vertexShader: `
				  uniform float time;
				  varying vec3 vNormal;      
				  void main(void) {
				     vec3 v = position;
				     vNormal = normal;
				     v.z += cos(2.0 * position.x + (time)) * 4085.5;  
				     gl_Position = projectionMatrix *
				                  modelViewMatrix *
				                  vec4(v, 1.0);
				  }
				`,
					fragmentShader: `
				  varying vec3 vNormal;
				  uniform float time;      
				  void main(void) {
				      vec3 light = vec3(0.1, .9, .1);
				      light = normalize(light);
				      float dProd = max(0.2, dot(vNormal, light));
				      gl_FragColor = vec4(dProd, // R
				                        dProd, // G
				                        dProd, // B
				                        1.0);  // A
				  }
				`,
					wireframe: true,
					fog: false
				});

				plane = new THREE.Mesh(
					new THREE.PlaneGeometry(
						planeSize,
						planeSize,
						planeDefinition,
						planeDefinition
					),
					material
				);
				plane.rotation.x -= Math.PI * 0.5;

				// scene.add(plane);

				geometry = new THREE.BufferGeometry();

				const positions = [];
				for (let i = 0; i < totalObjects; i++) {
					const x = Math.random() * planeSize - planeSize * 0.5;
					const y = Math.random() * 100000 - 20000;
					//const y = Math.random() * 2000; // 范围从 0 到 2000
					const z = Math.random() * planeSize - planeSize * 0.5;

					positions.push(x, y, z);
				}

				geometry.setAttribute(
					"position",
					new THREE.Float32BufferAttribute(positions, 3)
				);

				const material1 = new THREE.PointsMaterial({
					size: 200
				});
				const particles = new THREE.Points(geometry, material1);
				scene.add(particles);

				// renderer = new THREE.WebGLRenderer();
				renderer = new THREE.WebGLRenderer({
					alpha: true
				});
				renderer.setSize(window.innerWidth, 340);
				container.appendChild(renderer.domElement); // 将渲染器的 dom 元素添加到容器

				this.render();



			},
			render() {
				// console.log("持续动画....");
				requestAnimationFrame(() => {
					this.render();
					// console.log("render", this);
				});
				camera.position.z -= 100;
				if (camera.position.z < 50000) { // 假设50000是相机的最近距离
					camera.position.z = 550000; // 重置相机位置到初始状态
				}
				var currentTime = Date.now(); // 获取当前时间
				var elapsedTime = (currentTime - startTime) / 1000; // 计算经过的时间（以秒为单位）

				//uniforms.time.value = elapsedTime;

				// 使用取模操作来循环使用时间值，避免数值过大
				uniforms.time.value = elapsedTime % 1000; // 假设每1000秒重置一次时间
				// // 不断更新相机的位置
				// camera.position.z -= 150;
				// uniforms.time.value = frame;
				// // 时间的增量
				// frame += 0.01;
				renderer.render(scene, camera);
			}
		},
	};
</script>

<style lang="scss" scoped>
	canvas {
		width: 100%;
		height: 500rpx;
	}

	.all {
		width: 100%;
		height: 500rpx;
		position: relative;


		.starBox {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;



		}
	}
</style>