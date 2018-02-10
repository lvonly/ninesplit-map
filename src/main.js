function createArea(name, link, x, y, w, h) {
  return createRectArea(name, link, y * h, (y + 1) * h, x * w, (x + 1) * h);
}

function createRectArea(name, link, top, bottom, left, right, target) {
  var area = document.createElement('area');
  area.href = link;
  area.alt = name;
  area.title = name;
  area.shape = "rect";
  area.coords = left + ',' + top + ',' + right + ',' + bottom;
  if (target) {
    area.target = target;
  } else {
    area.download = name;
  }
  return area;
}

function doMapify(ns, mapImage) {
  var mapImageWidth = mapImage.width() / 3;
  var mapImageHeight = (mapImage.height() - 14) / 3;

  var mapName = 'ninesplit-map';
  mapImage.attr('usemap', '#' + mapName);
  var imageMap = document.createElement('map');
  imageMap.name = mapName;
  imageMap.id = mapName;

  var members = {
    babysoul: {x: 0, y: 0},
    jiae: {x: 1, y: 0},
    jisoo: {x: 2, y: 0},
    mijoo: {x: 0, y: 1},
    kei: {x: 2, y: 1},
    jin: {x: 0, y: 2},
    sujeong: {x: 1, y: 2},
    yein: {x: 2, y: 2}
  };

  for (var name in members) {
    var prop = members[name];
    var e = $('.' + ns + '-' + name);
    if (prop && e.length == 1) {
      imageMap.appendChild(
        createArea(
          name,
          e.data().src,
          prop.x, prop.y, mapImageWidth, mapImageHeight));
    }
  }
  imageMap.appendChild(
    createRectArea(
      'lvonly.tistory.com',
      'http://lvonly.tistory.com/',
      mapImage.height() - 14, mapImage.height(), mapImage.width() - 100, mapImage.width(), '_blank'));
  mapImage.after(imageMap);
  mapImage.mapify();
}

var $ = require('jquery');
require('../build/mapify.css.js');
var mapify = require('./mapify.js')($,window,document);
var ns = 'ninesplit-image';
var mapImage = $('.' + ns);

var imageElement = mapImage.get(0);
if (imageElement.complete && imageElement.naturalHeight !== 0) {
  doMapify(ns, mapImage);
} else {
  mapImage.on('load', function() {
    doMapify(ns, mapImage);
  })
}
