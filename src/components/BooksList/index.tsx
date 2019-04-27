import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

import {Book, IBook, IBookStore} from '../../store';

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
	
	addBook = (book: IBook): void => {
		const {store} = this.props;
		
		if (store) {
			store.addBook(book)
		}
		
	};
	
	deleteBook = (id: number): void => {
		const {store} = this.props;
		
		if (store) {
			store.deleteBook(id)
		}
	}
	
	handleChange = (input: string) => (value: string) => {
		console.log(` --- `, input);
		console.log(` --- `, value);
		
		this.setState({
			[input]: value
		})
	}
	
	render() {
		const {store} = this.props,
			{bookName, bookStatus} = this.state;
		
		return (
			<div>
				{/*<ul>*/}
				{/*	{books.map((project) => <ProjectDetails*/}
				{/*		key={project.id}*/}
				{/*		project={project}*/}
				{/*		onDeletion={this.deleteProject}/>)}*/}
				{/*</ul>*/}
				<div>
					<label>Project Name:
						<input name="bookName"
						       type="text"
						       value={bookName}
						       onChange={(e) => this.handleChange('bookName')(e.target.value)}/>
					</label>
					{/*<label>Project Status:*/}
					{/*	<input name="bookStatus"*/}
					{/*	       type="checkbox"*/}
					{/*	       checked={bookStatus}*/}
					{/*	       onChange={(e) => this.newProject.toggleActive()}/>*/}
					{/*</label>*/}
				</div>
				{/*<button name="addProjectButton" type="button" onClick={(e) => this.addBook({*/}
				{/*	id: 1,*/}
				{/*	name: bookName,*/}
				{/*	isRead: bookStatus*/}
				{/*})}>add*/}
				{/*	project*/}
				{/*</button>*/}
			</div>
		)
	}
}
