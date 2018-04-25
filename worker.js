importScripts('pontuacao.js')

var pontuacao = new Pontuacao()

this.onmessage = function (e) {
  switch (e.data.action) {
    case 'init':
      this.postMessage('Web worker loaded.')
      break
    case 'adicionaCarta':
      pontuacao.adicionaCarta(e.data.value)
      this.postMessage(pontuacao.rodada[e.data.value])
      break
    case 'limpaRodada':
      pontuacao.limpaRodada()
      this.postMessage({ rodada: pontuacao.rodada, soma: pontuacao.pontosRodada() })
      break
    case 'pontosRodada':
      this.postMessage(pontuacao.pontosRodada())
      break
    case 'enviaRodada':
      pontuacao.enviaRodada(e.data.value)
      this.postMessage(pontuacao.pontosJogo)
      break
    case 'limpaPontuacao':
      pontuacao.limpaPontuacao()
      this.postMessage(pontuacao.pontosJogo)
      break
  }
}
