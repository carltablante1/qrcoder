import { useState } from 'react'
import './App.css'
import { Html5Qrcode } from 'html5-qrcode'

function App() {
  const [qrMessage, setQrMessage] = useState('')

  const handleUpload = async (event) => {
    try {
      const inputFile = event.target.files[0]

      const html5qrcode = new Html5Qrcode('reader')
      const decodedMessage = await html5qrcode.scanFile(inputFile, false)

      setQrMessage(decodedMessage)
    } catch (e) {
      return "Something went wrong!"
    }
  }

  return (
    <>
      <h1>Test</h1>
      <div>
        <div id="reader"></div>
        <input type="file" id="qr-input-file" accept="image/*" onChange={handleUpload} />

        <p>{ qrMessage }</p>
      </div>
    </>
  )
}

export default App
