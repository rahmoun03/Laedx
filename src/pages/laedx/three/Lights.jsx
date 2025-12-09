function Lights() {
    return (
        <>
            {/* directionalLight */}
            <directionalLight  position={[0, 500, 500]} intensity={0.05}  />
            
            {/* pointLight */}
            <pointLight position={[0, 8, 6]} intensity={40}  castShadow  />


            {/* spotLight */}
            <spotLight position={[8, 10, 5]}  intensity={30} angle={0.30} penumbra={1} />
            <spotLight position={[-8, 10, 5]}  intensity={15} angle={0.25} penumbra={1} />


            {/* <ambientLight intensity={0.05} /> */}
        </>
    )
}

export default Lights;