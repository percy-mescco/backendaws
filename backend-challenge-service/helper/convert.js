const ContantTranslatedWord = {        
    count: {ES: "cantidad", FR : "compter"},
    next: {ES: "proximo", FR : "prochaine"},
    previous: {ES: "previo", FR : "precedente"},
    results: {ES: "resultados", FR : "resultats"},
    films: {ES: "peliculas", FR : "films"},
    people : {ES: "personas", FR : "personnes"},
    planets : {ES: "planetas", FR : "planetes"},
    species: {ES: "especies", FR : "espece"},    
    starships: {ES: "naves_estelares", FR : "vaisseaux_spatiaux"},
    vehicles: {ES: "vehiculos", FR : "vehicules"},
    name: {ES: "nombre", FR : "nom"},
    birth_year: {ES: "anio_nacimiento", FR : "annee_naissance"},
    eye_color: {ES: "color_ojo", FR : "couleur_yeux"},
    gender: {ES: "genero", FR : "sexe"},
    hair_color: {ES: "color_cabello", FR : "couleur_cheveux"},
    height: {ES: "altura", FR : "taille"},
    mass: {ES: "masa", FR : "masse"},    
    skin_color: {ES: "color_piel", FR : "couleur_peau"},
    homeworld: {ES: "mundo_natal", FR : "monde_natal"},
    url: {ES: "url", FR : "url"},
    created: {ES: "creacion", FR : "etablie"},
    edited: {ES: "edicion", FR : "edite"},
    title : {ES: "titulo", FR : "titre"},
    episode_id  : {ES: "episodio_id", FR : "episode_id"},
    opening_crawl   : {ES: "rastreo_apertura", FR : "exploration_ouverture"},
    director : {ES: "director", FR : "realisatrice"},
    producer : {ES: "productor", FR : "productrice"},
    release_date : {ES: "fecha_lanzamiento", FR : "date_sortie"},
    model : {ES: "modelo", FR : "modele"},
    starship_class : {ES: "clase_naves", FR : "classe_vaisseau"},
    manufacturer : {ES: "fabricante", FR : "fabricant"},
    cost_in_credits : {ES: "costo_creditos", FR : "cout_credits"},
    length : {ES: "longitud", FR : "longueur"},
    crew : {ES: "tripulacion", FR : "equipiere"},
    passengers : {ES: "pasajeros", FR : "passageres"},
    max_atmosphering_speed : {ES: "velocidad_maxima_atmosfera", FR : "vitesse_atmospherique_max"},
    hyperdrive_rating : {ES: "calificacion_hiperimpulsor", FR : "note_hyperdrive"},
    MGLT : {ES: "MGLT", FR : "MGLT"},
    cargo_capacity : {ES: "capacidad_carga", FR : "capacite_chargement"},
    consumables : {ES: "consumibles", FR : "consommables"},
    vehicle_class : {ES: "clase_vehiculo", FR : "classe_vehicule"},
    classification : {ES: "clasificacion", FR : "classification"},
    designation : {ES: "designacion", FR : "designation"},
    average_height : {ES: "altura_media", FR : "taille_moyenne"},
    average_lifespan : {ES: "promedio_vida", FR : "vie_moyenne"},
    language : {ES: "idioma", FR : "langue"},
    diameter : {ES: "diametro", FR : "diametre"},
    rotation_period  : {ES: "período_rotacion", FR : "periode_rotation"},
    orbital_period  : {ES: "periodo_orbital", FR : "periode_orbitale"},
    gravity  : {ES: "gravedad", FR : "gravite"},
    population : {ES: "poblacion", FR : "population"},
    climate : {ES: "clima", FR : "climat"},
    terrain : {ES: "terreno", FR : "terrain"},
    surface_water  : {ES: "superficie_agua", FR : "eaux_surface"},
    residents  : {ES: "residentes", FR : "residentes"},
    id: {ES: "id", FR : "id"}
};

function searchLanguaje(word, lang) {
    if (lang != null && lang.trim() != '' && ContantTranslatedWord[word] != null)  {
        return ContantTranslatedWord[word][lang];
    } else {
        return word;
    }
}

function translatingRecursive(obj, lang) {
    var newObject, origKey, newKey, value
    if (obj instanceof Array) {
      return obj.map(function(value) {
          if (typeof value === "object") {
            value = translatingRecursive(value, lang)
          }
          return value
      })
    } else {
      newObject = {}
      for (origKey in obj) {
        if (obj.hasOwnProperty(origKey)) {
          newKey = searchLanguaje(origKey, lang);
          value = obj[origKey]
          if (value instanceof Array || (value !== null && value.constructor === Object)) {
            value = translatingRecursive(value, lang)
          }
          newObject[newKey] = value
        }
      }
    }
    return newObject
  }

module.exports.translate = (obj, lang) => {
    return translatingRecursive(obj, lang);
}