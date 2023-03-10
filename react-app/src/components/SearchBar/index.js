import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [results, setResults] = useState([]);
  const [dropdown, setDropDown] = useState(false)
	console.log('search query', searchQuery);
	console.log('results', results);

	const handleSearchQuery = async (e) => {
		e.preventDefault();

		if (searchQuery.trim() === '') return;

		try {
			const res = await fetch(`/api/products/search?query=${searchQuery}`);
			const data = await res.json();
      setDropDown(true)
			setResults(data.retrieve_products);
		} catch (err) {
			console.error(err);
		}
	};
  const handleKeyPress = (e) =>{
    if(e.keyCode === 'Enter'){
      handleSearchQuery()
    }
  }
  
	return (
		<form  className='search-bar-container' onSubmit={handleSearchQuery}>
			<div>
				<div className='search-bar-form'>
					<input
						className='search-input'
						type='search'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder='Search'
            onKeyDown={handleKeyPress}

					/>

					{searchQuery.length ? (
						<div className='results-dropdown'

            >
							{results.map((product) => (
								<div
									className='result-name font-12'
									key={product.id}
									value={product.id}

								>
									<NavLink to={`products/${product.id}`}>
										{product.product_name}
									</NavLink>
								</div>
							))}
						</div>
					) : (
						<div></div>
					)}
				</div>
			</div>
		</form>
	);
};

export default SearchBar;
