import { useState } from 'react'
import './App.css'
import { Html5Qrcode } from 'html5-qrcode'
import QRCode from 'qrcode'

function App() {
  const [qrMessage, setQrMessage] = useState('')
  const [qrCodeImage, setQrCodeImage] = useState('')

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const inputFiles = event?.target?.files

      if (inputFiles) {
        const html5qrcode = new Html5Qrcode('reader')
        const decodedMessage = await html5qrcode.scanFile(inputFiles[0], false)

        setQrMessage(decodedMessage)
      }
    } catch (e) {
      return "Something went wrong!"
    }
  }

  const generateQRCode = async () => {
    const code = await QRCode.toDataURL(qrMessage)

    setQrCodeImage(code)
  }

  return (
    <>
      <h1>Test</h1>
      <div>
        <div id="reader"></div>
        <input type="file" id="qr-input-file" accept="image/*" onChange={handleUpload} />

        <p>{ qrMessage }</p>

        { qrMessage && <button onClick={generateQRCode}>Generate QR Code</button> }

        { qrCodeImage && <img src={qrCodeImage} alt="QR Code" /> }
      </div>
    </>
  )
}

export default App
