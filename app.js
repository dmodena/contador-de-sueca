if (window.Worker) {
  var myWorker = new Worker('worker.js')
  myWorker.postMessage({ action: 'init' })
  myWorker.onmessage = function (e) {
    console.log(e.data)
  }
}
else {
  $('#container').html('<div class="card text-white bg-danger"><div class="card-body"><h4 class="card-title text-center">Seu navegador não possui suporte a Web Workers</h4><p class="card-text text-center">Por favor, atualize seu navegador.</p></div></div>')
}

var getNos = function () {
  return parseInt($('#nos').text().match(/[0-9]+/)[0])
}

var getEles = function () {
  return parseInt($('#eles').text().match(/[0-9]+/)[0])
}

var getRodada = function () {
  return parseInt($('#rodada').text().match(/[0-9]+/)[0])
}

var addPts = function (pos) {
  myWorker.postMessage({ action: 'adicionaCarta', value: pos })
  myWorker.onmessage = function (e) {
    updatePts(pos, e.data)
  }
}

var updatePts = function (pos, val) {
  if (pos === 'q') qBdg.html(val || '-')
  else if (pos === 'j') jBdg.html(val || '-')
  else if (pos === 'k') kBdg.html(val || '-')
  else if (pos === 's') sBdg.html(val || '-')
  else if (pos === 'a') aBdg.html(val || '-')

  myWorker.postMessage({ action: 'pontosRodada' })
  myWorker.onmessage = function (e) {
    rodada.html(e.data + ' pontos')
  }
}

var limpaRodada = function () {
  myWorker.postMessage({action: 'limpaRodada' })
  myWorker.onmessage = function (e) {
    $('#bandeirada').addClass('d-none')
    $('.badge').each( function () { $(this).html('-') })
    updatePts()
  }
}

var enviaPontos = function () {
  $('#empate').addClass('text-hide')
  if (getRodada() === 0 || getRodada() === 120) {
    $('#bandeirada').removeClass('d-none')
  } else if (getRodada() === 60 ) {
    myWorker.postMessage({ action: 'enviaRodada', value: false })
    myWorker.onmessage = function (e) {
      $('#empate').removeClass('text-hide')
      limpaRodada()
    }
  } else {
    myWorker.postMessage({ action: 'enviaRodada', value: false })
    myWorker.onmessage = function (e) {
      updatePontosJogos(e.data)
    }
  }
}

var updatePontosJogos = function (pontosJogo) {
  if (pontosJogo.nos >= 4) {
    $('#won').removeClass('d-none')
  }
  else if (pontosJogo.eles >= 4) {
    $('#lost').removeClass('d-none')
  }
  nos.html(pontosJogo.nos + (pontosJogo.nos == 1 ? ' ponto' : ' pontos'))
  eles.html(pontosJogo.eles + (pontosJogo.eles == 1 ? ' ponto' : ' pontos'))
  limpaRodada()
}

var rejeitaBandeirada = function () {
  myWorker.postMessage({ action: 'enviaRodada', value: false })
  myWorker.onmessage = function (e) {
    updatePontosJogos(e.data)
    $('#bandeirada').addClass('d-none')
  }
}

var confirmaBandeirada = function () {
  myWorker.postMessage({ action: 'enviaRodada', value: true })
  myWorker.onmessage = function (e) {
    updatePontosJogos(e.data)
    $('#bandeirada').addClass('d-none')
  }
}

var resetAll = function () {
  myWorker.postMessage({ action: 'limpaPontuacao' })
  myWorker.onmessage = function (e) {
    updatePontosJogos(e.data)
    $('#reset').addClass('d-none')
  }
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
