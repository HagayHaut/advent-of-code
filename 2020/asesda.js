function incrementString (str) {
    const sNum = str.match(/\d+$/g);
    if (!sNum) return `${str}1`;
    return str.match(/^\D+/g)[0] + increment(sNum[0]);
  }
  
  function increment(sNum) {
    const len = sNum.length;
    const newNum = +sNum + 1;
    return `${pad(len, newNum)}`;
}

function pad(len, num) {
    let sNum = `${num}`;
    while (sNum.length < len){
        sNum = '0' + sNum;
        console.log(sNum);
    } 
    
    return sNum;
  }

  console.log(incrementString('foobar000'))