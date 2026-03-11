const taxasInput = document.getElementById("taxas")
const taxasTBody = document.getElementById("taxas-table-body")
const resultLog = document.getElementById("result-log")
const searchButton = document.getElementById("buttonSearch")

const fetchTaxasData = async (taxas) => {
    try {
        const response = await fetch(`https://brasilapi.com.br/api/taxas/v1/${taxas}`)
        if (!response.ok) throw new Error("Taxa não foi localizada! Tente novamente.")
        return await response.json()
    } catch (error) {
        console.error(error)
        return null
    }
}

const renderTaxas = async (taxas) => {
    resultLog.innerText = "Buscando..."

    const data = await fetchTaxasData(taxas)

    if (data) {
        resultLog.innerText = "Resultado da busca"

        const row = taxasTBody.insertRow()

        const nomeCell = row.insertCell()
        nomeCell.textContent = data.nome

        const valorCell = row.insertCell()
        valorCell.textContent = data.valor


    } else {
        resultLog.innerText = "Taxa não localizada. Tente novamente. Verifique se digitou da maneira correta."
    }

    taxasInput.value = "";

}

searchButton.addEventListener("click", (event) => {
    event.preventDefault()
    const query = taxasInput.value.trim();
    if (query) renderTaxas(query)
})
