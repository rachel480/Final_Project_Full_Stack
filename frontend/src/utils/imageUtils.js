// פונקציה להמרת מערך מספרים למחרוזת base64
  const bufferToBase64 = (buffer) => {
    const binary = buffer.reduce((acc, byte) => acc + String.fromCharCode(byte), "")
    return window.btoa(binary)
  }
  export default bufferToBase64