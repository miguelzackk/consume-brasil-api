const search = document.getElementById("search-button");
const list = document.getElementById("list-button");

const tableCurrency = document.getElementById("currency-table");
const tableExchange = document.getElementById("exchange-table");
const tableCurrencyList = document.getElementById("currency-list-table");

search.addEventListener("click", getExchangeData);
list.addEventListener("click", getCurrencyListData);

async function getExchangeData() {
	const apiUrl = "https://brasilapi.com.br/api/cambio/v1/cotacao/";
	const currencyValue = document.getElementById("currency").value;
	const dateValue = document.getElementById("date").value;
	const date = dateValue.split("-");

	if (currencyValue !== "") {
		try {
			const response = await fetch(
				`${apiUrl}${currencyValue}/${date[0]}-${date[1]}-${date[2]}`
			);

			if (!response.ok) {
				throw new Error("Não foi possível buscar informações sobre "
					+ "a cotação desse dia!");
			}

			const data = await response.json();
			console.clear();
			console.table(data);

			while (tableCurrency.rows.length > 1) {
				tableCurrency.deleteRow(1);

			}

			while (tableExchange.rows.length > 1) {
				tableExchange.deleteRow(1);
			}

			const newRow = tableCurrency.insertRow();

			newRow.insertCell().textContent = data.moeda;
			newRow.insertCell().textContent = data.data;

			for (let i = 0; i < data.cotacoes.length; i++) {
				const newRow = tableExchange.insertRow();

				newRow.insertCell().textContent = data.cotacoes[i].paridade_compra;
				newRow.insertCell().textContent = data.cotacoes[i].paridade_venda;
				newRow.insertCell().textContent = data.cotacoes[i].cotacao_compra;
				newRow.insertCell().textContent = data.cotacoes[i].cotacao_venda;
				newRow.insertCell().textContent = data.cotacoes[i].data_hora_cotacao;
				newRow.insertCell().textContent = data.cotacoes[i].tipo_boletim;
			}

		} catch (error) {
			alert(error);
			console.error(error);
		}
	} else {
		alert("Digite um valor válido!");
	}
}

async function getCurrencyListData() {
	const apiUrl = "https://brasilapi.com.br/api/cambio/v1/moedas";

	try {
		const response = await fetch(`${apiUrl}`);

		if (!response.ok) {
			throw new Error("Não foi possível listar todas as moedas!");
		}

		const data = await response.json();
		console.clear();
		console.table(data);

		if (tableCurrencyList.classList.contains("hidden")) {
			tableCurrencyList.classList.remove("hidden");
		} else {
			tableCurrencyList.classList.add("hidden");
		}

		while (tableCurrencyList.rows.length > 1) {
			tableCurrencyList.deleteRow(1);
		}

		for (let i = 0; i < data.length; i++) {
			const newRow = tableCurrencyList.insertRow();

			newRow.insertCell().textContent = data[i].simbolo;
			newRow.insertCell().textContent = data[i].nome;
			newRow.insertCell().textContent = data[i].tipo_moeda;
		}

	} catch (error) {
		alert(error);
		console.error(error);
	}
}
