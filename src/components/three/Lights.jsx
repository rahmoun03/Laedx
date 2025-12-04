function Lights() {
    return (
        <>
            <directionalLight  position={[0, 500, 500]} intensity={0.05}  />
            <pointLight position={[0, 8, 0]}  intensity={7.5} />
            <spotLight position={[0, 20, 0]}  intensity={15} angle={0.25} penumbra={1}  />
            {/* <ambientLight intensity={0.05} /> */}
        </>
    )
}

export default Lights;