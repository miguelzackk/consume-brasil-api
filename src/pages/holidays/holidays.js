const search = document.getElementById("search-button");
const table = document.getElementById("holidays-table");

search.addEventListener("click", getHolidaysData);

async function getHolidaysData() {
	const apiUrl = "https://brasilapi.com.br/api/feriados/v1/";
	const yearValue = document.getElementById("year").value;

	if (yearValue !== "" && !isNaN(yearValue)) {
		try {
			const response = await fetch(`${apiUrl}${yearValue}`);

			if (!response.ok) {
				throw new Error("Não foi possível buscar informações sobre o "
					+ "ano buscado!");
			}

			const data = await response.json();
			console.clear();
			console.table(data);

			while (table.rows.length > 1) {
				table.deleteRow(1);
			}

			for (let i = 0; i < data.length; i++) {
				const newRow = table.insertRow();

				newRow.insertCell().textContent = data[i].date;
				newRow.insertCell().textContent = data[i].name;
				newRow.insertCell().textContent = data[i].type;
			}

		} catch (error) {
			alert(error);
			console.error(error);
		}
	} else {
		alert("Digite um valor válido!");
	}
}
