import { Button } from 'antd'
import Hls from 'hls.js'
import { useEffect, useRef } from 'react'
/* eslint-disable  @typescript-eslint/no-unsafe-call*/
/* eslint-disable  @typescript-eslint/no-unsafe-member-access*/
function App() {
	const videoRef = useRef<HTMLVideoElement | null>(null)

	useEffect(() => {
		const video = videoRef.current

		if (!video) return

		if (
			Hls.isSupported() &&
			window.MediaSource?.isTypeSupported('video/mp4;codecs="av01.0.01M.08"')
		) {
			const hls = new Hls()

			hls.on(Hls.Events.MEDIA_ATTACHED, () => {
				console.log('video and hls.js are now bound together!')
			})
			hls.loadSource('https://ireplay.tv/test/blender.m3u8')
			hls.attachMedia(video)

			return () => {
				hls.destroy() // Cleanup on unmount
			}
		}
	}, [])

	return (
		<div className="App">
			<Button type="primary">Button</Button>
			<video ref={videoRef} controls></video>
		</div>
	)
}
export default App
