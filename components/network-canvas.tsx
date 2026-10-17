"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; z: number };

// A slowly rotating 3D sphere of connected nodes, projected onto a 2D canvas.
// Pauses offscreen and renders a single still frame for reduced motion.
export function NetworkCanvas({ className = "" }: { className?: string }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const count = window.innerWidth < 768 ? 50 : 90;
		const nodes: Node[] = Array.from({ length: count }, () => {
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);
			const r = 0.75 + Math.random() * 0.25;
			return {
				x: r * Math.sin(phi) * Math.cos(theta),
				y: r * Math.sin(phi) * Math.sin(theta),
				z: r * Math.cos(phi),
			};
		});

		let width = 0;
		let height = 0;
		let angle = 0;
		let tiltX = 0;
		let targetTilt = 0;
		let frame = 0;
		let visible = true;

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = canvas.clientWidth;
			height = canvas.clientHeight;
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		const draw = () => {
			ctx.clearRect(0, 0, width, height);
			const radius = Math.min(width, height) * 0.42;
			const cosA = Math.cos(angle);
			const sinA = Math.sin(angle);
			const cosT = Math.cos(tiltX);
			const sinT = Math.sin(tiltX);

			const projected = nodes.map((n) => {
				const x1 = n.x * cosA - n.z * sinA;
				const z1 = n.x * sinA + n.z * cosA;
				const y1 = n.y * cosT - z1 * sinT;
				const z2 = n.y * sinT + z1 * cosT;
				const scale = 1.6 / (2.4 - z2);
				return { x: width / 2 + x1 * radius * scale, y: height / 2 + y1 * radius * scale, z: z2, scale };
			});

			for (let i = 0; i < projected.length; i++) {
				for (let j = i + 1; j < projected.length; j++) {
					const a = projected[i];
					const b = projected[j];
					const dist = Math.hypot(a.x - b.x, a.y - b.y);
					const limit = radius * 0.38;
					if (dist < limit) {
						const depth = (a.z + b.z + 2) / 4;
						ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - dist / limit) * 0.45 * depth})`;
						ctx.lineWidth = 1;
						ctx.beginPath();
						ctx.moveTo(a.x, a.y);
						ctx.lineTo(b.x, b.y);
						ctx.stroke();
					}
				}
			}

			projected.forEach((p) => {
				const depth = (p.z + 1) / 2;
				ctx.fillStyle = `rgba(34, 211, 238, ${0.25 + depth * 0.7})`;
				ctx.beginPath();
				ctx.arc(p.x, p.y, 1.2 + depth * 2.2 * p.scale, 0, Math.PI * 2);
				ctx.fill();
			});
		};

		const loop = () => {
			angle += 0.0025;
			tiltX += (targetTilt - tiltX) * 0.05;
			draw();
			frame = requestAnimationFrame(loop);
		};

		const onPointer = (e: PointerEvent) => {
			const rect = canvas.getBoundingClientRect();
			targetTilt = ((e.clientY - rect.top) / rect.height - 0.5) * 0.8;
		};

		resize();
		window.addEventListener("resize", resize);

		if (reduced) {
			draw();
			return () => window.removeEventListener("resize", resize);
		}

		window.addEventListener("pointermove", onPointer);
		const observer = new IntersectionObserver(([entry]) => {
			const nowVisible = entry.isIntersecting;
			if (nowVisible && !visible) frame = requestAnimationFrame(loop);
			if (!nowVisible) cancelAnimationFrame(frame);
			visible = nowVisible;
		});
		observer.observe(canvas);
		frame = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
			window.removeEventListener("resize", resize);
			window.removeEventListener("pointermove", onPointer);
		};
	}, []);

	return <canvas ref={canvasRef} className={className} aria-hidden />;
}
