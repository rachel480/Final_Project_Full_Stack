const downloadWordFile=(words,fileName='words.doc')=>{
    //create the table for file
    const tableHTML = `
    <table border="1" style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th>#</th>
          <th>Word</th>
          <th>Translate</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        ${words.map((word, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${word.word}</td>
            <td>${word.translation}</td>
            <td>${word.categoryName}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `
  // Header and footer tags to make the HTML content compatible with MS Word format
  const header = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset="utf-8"><title>Export HTML To Word Document</title></head><body>`
  const footer = `</body></html>`
  const sourceHTML = header + tableHTML + footer
  
  //create an object that containes the file's data
  const blob=new Blob(['\ufeff',sourceHTML],{type:'application/msword'})
  
  //create a url for the blob-file
  const url=URL.createObjectURL(blob)
  
  //create the link element
  const link=document.createElement('a')
  link.href=url
  link.download=fileName
  
  //add a temporary link in the body
  document.body.appendChild(link)
  //auto click of the link
  link.click()
  //remove the link after usage
  document.body.removeChild(link)
  //remove the url
  URL.revokeObjectURL(url)
}
export default downloadWordFile