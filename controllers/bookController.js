
import Book from '../models/Book.js';
import Author from '../models/Author.js';   

const createBook = async (req, res) => {
    try {
        /**
         * 1.- Registrar Authors en Base de Datos
         * 2.- Registrar Book con esos authors
         */
        const { authors, book } = req.body;

    if(!Array.isArray(authors) || !book) {

        return res.status(400).json({
            msg: 'Body incorrecto',
        });
    }
        //[objs] -> [Promesas]
        const authorPromises = authors.map((elem) => {
            return Author.create(elem); 
        });

       const authorModels =await Promise.all(authorPromises); //regresa todas las promesas

       const authorIds = authorModels.map((model) => {
        return model.id;
           
       });

book.authors = authorIds;  

const newBook  = await Book.create(book);
     return res.json(newBook);
} catch (error) {
    res.status(500).json({
        msg: 'Error al crear el libro',
        error,
    });
}
}

//const createBook = async (req, res) => {
  //  try {

        
        /**
         * req.body {
         * authors []
         * book
         * }
        */
       
    //   let authorsData = req.body.authors;
      // const bookData = req.body.book;
       
       //if (!authorsData || !bookData) {
         //  res.status(400).json({
           //    msg: 'authorsData or bookData is missing', 
            //});
        //}
        
        //if (!Array.isArray (authorsData)) {
          //  res.status(400).json({
            //    msg: 'authorsData must be an array', 
            //});
        //}
        
        //Crear autores
        // [objetos] -> [schemas]
        //authorsData = authorsData.map((author) => { 
          //  return new Author(author); 
        //});
        
        
        //Crear libro con autores de arriba
        /**
         * 1.- Crear el autores
         * 2.- Crear el libro
        */
       
       //const newBook = await Book.create({
         //  genre: bookData.genre,
           //isbn: bookData.isbn,
           //title: bookData.title,
           //year: bookData.year,
           //authors: authorsData,
        //});
        
        //res.json(newBook);
    //} catch (error) {
        //res.status(500).json({
            //msg: 'Error al crear book',
            //error,
        //});
    //}       
    //};

    const getBookById = async (req, res) => {
        
        try {
            //buscar un libro por id
            const book = await Book.findById(req.params.bookId).populate('authors');

            if(!book) {
               return res.status(404).json({
                    msg: 'Libro no encontrado',
                });
            }
            //responder ese libro
          return res.json(book);
        } catch (error) {
           return res.status(500).json({
                msg: 'Error al buscar el libro por Id',
                error,
            }); 
    }
};

const getAllBooks = async (req, res) => {
    
    try {
        //buscar un libro por id
        const book = await Book.find({});

        if(!book) {
           return res.status(404).json({
                msg: 'Libros no encontrados',
            });
        }
        //responder ese libro
       return res.json(book);
    } catch (error) {
       return res.status(500).json({
            msg: 'Error al buscar los libros',
            error,
        }); 
}

}


export { createBook, getBookById, getAllBooks };