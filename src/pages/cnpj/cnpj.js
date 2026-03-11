const cnpjInput = document.getElementById("cnpj")
const cnpjTBody = document.getElementById("cnpj-table-body")
const resultLog = document.getElementById("result-log")
const searchButton = document.getElementById("buttonSearch")

const fetchCnpjpData = async (cnpj) => {
    try {
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)

        if (!response.ok) throw new Error("Cnpj não foi localizado! Tente novamente.")

        const data = await response.json()

  
        if (!data || !data.cnpj) {
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

const renderCnpj = async (cnpj) => {
    resultLog.innerText = "Buscando..."

    const cleanCnpj = cnpj.replace(/\D/g, "")

    try {

        const data = await fetchCnpjpData(cleanCnpj)

        if (data) {
            resultLog.innerText = "Resultado da busca"

            const row = cnpjTBody.insertRow()

            const cnpjCell = row.insertCell()
            cnpjCell.textContent = data.cnpj || "Não informado"

            const socialCell = row.insertCell()
            socialCell.textContent = data.razao_social || "Não informado"

            const fantasiaCell = row.insertCell()
            fantasiaCell.textContent = data.nome_fantasia || "Não informado"

            const cidadeCell = row.insertCell()
            cidadeCell.textContent = data.municipio || "Não informado"

            const situacaoCell = row.insertCell()
            situacaoCell.textContent = data.descricao_situacao_cadastral || "Não informado"

        } else {
            resultLog.innerText = "Cnpj não localizado. Tente novamente. Verifique se digitou da maneira correta."
        }

    } catch (error) {

        resultLog.innerText = error.message

    }

    cnpjInput.value = ""
}

searchButton.addEventListener("click", (event) => {
    event.preventDefault()
    const query = cnpjInput.value.trim()

    if (query) {
        renderCnpj(query)
    } else {
        resultLog.innerText = "Digite um CNPJ."
    }
})