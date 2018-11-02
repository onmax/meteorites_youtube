let player, canvas, ctx, hypotenuse;

const FPS = 24;

const apiInfo = {
  videoId: 'L0hfNjhmTpc',
  moreInfo: [{
      title: 'Nombre de la lluvia',
      value: 'Perseidas'
    },
    {
      title: 'Fecha de captura',
      value: new Date()
    },
    {
      title: 'Coordenadas geográficas',
      value: '40.551124 -3.4908171'
    },
    {
      title: 'MALE',
      value: 715
    }
  ]
}

let points = {
  A: undefined,
  B: undefined
};

initCanvas()
initAppState();

setMoreInfo();

moreInfo()