const search = document.getElementById("search-button");
const list = document.getElementById("list-button");

const tableBank = document.getElementById("bank-table");
const tableBankList = document.getElementById("banks-list-table");

search.addEventListener("click", getBankData);
list.addEventListener("click", getBanksListData);

async function getBankData() {
	const apiUrl = "https://brasilapi.com.br/api/banks/v1/";
	const bankCodeValue = document.getElementById("bankCode").value;

	if (bankCodeValue !== "" && !isNaN(bankCodeValue)) {
		try {
			const response = await fetch(`${apiUrl}${bankCodeValue}`);

			if (!response.ok) {
				throw new Error("Não foi possível buscar informações sobre "
					+ "esse banco!");
			}

			const data = await response.json();
			console.clear();
			console.table(data);

			while (tableBank.rows.length > 1) {
				tableBank.deleteRow(1);
			}

			const newRow = tableBank.insertRow();

			newRow.insertCell().textContent = data.code;
			newRow.insertCell().textContent = data.name;
			newRow.insertCell().textContent = data.ispb;

		} catch (error) {
			alert(error);
			console.error(error);
		}
	} else {
		alert("Digite um valor válido!");
	}
}

async function getBanksListData() {
	const apiUrl = "https://brasilapi.com.br/api/banks/v1";

	try {
		const response = await fetch(`${apiUrl}`);

		if (!response.ok) {
			throw new Error("Não foi possível listar todos os bancos!");
		}

		const data = await response.json();
		console.clear();
		console.table(data);

		if (tableBankList.classList.contains("hidden")) {
			tableBankList.classList.remove("hidden");
		} else {
			tableBankList.classList.add("hidden");
		}

		while (tableBankList.rows.length > 1) {
			tableBankList.deleteRow(1);
		}

		for (let i = 0; i < data.length; i++) {
			const newRow = tableBankList.insertRow();

			newRow.insertCell().textContent = data[i].code;
			newRow.insertCell().textContent = data[i].name;
			newRow.insertCell().textContent = data[i].ispb;
		}

	} catch (error) {
		alert(error);
		console.error(error);
	}
}
