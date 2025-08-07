const speak=(word)=>{
if(!word)
    return
  if (!('speechSynthesis' in window)) {
    console.log('Speech synthesis is not supported in this browser.')
    return
  }
const utterance=new SpeechSynthesisUtterance(word)
//declare the language
utterance.lang='en-US'
//
utterance.rate=0.7
speechSynthesis.speak(utterance)
}
export default speak