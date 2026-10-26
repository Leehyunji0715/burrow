/** FormData 값은 문자열 또는 File 이다. 텍스트 입력만 읽으므로 문자열이 아니면 빈 값으로 본다 */
export const formText = (data: FormData, name: string) => {
  const value = data.get(name);
  return typeof value === 'string' ? value : '';
};
