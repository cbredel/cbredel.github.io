   function ZoomGlobal(){
                    mymap.fitBounds(LayerSection.getBounds())
                }
            
                function AfficheSection(){
                    if (document.getElementById("btnAfficheSection").value=="Affiche Section") {
                        document.getElementById("btnAfficheSection").value="Masque Section";
                        LayerSection.addTo(mymap);
                        
                    }
                    else {
                        document.getElementById("btnAfficheSection").value="Affiche Section";
                        LayerSection.remove();
                    
                    }
                    
                }
            
                function AfficheParcelle(){
                    if (document.getElementById("btnAfficheParcelle").value=="Affiche Parcelle") {
                        document.getElementById("btnAfficheParcelle").value="Masque Parcelle";
                        LayerParcelle.addTo(mymap);
                        
                    }
                    else {
                        document.getElementById("btnAfficheParcelle").value="Affiche Parcelle";
                        LayerParcelle.remove();
                    
                    }
                    
                }
                function AfficheBatiment() {
                     if (document.getElementById("btnAfficheBatiment").value=="Affiche Batiment") {
                        document.getElementById("btnAfficheBatiment").value="Masque Batiment";
                        LayerBatiment.addTo(mymap);
                        
                    }
                    else {
                        document.getElementById("btnAfficheBatiment").value="Affiche Batiment";
                        LayerBatiment.remove();
                    
                    }
                    
                }
            
                function ChargeListeSection(){
                    document.getElementById("mesSections").options.length=LayerSection.getLayers().length;
                    for (var i=0;i<LayerSection.getLayers().length;i++){
                      document.getElementById("mesSections").options[i].value=LayerSection.getLayers()[i]._leaflet_id;
                      document.getElementById("mesSections").options[i].text=LayerSection.getLayers()[i].feature.properties.code	;
                        
                    }
                }
            
                function changeSection(){
                    mymap.fitBounds(LayerSection._layers[document.getElementById("mesSections").value].getBounds());
                }
            
            
                 //Definition d'une variable correspondant à la carte
                        //setView permet de centrer sur des coordonnées en WGS84
                        //le 13 indique le seuil de zoom
                var mymap = L.map('mapid').setView([49.52007, 5.76598], 13);
            
                //Ajout d'un controle d'echelle
                L.control.scale().addTo(mymap);
            
                // Ajout d'un fond OpenStreetMap
                 L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap); 
            
                
                //Ajout d'un marker 
       //         var monMarqueur1=L.marker([49.52007, 5.76598]).addTo(mymap);
            
        //        var monMarqueur2=L.marker([49.53361,5.75870]).bindPopup('Hello').addTo(mymap)
            
            
                //Chargement dans la carte de données GeoJSON
                //Chargement de la variable section en tant que couche geoJSON dans Leaflet
                var LayerSection=L.geoJSON(section)
                //Ajout de la couche Section à la carte
                LayerSection .addTo(mymap);
            
            //Chargement des parcelles avec un style
                function style(feature) {
                        return {
                            weight: 0.3,
                            opacity: 1,
                            color: 'gray',
                            //dashArray: '3',
                            fillOpacity: 0.3,
                            fillColor: '#FFFFFF'}
                        };
               
function styleBatiment(feature) {
                        return {
                            weight: 0.3,
                            opacity: 1,
                            color: 'black',
                            //dashArray: '3',
                            fillOpacity: 0.8,
                            fillColor: 'gray'}
                        };
                 function styleParcelleSurPassage(){
                     return {
                            weight: 0.3,
                            opacity: 1,
                            color: 'gray',
                            //dashArray: '3',
                            fillOpacity: 0.3,
                            fillColor: '#FF0000'}
                        };
                 
            
                function styleParcelleInit(){
                    return {
                            weight: 0.3,
                            opacity: 1,
                            color: 'gray',
                            //dashArray: '3',
                            fillOpacity: 0.3,
                            fillColor: '#FFFFFF'}
                        };
                
                function zoomToFeature(e) {
                        mymap.fitBounds(e.target.getBounds());
                    }

                function SurChaqueParcelle(feature,layer){
                     (function(layer, properties) {
                                          layer.on('mouseover',function(e){
                                //Quand la souris arrive sur l'objet change le style
                                this.setStyle(styleParcelleSurPassage());
                             var popup=L.popup()
                                                    .setLatLng(e.latlng)
                                                    .setContent(properties.section +" "+properties.numero)
                                                    .openOn(mymap);
                            
                                });
                        layer.on('mouseout',function(e){
                                //Quand la souris quittes l'objet, il reprend son style d'origine
                                this.setStyle(styleParcelleInit())
                        });
                                })(layer, feature.properties);
                    
                    
         
                      
                }
                var LayerParcelle=L.geoJSON(parcelles,
                                                {style:style,
                                                onEachFeature:SurChaqueParcelle}
                                               );
                
                
                LayerParcelle.addTo(mymap);
                

                var LayerBatiment=L.geoJSON(batiments,
                                                {style:styleBatiment}
                                               );
                
                
                LayerBatiment.addTo(mymap);

                ZoomGlobal()
                ChargeListeSection();