const cnpjInput = document.getElementById("cnpj")
const cnpjTBody = document.getElementById("cnpj-table-body")
const resultLog = document.getElementById("result-log")
const searchButton = document.getElementById("buttonSearch")

const fetchCnpjpData = async (cnpj) => {
    try {
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
        if (!response.ok) throw new Error("Cnpj não foi localizado! Tente novamente.")
        return await response.json()
    } catch (error) {
        console.error(error)
        return null
    }
}

const renderCnpj = async (cnpj) => {
    resultLog.innerText = "Buscando..."

    const cleanCnpj = cnpj.replace(/\D/g, "")
    
    const data = await fetchCnpjpData(cleanCnpj)

    if (data) {
        resultLog.innerText = "Resultado da busca"

        const row = cnpjTBody.insertRow()

        const cnpjCell = row.insertCell()
        cnpjCell.textContent = data.cnpj

        const socialCell = row.insertCell()
        socialCell.textContent = data.razao_social

        const fantasiaCell = row.insertCell()
        fantasiaCell.textContent = data.nome_fantasia

        const cidadeCell = row.insertCell()
        cidadeCell.textContent = data.municipio

        const situacaoCell = row.insertCell()
        situacaoCell.textContent = data.descricao_situacao_cadastral

    } else {
        resultLog.innerText = "Cnpj não localizado. Tente novamente. Verifique se digitou da maneira correta."
    }

    cnpjInput.value = "";

}

searchButton.addEventListener("click", (event) => {
    event.preventDefault()
    const query = cnpjInput.value.trim();
    if (query) renderCnpj(query)
})
