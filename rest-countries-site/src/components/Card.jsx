/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../css/Card.css"

function Card({selected}){
	let modelState = {
		"imageURL": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg",
		"imageAlt": "The flag of the Islamic Emirate of Afghanistan has a white field with Arabic inscriptions — the Shahada — in black across its center.",
		"name": "Afghanistan",
		"capital": ["Kabul"],
		"continents": ["Asia"],
		"population": 40218234,
		"area": 652230,
		"currencies": {AFN: {name: "Afghan afghani", symbol: "؋"}},
		"languages": {prs: "Dari", pus: "Pashto", tuk: "Turkmen"},
		"borders": ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"]
	};
	const [state, setState] = useState(modelState);
	
	useEffect(()=>{
		let api = selected.get.length>3?`https://restcountries.com/v3.1/name/${selected.get}`:`https://restcountries.com/v3.1/alpha/${selected.get}`;
		fetch(api)
		.then(res=>res.json())
		.then(res=>{
			modelState.imageURL = res[0].flags.svg;
			modelState.imageAlt = res[0].flags.alt;
			modelState.name = res[0].name.common;
			modelState.capital = res[0].capital;
			modelState.continents = res[0].continents;
			modelState.population = res[0].population;
			modelState.area = res[0].area;
			modelState.currencies = res[0].currencies;
			modelState.languages = res[0].languages!=undefined?res[0].languages:["No official language."];
			modelState.borders = res[0].borders!=undefined?res[0].borders:["No borders with other counties."];

			setState(modelState);
		})
		.catch(err=>console.log(err));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected.get]);

	if(Object.keys(state).length===0)
		return (<div className="card"></div>)

	return (
		<div className="card">
			<div className="section bg-grey">
				<a className="big small-spacer">{state.name}</a>
				<a className="medium">{state.capital}</a>
			</div>
			<div className="section">
				<img src={state.imageURL} alt={state.imageAlt} />
			</div>
			<div className="section bg-grey">
				<a className="medium small-spacer">Population</a>
				<a className="normal spacer">{state.population}</a>
				<a className="medium small-spacer">Languages</a>
				{Object.keys(state.languages).map((val, i)=>{
					let classes = i==Object.keys(state.languages).length-1?"normal spacer":"normal small-spacer";
						return <a key={val} className={classes}>
							{`${val}: ${state.languages[val]}`}
						</a>
				})}
				<a className="medium small-spacer">Currencies</a>
				{Object.keys(state.currencies).map((val, i)=>{
					let classes = i==Object.keys(state.currencies).length-1?"normal":"normal small-spacer";
					return <a key={val} className={classes}>
						{`${val} ${state.currencies[val].symbol}: ${state.currencies[val].name}`}
					</a>
				})}
			</div>
			<div className="section">
				<a className="medium small-spacer">Continent</a>
				{Object.keys(state.continents).map((val, i)=>{
					let classes = i==Object.keys(state.continents).length-1?"normal spacer":"normal small-spacer";
						return <a key={val} className={classes}>
							{state.continents[val]}
						</a>
				})}
				<a className="medium small-spacer">Area</a>
				<a className="normal spacer">{state.area} km²</a>
				<a className="medium small-spacer">Borders</a>
				{Object.keys(state.borders).map((_, i)=>{
					let classes = i==Object.keys(state.borders).length-1?"normal":"normal small-spacer";
					return <button 
						key={state.borders[i]} 
						className={classes} 
						onClick={()=>{
							if(state.borders[i]!="No borders with other counties.")
								selected.set(state.borders[i]);
						}}>
							{state.borders[i]}
					</button>
				})}
			</div>
		</div>
	)
}

export default Card;