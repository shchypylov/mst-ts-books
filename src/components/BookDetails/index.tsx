import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import { IBook } from '../../store'

interface IBookDetailsProps {
    book: IBook,
    onDeletion(id: number): void
}

@observer
export default class BookDetails extends Component<IBookDetailsProps> {
    state: {
        isEdit: boolean
    } = {
            isEdit: false
        }

    toggleEditMode = () => {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    getBookForm = (book: IBook): JSX.Element => {
        if (this.state.isEdit) {
            return (
                <div>
                    <label>Project Name:
                        <input
                            type="text"
                            value={book.name}
                            onChange={(e) => book.changeName(e.target.value)} /></label>
                    <label>Project Status:
                         <input
                            type="checkbox"
                            checked={book.isRead}
                            onChange={(e) => book.toggleRead()} /></label>
                </div>
            )
        }
        return (
            <span>{book.name} - {book.isRead ? "active" : "inactive"}</span>
        );
    }

    render(): JSX.Element {
        const { book } = this.props;
        return (
            <>
                <div>
                    {this.getBookForm(book)}
                </div>
                <li>
                    <div onClick={this.toggleEditMode}>Toggle edit mode</div>
                    <div onClick={() => this.props.onDeletion(book.id)}>Delete book</div>
                </li>
            </>
        )
    }
}