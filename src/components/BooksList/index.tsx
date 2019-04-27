import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { Book, IBook, IBookStore, } from '../../store';
import BookDetails from '../BookDetails'

interface IBooksListProps {
	store?: IBookStore
}

@inject('store')
@observer
export default class BooksList extends Component<IBooksListProps> {

	state = {
		bookName: '',
		bookStatus: false
	}

	addBook = (): void => {
		const { store } = this.props,
			{ bookName, bookStatus } = this.state;

		if (store) {
			store.addBook(Book.create({
				id: 0,
				name: bookName,
				isRead: !!bookStatus
			}) as IBook)
		}
	};

	deleteBook = (id: number): void => {
		const { store } = this.props;

		if (store) {
			store.deleteBook(id)
		}
	}

	handleChange = (input: string) => (value: string) => {
		this.setState({
			[input]: value
		})
	}

	render() {
		const { store } = this.props,
			{ bookName, bookStatus } = this.state;

		return (
			<div>
				<ul>
					{store && store.books.map((book) => <BookDetails
						key={book.id}
						book={book}
						onDeletion={this.deleteBook} />)}
				</ul>
				<div>
					<label>Project Name:
						<input name="bookName"
							type="text"
							value={bookName}
							onChange={(e) => this.handleChange('bookName')(e.target.value)} />
					</label>
					<label>Project Status:
						<input name="bookStatus"
							type="checkbox"
							checked={bookStatus}
							onChange={(e) => this.handleChange('bookStatus')(e.target.value)} />
					</label>
				</div>
				<button
					name="addProjectButton"
					type="button"
					onClick={this.addBook}>
					Add book
				</button>
			</div>
		)
	}
}
