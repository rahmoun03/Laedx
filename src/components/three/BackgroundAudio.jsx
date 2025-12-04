import { useEffect } from "react"
import * as THREE from "three"
import { useThree } from "@react-three/fiber"

export default function BackgroundAudio({ url, play }) {
  const { camera, scene } = useThree()

  useEffect(() => {
    const listener = new THREE.AudioListener()
    camera.add(listener)

    const sound = new THREE.Audio(listener)
    const audioLoader = new THREE.AudioLoader()

    audioLoader.load(url, (buffer) => {
      sound.setBuffer(buffer)
      sound.setLoop(true)
      sound.setVolume(0.5)
      if (play) sound.play()
    })
    scene.add(sound)

    return () => {
      if (sound.isPlaying) sound.stop()
      scene.remove(sound)
      camera.remove(listener)
    }
  }, [url, play])

  return null
}
