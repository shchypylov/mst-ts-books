import {types} from 'mobx-state-tree';
import {IObservableArray} from "mobx";

const generateUniqueId = (books: IObservableArray<IBook>): number => {
	let id = 0;
	books.map(book => book.id).forEach((item, index) => {
		if (item != index) {
			id = item;
		}
	});
	
	if (books.find(book => book.id == id)) {
		id = books.length;
	}
	
	return id;
};

const Book = types
	.model('Book', {
		id: types.number,
		name: types.string,
		isRead: types.optional(types.boolean, false)
	})
	.actions(self => ({
		changeName(newName: string): void {
			self.name = newName
		},
		toggleRead(): void {
			self.isRead = !self.isRead
		}
	}));

export type IBook = typeof Book.Type;

const BookStore = types
	.model('BookStore', {
		books: types.array(Book)
	})
	.actions(self => ({
		addBook(newBook: IBook): void {
			const id = generateUniqueId(self.books);
			
			self.books.push({
				id,
				name: newBook.name,
				isRead: newBook.isRead
			} as IBook)
			
		},
		deleteBook(id: number): void {
			const index = self.books.findIndex(item => item.id === id);
			
			self.books.splice(index, 1)
		}
	}));

export type IBookStore = typeof BookStore.Type

const bookStore = BookStore.create({
	books: [],
})

export {Book, BookStore}

export default BookStore
