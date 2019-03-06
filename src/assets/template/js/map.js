ymaps.ready(init);
    function init() { 
        createMap({ center:mapData.center, zoom:mapData.zoom, controls:[], scroll: false }, mapData);
    }


    function createMap(state, mapData) {
        // Если карта еще не была создана, то создадим ее и добавим метку с адресом.
        //alert(state.toSource());

        map = new ymaps.Map('map', state);


        MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="popover top">' +
            '<a class="close" href="#">&times;</a>' +
            '<div class="arrow"></div>' +
            '<div class="popover__grid">' +
            '<div class="popover-inner">' +
            '$[[options.contentLayout observeSize minWidth=235 maxWidth=235 maxHeight=350]]' +
            '</div></div>' +
            '</div>', { 
                build: function () {
                    this.constructor.superclass.build.call(this);
                    this._$element = $('.popover', this.getParentElement());
                    this.applyElementOffset();
                    this._$element.find('.close')
                        .on('click', $.proxy(this.onCloseClick, this));
                 },
                clear: function () { 
                    this._$element.find('.close')
                        .off('click');

                    this.constructor.superclass.clear.call(this);
                 },

                onSublayoutSizeChange: function () { 
                    MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
                    if(!this._isElement(this._$element)) { 
                        return;
                     }
                    this.applyElementOffset();

                    this.events.fire('shapechange');
                 },
                applyElementOffset: function () { 
                    this._$element.css({ 
                        left: 30,
                        top: -50
                     });
                 },

                onCloseClick: function (e) { 
                    e.preventDefault();

                    this.events.fire('userclose');
                 },
                getShape: function () {
                    if(!this._isElement(this._$element)) { 
                        return MyBalloonLayout.superclass.getShape.call(this);
                     }

                    var position = this._$element.position();

                    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                        [position.left, position.top], [
                            position.left + this._$element[0].offsetWidth,
                            position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                        ]
                    ]));
                 },
                _isElement: function (element) {
                    return element && element[0] && element.find('.arrow')[0];
                 }
             }),

            // Создание вложенного макета содержимого балуна.
            MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="popover__address">$[properties.balloonHeader]</div>'
            ),


        placemark = new ymaps.Placemark(
            mapData.coords, {
                balloonHeader: mapData.header
             }, { 
                balloonShadow: false,
                balloonLayout: MyBalloonLayout,
                balloonContentLayout: MyBalloonContentLayout,
                balloonPanelMaxMapArea: 0,
                hideIconOnBalloonOpen: false,

                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: '/assets/template/images/g100.png',
                // Размеры метки.
                iconImageSize: [64, 70],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-32, -70],
                pane: 'balloon'
             });
        map.geoObjects.add(placemark);
        placemark.balloon.open();


        map.behaviors.disable('scrollZoom');
        //hideMapOnMobile();
        //map.controls.add('zoomControl');
        // Если карта есть, то выставляем новый центр карты и меняем данные и позицию метки в соответствии с найденным адресом.

}



    function createMap3(state, mapData) {
        // Если карта еще не была создана, то создадим ее и добавим метку с адресом.
        //alert(state.toSource());

        map = new ymaps.Map('map3', state);


        MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="popover top">' +
            '<a class="close" href="#">&times;</a>' +
            '<div class="arrow"></div>' +
            '<div class="popover__grid">' +
            '<div class="popover-inner">' +
            '$[[options.contentLayout observeSize minWidth=235 maxWidth=235 maxHeight=350]]' +
            '</div></div>' +
            '</div>', { 
                build: function () {
                    this.constructor.superclass.build.call(this);
                    this._$element = $('.popover', this.getParentElement());
                    this.applyElementOffset();
                    this._$element.find('.close')
                        .on('click', $.proxy(this.onCloseClick, this));
                 },
                clear: function () { 
                    this._$element.find('.close')
                        .off('click');

                    this.constructor.superclass.clear.call(this);
                 },

                onSublayoutSizeChange: function () { 
                    MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
                    if(!this._isElement(this._$element)) { 
                        return;
                     }
                    this.applyElementOffset();

                    this.events.fire('shapechange');
                 },
                applyElementOffset: function () { 
                    this._$element.css({ 
                        left: 0,
                        top: -23
                     });
                 },

                onCloseClick: function (e) { 
                    e.preventDefault();

                    this.events.fire('userclose');
                 },
                getShape: function () {
                    if(!this._isElement(this._$element)) { 
                        return MyBalloonLayout.superclass.getShape.call(this);
                     }

                    var position = this._$element.position();

                    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                        [position.left, position.top], [
                            position.left + this._$element[0].offsetWidth,
                            position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                        ]
                    ]));
                 },
                _isElement: function (element) {
                    return element && element[0] && element.find('.arrow')[0];
                 }
             }),

            // Создание вложенного макета содержимого балуна.
            MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="popover__address">$[properties.balloonHeader]</div>'
            ),


        placemark = new ymaps.Placemark(
            mapData.coords, {
                balloonHeader: mapData.header
             }, { 
                balloonShadow: false,
                balloonLayout: MyBalloonLayout,
                balloonContentLayout: MyBalloonContentLayout,
                balloonPanelMaxMapArea: 0,
                hideIconOnBalloonOpen: false,

                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: '/assets/template/images/map-marker.png',
                // Размеры метки.
                iconImageSize: [30, 31],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-21, -25],
                pane: 'balloon'
             });
        map.geoObjects.add(placemark);
        placemark.balloon.open();


        map.behaviors.disable('scrollZoom');
        //hideMapOnMobile();
        //map.controls.add('zoomControl');
        // Если карта есть, то выставляем новый центр карты и меняем данные и позицию метки в соответствии с найденным адресом.

}