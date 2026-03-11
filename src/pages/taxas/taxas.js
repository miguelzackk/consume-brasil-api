const taxasInput = document.getElementById("taxas")
const taxasTBody = document.getElementById("taxas-table-body")
const resultLog = document.getElementById("result-log")
const searchButton = document.getElementById("buttonSearch")

const fetchTaxasData = async (taxas) => {
    try {
        const response = await fetch(`https://brasilapi.com.br/api/taxas/v1/${taxas}`)

        if (!response.ok) throw new Error("Taxa não foi localizada! Tente novamente.")

        const data = await response.json()

        if (!data || !data.nome) {
            throw new Error("Resposta inválida da API.")
        }

        return data

    } catch (error) {

        if (error instanceof TypeError) {
            console.error("Erro de conexão:", error)
            throw new Error("Falha de conexão com a API.")
        }

        console.error(error)
        return null
    }
}

const renderTaxas = async (taxas) => {
    resultLog.innerText = "Buscando..."

    try {

        const data = await fetchTaxasData(taxas)

        if (data) {
            resultLog.innerText = "Resultado da busca"

            const row = taxasTBody.insertRow()

            const nomeCell = row.insertCell()
            nomeCell.textContent = data.nome || "Não informado"

            const valorCell = row.insertCell()
            valorCell.textContent = data.valor || "Não informado"

        } else {
            resultLog.innerText = "Taxa não localizada. Tente novamente. Verifique se digitou da maneira correta."
        }

    } catch (error) {

        resultLog.innerText = error.message

    }

    taxasInput.value = ""

}

searchButton.addEventListener("click", (event) => {
    event.preventDefault()
    const query = taxasInput.value.trim()

    if (query) {
        renderTaxas(query)
    } else {
        resultLog.innerText = "Digite uma taxa."
    }
})