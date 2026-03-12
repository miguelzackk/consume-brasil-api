const search = document.getElementById("search-button");
const tableState = document.getElementById("ddd-state-table");
const tableCity = document.getElementById("ddd-city-table");

search.addEventListener("click", getDddData);

async function getDddData() {
	const apiUrl = "https://brasilapi.com.br/api/ddd/v1/";
	const dddValue = document.getElementById("ddd").value;

	if (dddValue !== "" && !isNaN(dddValue)) {
		try {
			const response = await fetch(`${apiUrl}${dddValue}`);

			if (!response.ok) {
				throw new Error("Não foi possível buscar informações sobre "
					+ "esse DDD!");
			}

			const data = await response.json();
			console.clear();
			console.table(data);

			while (tableState.rows.length > 1) {
				tableState.deleteRow(1);

			}

			while (tableCity.rows.length > 1) {
				tableCity.deleteRow(1);
			}

			const newRowState = tableState.insertRow();
			newRowState.insertCell().textContent = data.state;

			for (let i = 0; i < data.cities.length; i++) {
				const newRowCity = tableCity.insertRow();
				newRowCity.insertCell().textContent = data.cities[i];
			}

		} catch (error) {
			alert(error);
			console.error(error);
		}
	} else {
		alert("Digite um valor válido!");
	}
}
