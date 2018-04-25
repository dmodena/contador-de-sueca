var Pontuacao = function () {
  this.rodada = { q: 0, j: 0, k: 0, s: 0, a: 0 }
  this.pontosJogo = { nos: 0, eles: 0 }
  this.empate = 0

  this.pontosRodada = function () {
    return this.rodada.q * 2
      + this.rodada.j * 3
      + this.rodada.k * 4
      + this.rodada.s * 10
      + this.rodada.a * 11
  }

  this.adicionaCarta = function (carta) {
    switch (carta) {
      case 'q':
        if (this.rodada.q < 4) ++this.rodada.q
        break;
      case 'j':
        if (this.rodada.j < 4) ++this.rodada.j
        break;
      case 'k':
        if (this.rodada.k < 4) ++this.rodada.k
        break;
      case 's':
        if (this.rodada.s < 4) ++this.rodada.s
        break;
      case 'a':
        if (this.rodada.a < 4) ++this.rodada.a
        break;
    }
  }

  this.limpaRodada = function () {
    this.rodada.q = 0
    this.rodada.j = 0
    this.rodada.k = 0
    this.rodada.s = 0
    this.rodada.a = 0
  }

  this.enviaRodada = function (bandeirada) {
    var soma = this.pontosRodada()
    if (soma === 0) {
      this.pontosJogo.eles += this.empate
      this.empate = 0
      this.pontosJogo.eles += 2
      if (bandeirada) this.pontosJogo.eles += 2
    } else if (soma < 30) {
      this.pontosJogo.eles += this.empate
      this.empate = 0
      this.pontosJogo.eles += 2
    } else if (soma < 60) {
      this.pontosJogo.eles += this.empate
      this.empate = 0
      this.pontosJogo.eles += 1
    } else if (soma === 60) {
      this.empate += 1
    } else if (soma < 90) {
      this.pontosJogo.nos += this.empate
      this.empate = 0
      this.pontosJogo.nos += 1
    } else if (soma < 120) {
      this.pontosJogo.nos += this.empate
      this.empate = 0
      this.pontosJogo.nos += 2
    } else {
      this.pontosJogo.nos += this.empate
      this.empate = 0
      this.pontosJogo.nos += 2
      if (bandeirada) this.pontosJogo.nos += 2
    }
  }

  this.limpaPontuacao = function () {
    this.limpaRodada()
    this.pontosJogo.nos = 0
    this.pontosJogo.eles = 0
    this.empate = 0
  }
}
