const Word=require('../models/Word')
const {words}=require('./data')

const insertWord=async()=>{
    const chekWords=await Word.find().lean()
    if(!chekWords.length){
    for(let i=0;i<words.length;i++){ 
        const newWord=await Word.create({
            word:words[i].word,
            translation:words[i].translation,
            img:{
                data:words[i].img.data,
                contentType:words[i].img.contentType
            }
        }) 
         if(!newWord)
            console.log(`error creating wordL${words[i].word}`)
        }
        console.log('words table was filled successfully')
}
}

module.exports={insertWord}