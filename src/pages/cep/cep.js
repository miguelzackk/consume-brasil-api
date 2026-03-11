const cepInput = document.getElementById("cep")
const cepTBody = document.getElementById("cep-table-body")
const resultLog = document.getElementById("result-log")
const searchButton = document.getElementById("buttonSearch")

const fetchCepData = async (cep) => {
    try {
        const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`)
        if (!response.ok) throw new Error("Cep não foi localizado! Tente novamente.")
        return await response.json()
    } catch (error) {
        console.error(error)
        return null
    }
}

const renderCep = async (cep) => {
    resultLog.innerText = "Buscando..."

    const data = await fetchCepData(cep)

    if (data) {
        resultLog.innerText = "Resultado da busca"

        const row = cepTBody.insertRow()

        const cepCell = row.insertCell()
        cepCell.textContent = data.cep

        const estadoCell = row.insertCell()
        estadoCell.textContent = data.state

        const cidadeCell = row.insertCell()
        cidadeCell.textContent = data.city

        const bairroCell = row.insertCell()
        bairroCell.textContent = data.neighborhood

        const ruaCell = row.insertCell()
        ruaCell.textContent = data.street

    } else {
        resultLog.innerText = "Cep não localizado. Tente novamente. Verifique se digitou da maneira correta."
    }

    cepInput.value = "";

}

searchButton.addEventListener("click", (event) => {
    event.preventDefault()
    const query = cepInput.value.trim();
    if (query) renderCep(query)
})
