(function() {
    const map = L.map('map').setView([48.8581817, 2.3454923], 12);
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    fetch('./js/paris-2024-parkings-velo-spectateurs-en-idf.geojson')
        .then(res => res.json())
        .then(data => {
            const polygonCoordinates = data.features
                .filter(f => !!f.geometry)
                .map(f => ({coords: f.geometry.coordinates, properties: f.properties}))
                .map(({coords, ...props}) => ({
                    coords: coords[0].map(([lat, lng]) => [lng, lat]).slice(0, -1),
                    ...props
                }))


            polygonCoordinates.forEach(({coords, properties}) => {
                const polygon = L.polygon(coords, { color: '#050355' }).addTo(map);
                const {
                    nom_site: name,
                    nom_du_parking_velo: bikeParkName,
                    adresse_du_parking_velo: address,
                    geo_point_2d: {
                        lon,
                        lat
                    }
                } = properties;

                // 🚲
                const marker = L.marker([lat, lon]).addTo(map);
                const message = `<h3>${name}</h3><h4>🚲 ${bikeParkName} 🚲</h4><em>${address}</em>`
                marker.bindPopup(message);
                polygon.bindPopup(message);

            });
        });
}());
