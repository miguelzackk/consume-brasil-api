const registroInput = document.getElementById("registro")
const registroTBody = document.getElementById("registro-table-body")
const resultLog = document.getElementById("result-log")
const searchButton = document.getElementById("buttonSearch")

const fetchRegistroData = async (registro) => {
    try {
        const response = await fetch(`https://brasilapi.com.br/api/registrobr/v1/${registro}`)

        if (!response.ok) throw new Error("Registro não foi localizado! Tente novamente.")

        const data = await response.json()


        if (!data || !data.fqdn) {
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

const renderRegistro = async (registro) => {
    resultLog.innerText = "Buscando..."

    try {

        const data = await fetchRegistroData(registro)

        if (data) {
            resultLog.innerText = "Resultado da busca"

            const row = registroTBody.insertRow()

            const dominioCell = row.insertCell()
            dominioCell.textContent = data.fqdn

            const statusRCell = row.insertCell()
            statusRCell.textContent = data.status

            const statusPCell = row.insertCell()
            statusPCell.textContent = data["publication-status"]

            const dataExCell = row.insertCell()
            
            if (data["expires-at"]) {
                dataExCell.textContent = new Date(data["expires-at"]).toLocaleDateString("pt-BR")
            } else {
                dataExCell.textContent = "Não informado"
            }

        } else {
            resultLog.innerText = "Registro não localizado. Tente novamente. Verifique se digitou da maneira correta."
        }

    } catch (error) {

        resultLog.innerText = error.message

    }

    registroInput.value = ""

}

searchButton.addEventListener("click", (event) => {
    event.preventDefault()
    const query = registroInput.value.trim()

    if (query) {
        renderRegistro(query)
    } else {
        resultLog.innerText = "Digite um registro."
    }
})