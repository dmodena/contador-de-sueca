var pontosRodada = { q: 0, j: 0, k: 0, s: 0, a: 0 }
var pontosJogoNos = 0
var pontosJogoEles = 0
var pontosEmpate = 0

var addPts = function (pos) {
  switch (pos) {
    case 'q':
      if (pontosRodada.q < 4) ++pontosRodada.q;
      break;
    case 'j':
      if (pontosRodada.j < 4) ++pontosRodada.j;
      break;
    case 'k':
      if (pontosRodada.k < 4) ++pontosRodada.k;
      break;
    case 's':
      if (pontosRodada.s < 4) ++pontosRodada.s;
      break;
    case 'a':
      if (pontosRodada.a < 4) ++pontosRodada.a;
      break;
  }
  updatePts()
}

var updatePts = function () {
  qBdg.html(pontosRodada.q || '-')
  jBdg.html(pontosRodada.j || '-')
  kBdg.html(pontosRodada.k || '-')
  sBdg.html(pontosRodada.s || '-')
  aBdg.html(pontosRodada.a || '-')

  rodada.html(somaPontosRodada() + ' pontos')
}

var somaPontosRodada = function () {
  return (pontosRodada.q * 2)
    + (pontosRodada.j * 3)
    + (pontosRodada.k * 4)
    + (pontosRodada.s * 10)
    + (pontosRodada.a * 11)
}

var limpaRodada = function () {
  pontosRodada.q = 0
  pontosRodada.j = 0
  pontosRodada.k = 0
  pontosRodada.s = 0
  pontosRodada.a = 0
  $('#bandeirada').addClass('d-none')
  updatePts()
}

var enviaPontos = function () {
  $('#empate').addClass('text-hide')
  if (somaPontosRodada() === 0) {
    $('#bandeirada').removeClass('d-none')
  } else {
    if (somaPontosRodada() < 30) {
      pontosJogoEles += pontosEmpate
      pontosJogoEles += 2
      pontosEmpate = 0
      updatePontosJogos()
    } else if (somaPontosRodada() < 60) {
      pontosJogoEles += pontosEmpate
      pontosJogoEles += 1
      pontosEmpate = 0
      updatePontosJogos()
    } else if (somaPontosRodada() == 60) {
      pontosEmpate += 1
      $('#empate').removeClass('text-hide')
      limpaRodada()
    } else if (somaPontosRodada() < 90) {
      pontosJogoNos += pontosEmpate
      pontosJogoNos += 1
      pontosEmpate = 0
      updatePontosJogos()
    } else if (somaPontosRodada() < 120){
      pontosJogoNos += pontosEmpate
      pontosJogoNos += 2
      pontosEmpate = 0
      updatePontosJogos()
    } else {
      $('#bandeirada').removeClass('d-none')
    }
  }
}

var rejeitaBandeirada = function () {
  if (somaPontosRodada() === 0) {
    pontosJogoEles += pontosEmpate
    pontosJogoEles += 2
    updatePontosJogos()
  }
  else if (somaPontosRodada() === 120) {
    pontosJogoNos += pontosEmpate
    pontosJogoNos += 2
    updatePontosJogos()
  }
  $('#bandeirada').addClass('d-none')
}

var confirmaBandeirada = function () {
  if (somaPontosRodada() === 0) {
    pontosJogoEles += 4
    pontosEmpate = 0
    updatePontosJogos()
  }
  else if (somaPontosRodada() === 120) {
    pontosJogoNos += 4
    pontosEmpate = 0
    updatePontosJogos()
  }
  $('#bandeirada').addClass('d-none')
}

var updatePontosJogos = function () {
  if (pontosJogoNos >= 4) {
    $('#won').removeClass('d-none')
  }
  else if (pontosJogoEles >= 4) {
    $('#lost').removeClass('d-none')
  }
  nos.html(pontosJogoNos)
  eles.html(pontosJogoEles)
  limpaRodada()
}

var resetAll = function () {
  limpaRodada()
  pontosJogoNos = 0
  pontosJogoEles = 0
  pontosEmpate = 0
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
