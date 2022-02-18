import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { convert } from "./Helper";
import "./App.css";

function App() {
	const [awards, setAwards] = useState([]);

	const apikey = process.env.REACT_APP_RAPID_API_KEY;
	const nconst = process.env.REACT_APP_NCONST;

	useEffect(() => {
		// Fetch data from API
		const fetchAwardedActors = async () => {
			const res = await axios.get(
				"https://imdb8.p.rapidapi.com/actors/get-awards",
				{
					params: { nconst: nconst },
					headers: {
						"x-rapidapi-host": "imdb8.p.rapidapi.com",
						"x-rapidapi-key": apikey,
					},
				}
			);
			const data = await res.data.resource.awards;
			setAwards(data);
		};
		fetchAwardedActors();
	}, [apikey, nconst]);

	// Get new data from helper function
	const newData = convert(awards);

	const chartData = {
		labels: newData.map((data) => data.year),
		datasets: [
			{
				label: "Total awards",
				data: newData.map((data) => data.count),
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
				],
			},
		],
	};

	return (
		<div className='App'>
			<h2>Mirapayments Frontend Assessment</h2>
				<Bar options={{}} data={chartData} />
			<h3>
				{" "}
				Barchart Total awards from each year. Data was gotten from IMDB API provided by
				RapidAPI{" "}
			</h3>
		</div>
	);
}

export default App;
