(function() {

    "use strict";

    const root = document.documentElement;
    const navToggle = document.querySelector("#js-navToggle");

    navToggle.addEventListener("click", function() {
        root.classList.toggle("show-nav");
    })

    const eventPP = document.querySelector("#js-eventPP");

    if (eventPP) {
        
        const eventOpenBtn = document.querySelector("#js-eventOpenBtn");
        const closeEventPP = function(event) {
            function close() {
                document.removeEventListener("keyup",closeEventPP);
                eventPP.removeEventListener("click",closeEventPP);
                
                root.classList.remove("show-event-popup");
            };
            
            switch (event.type){
                case "keyup":
                    if (event.key==="Escape") close();
                    break;
                case "click":
                    if (event.target === this || event.target.classList.contains("js-ppCloseBtn")) {
                        close();
                        break;
                    }
            }
        }

        eventOpenBtn.addEventListener("click", function() {
            root.classList.add("show-event-popup");
            
            document.addEventListener("keyup", closeEventPP);
            eventPP.addEventListener("click", closeEventPP);
        })

    }

    let swipers = document.querySelectorAll(".js-swiper");

    swipers.forEach(function(swpr) {
        new Swiper(swpr, {
           updateOnWindowResize: true,  
           slidesPerView: "auto",
           slidesPerGroup: 1,
           freeMode: true,
           spaceBetween: 0,
           speed: 500,
           grabCursor: true,
           pagination: {
            el: swpr.querySelector(".swiper-pagination"),
            clickable: true            
           },
           navigation: {
            nextEl: swpr.querySelector(".swiper-arrow-next"),
            prevEl: swpr.querySelector(".swiper-arrow-prev"),
            disabledClass: "arrow--disabled"
           }
        });
    })


    const contactsMap = document.querySelector("#js-contactsMap")

    if (contactsMap) {
        
        const mapStyles = 
        [
        {
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#212121"
            }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#757575"
            }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
            {
                "color": "#212121"
            }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#757575"
            }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#9e9e9e"
            }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#bdbdbd"
            }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#757575"
            }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#181818"
            }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#616161"
            }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.stroke",
            "stylers": [
            {
                "color": "#1b1b1b"
            }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
            {
                "color": "#2c2c2c"
            }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#8a8a8a"
            }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#373737"
            }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#3c3c3c"
            }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#4e4e4e"
            }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#616161"
            }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#757575"
            }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#000000"
            }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#3d3d3d"
            }
            ]
        }
        ]
        const mapCenter = new google.maps.LatLng(56.4540,84.9783);
        
        const mapOptions = {
            center: mapCenter,
            disableDefaultUI: true,
            draggable: true,
            gestureHandling: "cooperative",
            scrollwheel: false,
            styles: mapStyles,
            zoom: 15,
            zoomControl: true,
            zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
            }
        }

        // СОЗДАНИЕ КАРТЫ
        const map = new google.maps.Map(contactsMap, mapOptions);

        // Создание точки для маркера ПОСЛЕ создания карты
        const point = new google.maps.LatLng(56.49385, 84.96274);

        const mapPin = new google.maps.MarkerImage(
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAABHCAMAAABf/MtLAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAADAUExURUdwTK8wILwyJL0zI70yJbwyI79AIL0yJL8wILs0JLw0JLsyJL0zJbwyJbwzJB8eHv///3Nycjs6OldWVsRMP4+OjsRNP8fHx+Pj492ZkUlISOazrauqqu7MyMfGxsBAMS0sLMlZTc1mW/vy8sBAMvvy8WVkZMVMQPbl48lZTtmMg81mWtmMhMxmW4+Pj/fm4/fl5OGmnvHx8Z2cnMVNQPLZ1tWAdt6ZktBzaHNzc9V/duq/u+Gmn8hZTNFzabm5uYZR+N4AAAAOdFJOUwAQz9/f3xB/EIDPz9/ftWbT5QAAAWxJREFUWMPt1VlTwjAQAGDEaluPJiQhYGjtAeUQxPu+/v+/cpO2DC+OI7PRYcw+JOlO55vMdpO2WmtBNo3W9+FsZzvb2c529l/Y45hXi/iG6yA8fuKMkGUMqS5X1RvLONvA7tJOtaD9au5AginSo5A6hUem3+hRhmUTwhubjNFttbKzDwT7GqqtGpv0G5vE2Ptes9FrsvqW/9FmXDGIjHCuZwYJc0wUHCn9aYlJKO7uKmf/sh39LJxtxx7lObJ9e1emMA1oISN5OUmFmNMrIQSGnd/TM2M/w3iRwCDpCdK+i9EwMfY5jMkU056l0SvNtf0GT0PUfT9K+a6tAYUKP0wFpl3oSpTansuXchIh2jM9LKDWet/SlATNLkxjg2lqsjAtg9cnOqCbU1Ev9Ji6+wTTdv/LLbJdbHnsh160GwZW6ANz+Ns28LC+WXwL9lFt71mwv7gSUcKzuG/fYr2DtqEPd2w0YeAfR55vg/4EpN3f8dlAXnoAAAAASUVORK5CYII=",
            new google.maps.Size(91, 71), //size
            new google.maps.Point(0, 0),  //origin point
            new google.maps.Point(0, 71)  //offset point
        );

        // Создание маркера с использованием уже объявленной переменной point
        new google.maps.Marker({
            position: point,
            map: map,
            icon: mapPin,
            title: "ИТ-Академия ТУСУР"
        });
    }
    
    
})();