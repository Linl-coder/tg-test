
let str="​‎‌‎‌‎​‎​‎‌‎​‎‍‎​‎‌‎​‎​‎‌‎‌‎​‎‍‎​‎​‎​‎‌‎‌‎‌‎‍‎​‎‌‎‌‎​‎​‎‌‎​‎‍‎​‎​‎​‎​‎‌‎‌‎​‎‍‎​‎​‎‌‎‌‎​‎‌‎‍‎​‎‌‎‌‎​‎‌‎​‎​‎‍‎​‎‌‎​‎‌‎​‎​‎​‎‍‎​‎‌‎​‎‌‎‌‎‌‎‌‎‍‎​‎​‎‌‎‌‎​‎​";

// str -> 零宽字符
function strToZeroWidth(str) {
  return str
    .split('')
    .map(char => char.charCodeAt(0).toString(2)) // 1 0 空格
    .join(' ')
    .split('')
    .map(binaryNum => {
      if (binaryNum === '1') {
        return '​'; // ​
      } else if (binaryNum === '0') {
        return '‌'; // ‌
      } else {
        return '‍'; // ‍
      }
    })
    .join('‎') // ‎
}
// 零宽字符 -> str
function zeroWidthToStr(zeroWidthStr) {
  return zeroWidthStr
    .split('‎') // ‎
    .map(char => {
      if (char === '​') { // ​
        return '1';
      } else if (char === '‌') { // ‌
        return '0';
      } else { // ‍
        return ' ';
      }
    })
    .join('')
    .split(' ')
    .map(binaryNum => String.fromCharCode(parseInt(binaryNum, 2)))
    .join('')
}

