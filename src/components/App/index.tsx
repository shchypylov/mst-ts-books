import React from 'react';
import BookList from '../BooksList';

const App: React.FC = () => {
	return (
		<div className="App">
			<header>Books app</header>
			<BookList/>
		</div>
	);
}

export default App;
