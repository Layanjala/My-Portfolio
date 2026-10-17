"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const VIOLET = "#8b5cf6";
const CYAN = "#22d3ee";
const BLUE = "#60a5fa";

// Wireframe globe with glowing vertex nodes, an inner core and an orbit ring
function DataSphere({ reduced }: { reduced: boolean }) {
	const group = useRef<THREE.Group>(null);
	const ring = useRef<THREE.Mesh>(null);

	const nodePositions = useMemo(() => {
		const geo = new THREE.IcosahedronGeometry(1.6, 1);
		const positions = geo.getAttribute("position").array as Float32Array;
		geo.dispose();
		return positions;
	}, []);

	useFrame((state, delta) => {
		if (!group.current || reduced) return;
		group.current.rotation.y += delta * 0.18;
		group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
		if (ring.current) ring.current.rotation.z += delta * 0.4;
	});

	return (
		<group position={[0.7, 0.15, 0]}>
			<group ref={group}>
				<mesh>
					<icosahedronGeometry args={[1.6, 1]} />
					<meshBasicMaterial color={VIOLET} wireframe transparent opacity={0.55} />
				</mesh>
				<points>
					<bufferGeometry>
						<bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
					</bufferGeometry>
					<pointsMaterial color={CYAN} size={0.09} sizeAttenuation transparent opacity={0.95} />
				</points>
				<mesh>
					<sphereGeometry args={[0.95, 48, 48]} />
					<meshStandardMaterial
						color="#1e1b4b"
						emissive="#6d28d9"
						emissiveIntensity={0.55}
						roughness={0.25}
						metalness={0.3}
					/>
				</mesh>
			</group>
			<mesh ref={ring} rotation={[Math.PI / 2.4, 0.3, 0]}>
				<torusGeometry args={[2.25, 0.012, 16, 160]} />
				<meshBasicMaterial color={CYAN} transparent opacity={0.7} />
			</mesh>
		</group>
	);
}

// Drifting particles joined by faint lines when close together
function ParticleNetwork({ count, reduced }: { count: number; reduced: boolean }) {
	const group = useRef<THREE.Group>(null);

	const { points, lines } = useMemo(() => {
		const pts: THREE.Vector3[] = [];
		for (let i = 0; i < count; i++) {
			const r = 3 + Math.random() * 2.5;
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);
			pts.push(
				new THREE.Vector3(
					r * Math.sin(phi) * Math.cos(theta),
					r * Math.sin(phi) * Math.sin(theta) * 0.6,
					r * Math.cos(phi) - 1.5
				)
			);
		}
		const linePositions: number[] = [];
		for (let i = 0; i < pts.length; i++) {
			for (let j = i + 1; j < pts.length; j++) {
				if (pts[i].distanceTo(pts[j]) < 1.35) {
					linePositions.push(...pts[i].toArray(), ...pts[j].toArray());
				}
			}
		}
		return {
			points: new Float32Array(pts.flatMap((p) => p.toArray())),
			lines: new Float32Array(linePositions),
		};
	}, [count]);

	useFrame((_, delta) => {
		if (group.current && !reduced) group.current.rotation.y -= delta * 0.03;
	});

	return (
		<group ref={group}>
			<points>
				<bufferGeometry>
					<bufferAttribute attach="attributes-position" args={[points, 3]} />
				</bufferGeometry>
				<pointsMaterial color={BLUE} size={0.045} sizeAttenuation transparent opacity={0.8} />
			</points>
			<lineSegments>
				<bufferGeometry>
					<bufferAttribute attach="attributes-position" args={[lines, 3]} />
				</bufferGeometry>
				<lineBasicMaterial color={VIOLET} transparent opacity={0.18} />
			</lineSegments>
		</group>
	);
}

