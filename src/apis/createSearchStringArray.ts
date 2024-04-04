function createSearchStringArray(text: string) {
  const result = [];
  const charArray = text.split('');

  for (
    let searchKeywordLength = 1;
    searchKeywordLength <= text.length;
    searchKeywordLength++
  ) {
    // 시작 인덱스 설정
    for (
      let startIndex = 0;
      startIndex <= charArray.length - searchKeywordLength;
      startIndex++
    ) {
      const endIndex = startIndex + searchKeywordLength - 1;
      result.push(charArray.slice(startIndex, endIndex + 1).join(''));
    }
  }

  return result;
}

export default createSearchStringArray;
