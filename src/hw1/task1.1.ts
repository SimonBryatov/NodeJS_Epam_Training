const inputStream = process.stdin;
const outputStream = process.stdout;

inputStream.setEncoding("utf-8");

outputStream.write(`Write something, press 'Enter' and I reverse it:\n`);

inputStream.on("data", (chunk: string) => {
  const originalInput = chunk.trim(); 
  const reversedInput = originalInput.split("").reverse().join("");
  
  outputStream.write('\033[1A\033[2K'); // Очистка ввода пользователя
  outputStream.write(`${originalInput} ${reversedInput}\n`);
});
