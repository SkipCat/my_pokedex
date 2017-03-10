window.onload = function() {

	var imgBlock = document.querySelector('.img-block');
	var nidoranBlock = document.querySelector('.nidoran-check');
	var descBlock = document.querySelector('.desc-block');
	var errorBlock = document.querySelector('.error-block');
	var pokeForm = document.forms['poke-form'];

	pokeForm.onsubmit = function() {
		var uppercase = pokeForm.elements['pokemon-name'].value.charAt(0).toUpperCase();
		var name = pokeForm.elements['pokemon-name'].value.substring(1);
		var pokeName = uppercase + name;

		nidoranBlock.innerHTML = '';
		descBlock.innerHTML = '';
		imgBlock.innerHTML = '';
		errorBlock.innerHTML = '';

	    var http = new XMLHttpRequest();
	    http.open('GET', 'assets/pokemons.json', true);
	    http.setRequestHeader('Content-type', 'application/json');

	    http.onload = function() {
		    if (http.readyState == 4 && http.status == 200) {
				var result = JSON.parse(http.responseText);
				exists = false;

				for (var i in result) {
					if (result[i].name == pokeName || i == pokeName) {
						descBlock.innerHTML = 'Name: ' + result[i].name + '<br>' + 'Type: ' + result[i].type;

						if (pokeName == '32') { // nidoran male
							var nidoranClean = result[i].name.replace('Nidoran','nidoran-m');
							pokeClean = nidoranClean.replace(". ","-").replace("\'","").toLowerCase();
						}
						else if (pokeName == '29') { // nidoran female
							var nidoranClean = result[i].name.replace('Nidoran','nidoran-f');
							pokeClean = nidoranClean.replace(". ","-").replace("\'","").toLowerCase();
						}
						else { // other pokemon
							pokeClean = result[i].name.replace(". ","-").replace("\'","").replace("Nidoran", "nidoran-f").toLowerCase();
						}

						imgBlock.innerHTML = '<img src="http://img.pokemondb.net/artwork/' + pokeClean + '.jpg"/>';
						exists = true;
					}
				}

				if (exists == false) {
					if (pokeName === '') {
						descBlock.innerHTML += 'Name required.';
					}
					else if (!isNaN(pokeName)) {
						descBlock.innerHTML += 'Pokemon number ' + pokeName + ' not found.';
						imgBlock.innerHTML = '404 NOT FOUND';
					}
					else {
						descBlock.innerHTML += 'Pokemon ' + pokeName + ' not found.';
						imgBlock.innerHTML = '404 NOT FOUND';
					}
				}
	        }
	        else {
	        	var errors = JSON.parse(http.responseText);
	            for(var error in errors['errors']) {
	                errorBlock.innerHTML += error + ' : ' + errors['errors'][error];
	            }
	        }
    	};

    	http.send();
	    return false;
	};
};