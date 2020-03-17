export function getRandom(maxNum: number): number {
  return Math.floor(Math.random() * maxNum);
}

export function getSubstringByRegex(text: string, regex: string): string {
  const subString = text.match(regex) || [];
  if (subString[1]) {
    return subString[1];
  }
  return 'Nothing found';
}
