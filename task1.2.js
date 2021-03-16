const csvToJson = require("csvtojson");
const fs = require("fs");
const { pipeline } = require("stream");

const formatEntryToTxtLine = (item) => {
  const { Book, Author, Price } = item;
  return `${JSON.stringify({ book: Book, author: Author, price: +Price })}\n`;
};

const isStreamMode = process.argv[2] === "stream";

const run = async () => {
  // Вычищаем предыдущий результат
  try {
    await fs.promises.writeFile("./txtFromCsv/result.txt", "");
  } catch {
    console.log("Что-то пошло не так");
    return;
  }

  if (isStreamMode) {
    console.log("Режим работы через потоки");

    const readStream = fs.createReadStream("./csv/example.csv");
    const writeStream = fs.createWriteStream("./txtFromCsv/result.txt");

    pipeline(
      readStream,
      csvToJson().subscribe((item) =>
        writeStream.write(formatEntryToTxtLine(item))
      ),
      (err) => {
        if (err) {
          console.error("Ошибка при чтении/записи", err);
        } else {
          console.log("Файл успешно преобразован!");
        }
      }
    );
  } else {
    console.log("Режим работы с полным чтением в оперативку");
    
    try {
      const fileData = await fs.promises.readFile("./csv/example.csv", {
        encoding: "utf-8",
      });

      csvToJson()
        .fromString(fileData)
        .subscribe(
          (item) => {
            return new Promise(async (resolve, reject) => {
              try {
                await fs.promises.appendFile(
                  "./txtFromCsv/result.txt",
                  formatEntryToTxtLine(item)
                );
                resolve();
              } catch {
                reject();
              }
            });
          },
          () => console.log("Ошибка записи"),
          () => console.log("Файл успешно преобразован!")
        );
    } catch {
      console.log("Ошибка чтения");
    }
  }
};

run();
