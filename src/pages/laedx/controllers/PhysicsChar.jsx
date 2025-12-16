import { RigidBody } from "@react-three/rapier";

export default function PhysicsChar({ children, rigidRef }) {
	return (
		<RigidBody
			ref={rigidRef}
			type="kinematicPosition"
			colliders="hull"
			enabledRotations={[true, true, true]}
			enabledTranslations={[true, true, true]}
		>
			{children}
		</RigidBody>
	);
}
