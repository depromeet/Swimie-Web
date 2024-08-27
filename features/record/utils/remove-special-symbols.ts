export const removeSpecialSymbols = (text: string) => {
  return text.replace(/[^a-zA-Z0-9가-힣]/g, '');
};
