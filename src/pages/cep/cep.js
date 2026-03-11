const cepInput = document.getElementById("cep")
const cepTBody = document.getElementById("cep-table-body")
const resultLog = document.getElementById("result-log")
const searchButton = document.getElementById("buttonSearch")

const fetchCepData = async (cep) => {
    try {
        const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`)

        if (!response.ok) {
            throw new Error("Cep não foi localizado! Tente novamente.")
        }

        const data = await response.json()

        if (!data || !data.cep) {
            throw new Error("Resposta inválida da API.")
        }

        return data

    } catch (error) {

        if (error instanceof TypeError) {
            console.error("Erro de conexão:", error)
            throw new Error("Falha de conexão com a API.")
        }

        console.error(error)
        throw error
    }
}

const renderCep = async (cep) => {
    resultLog.innerText = "Buscando..."

    try {

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

    } catch (error) {
        resultLog.innerText = error.message
    }
    cepInput.value = ""
}
searchButton.addEventListener("click", (event) => {
    event.preventDefault()
    const query = cepInput.value.trim();
    if (query) {
        renderCep(query)
    } else {
        resultLog.innerText = "Digite um CEP."
    }
})