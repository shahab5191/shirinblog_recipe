export const randomAlphaNumeric = (firstPart: number = 5, secondPart: number = 5, numberPart: number = 5) => {
  let str = ""
  if(firstPart > 0){
    for (let i = 0; i < firstPart; i++) {
      var char = Math.random() * 26 + 97
      str += String.fromCharCode(char)
    }
  }
  str += " "
  if(secondPart > 0){
    for (let i = 0; i < secondPart; i++) {
      var char = Math.random() * 26 + 97
      str += String.fromCharCode(char)
    }
  }
  if(numberPart > 0){
    for (let i = 0; i < secondPart; i++) {
      var char = Math.floor(Math.random() * 9)
      str += char
    }
  }
  return str
}

export const randomAlphaString = (length: number = 15) => {
  let str = ""
  for(let i = 0; i < length; i++){
    var char = Math.random() * 26 + 97
    str += String.fromCharCode(char)
  }
  return str
}
