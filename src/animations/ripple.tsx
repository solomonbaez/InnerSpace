"use client";
import { useRef } from 'react'
import { TorusKnot } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { LayerMaterial, Normal, Fresnel, Displace, Noise } from 'lamina'
import { Displace as Disp, Normal as Norm } from 'lamina/vanilla'

export default function Index() {	
	return (
			<WaveTorus />
	)
}

function WaveTorus() {
	const dispRef = useRef<Disp>(null)
	const normRef = useRef<Norm>(null)
	var begun = false;
	var mod = 10;

	useFrame(({ clock }) => {
		const esp = clock.getElapsedTime()
		const msin = Math.sin(esp)
		
		const u_direction_key = Object.keys(normRef.current!.uniforms).find((key) =>
			key.endsWith('direction')
		)
		if (u_direction_key && begun) {
			normRef.current!.uniforms[u_direction_key].value.set(
				1 + Math.sin(esp),
				1 + Math.sin(esp + Math.PI * 0.8),
				1 + Math.sin(esp + Math.PI)
			)
		} else if (u_direction_key && !begun) {
			
			// gradually adjust rendering pattern
			const fadeIn = Math.sin(esp) / mod;
			mod -= 0.20
			normRef.current!.uniforms[u_direction_key].value.set(fadeIn, fadeIn, fadeIn);

			if (fadeIn >= 1) {
				begun = true
			};
		};

		const u_offset_key = Object.keys(dispRef.current!.uniforms).find((key) =>
			key.endsWith('offset')
		)
		if (u_offset_key && begun) {
			dispRef.current!.uniforms[u_offset_key].value.addScalar(0.005)
		} else if (u_offset_key && !begun) {
			dispRef.current!.uniforms[u_offset_key].value.addScalar(0.005)
		}
	})

	return (
		<TorusKnot args={[1, 0.3, 300, 100, 2, 3]}>
			<LayerMaterial>
				<Normal ref={normRef} />
				<Fresnel mode="multiply" intensity={0.9} power={3} bias={0} />
				<Displace ref={dispRef} mapping="local" type="simplex" strength={0.2} scale={1} />
				<Noise type="simplex" mapping="local" scale={500} colorA="#fff" mode="overlay" />
			</LayerMaterial>
		</TorusKnot>
	)
}