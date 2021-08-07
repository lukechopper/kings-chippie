function reverseEscapeHtml(reverseString){
    return reverseString
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
 }

 module.exports = {
     reverseEscapeHtml
 };