// Glass bar chart whose bars grow in on load and then gently breathe
function BarChart({ reduced }: { reduced: boolean }) {
	const bars = useRef<(THREE.Mesh | null)[]>([]);
	const heights = [0.55, 0.9, 0.7, 1.25, 1.0];

	useFrame((state) => {
		const t = state.clock.elapsedTime;
		bars.current.forEach((bar, i) => {
			if (!bar) return;
			const grow = reduced ? 1 : Math.min(1, Math.max(0, (t - 0.4 - i * 0.12) / 0.8));
			const eased = 1 - Math.pow(1 - grow, 3);
			const breathe = reduced ? 1 : 1 + Math.sin(t * 1.4 + i) * 0.05;
			const h = heights[i] * eased * breathe + 0.001;
			bar.scale.y = h;
			bar.position.y = h / 2;
		});
	});

	return (
		<group position={[-2.3, -1.55, 0.9]} rotation={[0.1, 0.55, 0]}>
			<mesh position={[0.6, -0.03, 0]}>
				<boxGeometry args={[1.75, 0.04, 0.6]} />
				<meshStandardMaterial color="#16203d" transparent opacity={0.8} />
			</mesh>
			{heights.map((_, i) => (
				<mesh
					key={i}
					ref={(el) => {
						bars.current[i] = el;
					}}
					position={[i * 0.3, 0, 0]}
				>
					<boxGeometry args={[0.18, 1, 0.18]} />
					<meshStandardMaterial
						color={i % 2 ? CYAN : VIOLET}
						emissive={i % 2 ? CYAN : VIOLET}
						emissiveIntensity={0.45}
						transparent
						opacity={0.85}
						roughness={0.2}
					/>
				</mesh>
			))}
		</group>
	);
}

// Translucent floating panel with a small line chart traced across it
function GlassPanel({
	position,
	rotation,
	seed,
	reduced,
}: {
	position: [number, number, number];
	rotation: [number, number, number];
	seed: number;
	reduced: boolean;
}) {
	const ref = useRef<THREE.Group>(null);

	const { plane, line } = useMemo(() => {
		const plane = new THREE.PlaneGeometry(1.5, 0.95);
		const pts = Array.from({ length: 8 }, (_, i) => {
			const y = Math.sin(i * 0.9 + seed) * 0.15 + i * 0.03 - 0.1;
			return new THREE.Vector3(-0.6 + i * 0.17, y, 0.01);
		});
		const line = new THREE.Line(
			new THREE.BufferGeometry().setFromPoints(pts),
			new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.9 })
		);
		return { plane, line };
	}, [seed]);

	useFrame((state) => {
		if (!ref.current || reduced) return;
		ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + seed) * 0.12;
	});

	return (
		<group ref={ref} position={position} rotation={rotation}>
			<mesh geometry={plane}>
				<meshStandardMaterial
					color="#a5b4fc"
					transparent
					opacity={0.08}
					side={THREE.DoubleSide}
					roughness={0.1}
				/>
			</mesh>
			<lineSegments>
				<edgesGeometry args={[plane]} />
				<lineBasicMaterial color={BLUE} transparent opacity={0.55} />
			</lineSegments>
			<primitive object={line} />
		</group>
	);
}

// Eases the camera in on load and follows the pointer for parallax
function CameraRig({ reduced }: { reduced: boolean }) {
	useFrame((state) => {
		const { camera, pointer } = state;
		const targetZ = 7.6;
		camera.position.z = reduced ? targetZ : THREE.MathUtils.lerp(camera.position.z, targetZ, 0.03);
		camera.position.x = THREE.MathUtils.lerp(camera.position.x, reduced ? 0 : pointer.x * 0.7, 0.04);
		camera.position.y = THREE.MathUtils.lerp(camera.position.y, reduced ? 0 : pointer.y * 0.45, 0.04);
		camera.lookAt(0, 0, 0);
	});
	return null;
}

export default function HeroScene({
	active,
	reduced,
	compact,
}: {
	active: boolean;
	reduced: boolean;
	compact: boolean;
}) {
	return (
		<Canvas
			camera={{ position: [0, 0, 11], fov: 45 }}
			dpr={[1, 1.75]}
			gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
			frameloop={active ? "always" : "never"}
			aria-hidden
		>
			<ambientLight intensity={0.5} />
			<pointLight position={[4, 3, 4]} intensity={30} color={VIOLET} />
			<pointLight position={[-4, -2, 3]} intensity={20} color={CYAN} />
			<CameraRig reduced={reduced} />
			<DataSphere reduced={reduced} />
			<ParticleNetwork count={compact ? 55 : 110} reduced={reduced} />
			<BarChart reduced={reduced} />
			<GlassPanel position={[2.15, 1.5, -0.6]} rotation={[0, -0.45, 0.04]} seed={1} reduced={reduced} />
			{!compact && (
				<GlassPanel position={[-2.4, 1.3, -1.2]} rotation={[0, 0.5, -0.05]} seed={3} reduced={reduced} />
			)}
		</Canvas>
	);
}
