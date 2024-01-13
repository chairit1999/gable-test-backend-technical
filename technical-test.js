const findLongestPrefix = (stringArray) => {
  return stringArray.reduce((previousValue, currentValue) => {
    let prefix = "";
    const currentLength = currentValue.length;
    for (let i = 0; i < previousValue.length; i++) {
      if (i >= currentLength) {
        break;
      }
      if (previousValue[i] == currentValue[i]) {
        prefix += previousValue[i];
      } else break;
    }
    return prefix;
  });
};

//Example 1:
console.log(findLongestPrefix(["flower", "flow", "flight"]));
//Example 2:
console.log(findLongestPrefix(["dog", "racecar", "car"]));
