// Write your JavaScript code here!
window.addEventListener('load', function() {
   let form = document.querySelector('form');
   form.addEventListener('submit', function(event) {
      let pilotNameInput = document.querySelector('input[name=pilotName]');
      let copilotNameInput = document.querySelector('input[name=copilotName]');
      let fuelLevelInput = document.querySelector('input[name=fuelLevel]');
      let cargoMassInput = document.querySelector('input[name=cargoMass]');

      document.getElementById('pilotStatus').innerHTML = `${pilotNameInput.value} ready`;
      document.getElementById('copilotStatus').innerHTML = `${copilotNameInput.value} ready`;

      if (pilotNameInput.value === '' || copilotNameInput.value === '' || fuelLevelInput.value === '' || cargoMassInput.value === '') {
         alert('All fields are required.');
         event.preventDefault();
      };
    

      if (!isNaN(pilotNameInput.value) || !isNaN(copilotNameInput.value)) {
         alert('Pilot name and Copilot name must be strings.');
         event.preventDefault();
      };
     
      if (isNaN(fuelLevelInput.value)  || isNaN(cargoMassInput.value)) {
         alert('Fuel Level and Cargo Mass must be numbers.');
         event.preventDefault();
      };

      if ((fuelLevelInput.value) < 10000) {
         document.getElementById('faultyItems').style.visibility = 'visible';
         document.getElementById('fuelStatus').innerHTML = 'There is not enough fuel for the journey';
         document.getElementById('launchStatus').innerHTML = 'Shuttle not ready for launch';
         document.getElementById('launchStatus').style.color = 'red';
      } 
      
      if ((cargoMassInput.value) > 10000) {
         document.getElementById('faultyItems').style.visibility = 'visible';
         document.getElementById('cargoStatus').innerHTML = 'There is too much mass for the shuttle to take off';
         document.getElementById('launchStatus').innerHTML = 'Shuttle not ready for launch';
         document.getElementById('launchStatus').style.color = 'red';
      } 
      
      if (fuelLevelInput.value>= 10000 && cargoMassInput.value <= 10000) {
         document.getElementById('launchStatus').innerHTML = 'Shuttle is ready for launch';
         document.getElementById('launchStatus').style.color = 'green';
      };

      fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
         response.json().then(function(json) {
            const div = document.getElementById("missionTarget");

            // Bonus Mission
            let possibleDestinations = [];
            for (let i = 0; i < json.length; i ++) {
               possibleDestinations.push(json[i]);
            };
            console.log(possibleDestinations);
            let randomPlanet = function(arr) {
               let index = Math.floor(Math.random()*arr.length);
               return arr[index];
            }

            let chosenPlanet = randomPlanet(possibleDestinations);
            console.log(chosenPlanet);
            div.innerHTML = `
               <h2>Mission Destination</h2>
               <Ol>
                  <li>Name: ${chosenPlanet.name}</li>
                  <li>Destination: ${chosenPlanet.diameter}</li>
                  <li>Star: ${chosenPlanet.star}</li>
                  <li>Distance from Earth: ${chosenPlanet.distance}</li>
                  <li>Number of Moons: ${chosenPlanet.moons}</li>
               </ol>
               <img src="${chosenPlanet.image}">
               `;
         });
      });

      event.preventDefault();
   });
});

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
