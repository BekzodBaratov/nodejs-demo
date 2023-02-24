const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb+srv://bekzod:944455537@cluster0.cqkfo3e.mongodb.net/todoDB?retryWrites=true&w=majority")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection error: " + err));

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 63 },
    author: { type: String, required: true, minlength: 3, maxlength: 63 },
    tags: {
      type: Array,
      validate: {
        validator: async function (val) {
          return await (val && val.length > 0);
        },
        message: "Kitobning kamida bitta tagi bolishi kerak.",
      },
    },
    date: { type: Date, default: Date.now() },
    isPublished: Boolean,
    price: {
      type: Number,
      required: function () {
        return this.isPublished;
      },
      min: 10,
      max: 99999999,
    },
    category: { type: String, required: true, enum: ["classic", "biography", "science"] },
  },
  { collection: "todo" }
);

const Book = mongoose.model("todo", bookSchema);

async function createBook() {
  const book = new Book({
    name: "express asoslari",
    author: "Lochin",
    //    tags: ["node", "express"],
    isPublished: true,
    price: 15,
    category: "classic",
  });

  const savedBook = await book.save();
  console.log(savedBook);
}

async function getBooks() {
  const books = await Book
    // .find({ author: /^B/ }) // Muallifning ismi B harfidan boshlangan hujjatni olib beradi.
    // .find({ author: /b$/ }) // Muallifning ismi b harfi bn tugagan ismni olib beradi.
    .find({ author: /.*b.*/i }) // Muallifning ismida b harfi bolsa shu fujjatni olib beradi.
    .count();
  console.log(books);
}

async function updateBook1(id) {
  const book = await Book.findById(id);
  if (!book) return;

  (book.author = "Zem"), (book.isPublished = false);

  const result = await book.save();
  console.log(result);
}

async function updateBook2(id) {
  const result = await Book.findByIdAndUpdate(id, { author: "Bekzod", isPublished: true });
}

async function deleteBook(id) {
  const result = await Book.findByIdAndRemove(id);
}
createBook();
