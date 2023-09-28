/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import "../css/Select.css"

function Select({selected}){
	const [countries, setCountries] = useState([]);
	useEffect(()=>{
		let api = "https://restcountries.com/v3.1/all?fields=name,cca3";
		fetch(api)
		.then(res=>res.json())
		.then(res=>{
			let temp = []
			for(let country of res)
				temp.push({name:country["name"]["common"], code:country["cca3"]});
			setCountries(temp.sort((a, b)=>{return a["name"]>b["name"]}));
		})
		.catch(err=>console.log(err));
	}, []);

	useEffect(()=>{

	}, [selected.get]);

	return (
		<select name="countries" id="countries" onChange={e=>selected.set(e.target.value)}>
			{countries.map(c=>{
				return (
					<option key={c["name"].toLowerCase()} value={c["name"].toLowerCase()} selected={selected.get==c["code"]}>{c["name"]}</option>
				)
			})}
		</select>
	);
}

export default Select;