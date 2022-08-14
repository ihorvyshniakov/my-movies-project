import React from 'react';
import { Movies } from '../components/Movies';
import { Search } from '../components/Search';
import { Preloader } from '../components/Preloader';

//TODO: -add page for exact film

const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends React.Component {
	state = {
		movies: [],
		loading: true,
	};

	searchMovies = (search, type = 'all') => {
		this.setState({ loading: true });
		fetch(
			`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}${
				type !== 'all' ? `&type=${type}` : ''
			}`
		)
			.then(response => response.json())
			.then(data => this.setState({ movies: data.Search, loading: false }))
			.catch(err => {
				console.error(err);
				this.setState({ loading: false });
			});
	};

	componentDidMount() {
		fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=matrix`)
			.then(response => response.json())
			.then(data => this.setState({ movies: data.Search, loading: false }))
			.catch(err => {
				console.error(err);
				this.setState({ loading: false });
			});
	}

	render() {
		const { movies, loading } = this.state;

		return (
			<main className='container content'>
				<Search searchMovies={this.searchMovies} />
				{loading ? <Preloader /> : <Movies movies={movies} />}
			</main>
		);
	}
}

export default Main;
