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

var pontuacao = new Pontuacao()

var addPts = function (pos) {
  pontuacao.adicionaCarta(pos)
  updatePts()
}

var updatePts = function () {
  qBdg.html(pontuacao.rodada.q || '-')
  jBdg.html(pontuacao.rodada.j || '-')
  kBdg.html(pontuacao.rodada.k || '-')
  sBdg.html(pontuacao.rodada.s || '-')
  aBdg.html(pontuacao.rodada.a || '-')

  rodada.html(pontuacao.pontosRodada() + ' pontos')
}

var limpaRodada = function () {
  pontuacao.limpaRodada()
  $('#bandeirada').addClass('d-none')
  updatePts()
}

var enviaPontos = function () {
  $('#empate').addClass('text-hide')
  if (pontuacao.pontosRodada() === 0 || pontuacao.pontosRodada() === 120) {
    $('#bandeirada').removeClass('d-none')
  } else if (pontuacao.pontosRodada() === 60 ) {
    pontuacao.enviaRodada()
    $('#empate').removeClass('text-hide')
    limpaRodada()
  } else {
    pontuacao.enviaRodada()
    updatePontosJogos()
  }
}

var updatePontosJogos = function () {
  if (pontuacao.pontosJogo.nos >= 4) {
    $('#won').removeClass('d-none')
  }
  else if (pontuacao.pontosJogo.eles >= 4) {
    $('#lost').removeClass('d-none')
  }
  nos.html(pontuacao.pontosJogo.nos + (pontuacao.pontosJogo.nos == 1 ? ' ponto' : ' pontos'))
  eles.html(pontuacao.pontosJogo.eles + (pontuacao.pontosJogo.eles == 1 ? ' ponto' : ' pontos'))
  limpaRodada()
}

var rejeitaBandeirada = function () {
  pontuacao.enviaRodada(false)
  updatePontosJogos()
  $('#bandeirada').addClass('d-none')
}

var confirmaBandeirada = function () {
  pontuacao.enviaRodada(true)
  updatePontosJogos()
  $('#bandeirada').addClass('d-none')
}

var resetAll = function () {
  pontuacao.limpaPontuacao()
  updatePontosJogos()
  $('#reset').addClass('d-none')
}

var qBtn = $('#q-btn')
var jBtn = $('#j-btn')
var kBtn = $('#k-btn')
var sBtn = $('#s-btn')
var aBtn = $('#a-btn')
var qBdg = $('#q-bdg')
var jBdg = $('#j-bdg')
var kBdg = $('#k-bdg')
var sBdg = $('#s-bdg')
var aBdg = $('#a-bdg')
var corrige = $('#corrige')
var envia = $('#envia')
var nos = $('#nos')
var eles = $('#eles')
var rodada = $('#rodada')
var naoBandeirada = $('#naoBandeirada')
var simBandeirada = $('#simBandeirada')
var limpaTudo = $('#limpaTudo')
var naoReset = $('#naoReset')
var simReset = $('#simReset')

qBtn.click(function () { addPts('q') })
jBtn.click(function () { addPts('j') })
kBtn.click(function () { addPts('k') })
sBtn.click(function () { addPts('s') })
aBtn.click(function () { addPts('a') })
corrige.click(function () { limpaRodada() })
envia.click(function () { enviaPontos() })
naoBandeirada.click(function () { rejeitaBandeirada() })
simBandeirada.click(function () { confirmaBandeirada() })
limpaTudo.click(function () { $('#reset').removeClass('d-none') })
naoReset.click(function() { $('#reset').addClass('d-none') })
simReset.click(function() { resetAll() })
