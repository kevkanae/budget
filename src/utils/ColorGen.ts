export const generateLinearGradient = (): string => {
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  return `linear-gradient(to right, ${color1}, ${color2})`;
};

const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
