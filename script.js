
$('form').on('submit', e => {
  e.preventDefault();
  $.ajax({
    url: 'https://pokeapi.co/api/v2/pokemon/' + $('input').val().toLowerCase(), success: res => {
      $('.err').hide();
      console.log(res);
      let pokemonName = res.name;
      let pokemonTypes = res.types.map(type => type.type.name);
      let pokemonImg = res.sprites.front_default;
      let pokemonMoves = res.moves.splice(0, 3).map(pok => ({ name: pok.move.name, url: pok.move.url }));

      $('.pokemon').html(pokemonName);
      $('.pokemon__type').text(`Type${pokemonTypes.length > 1 ? 's' : ''}: ${pokemonTypes.map(type => type[0].toUpperCase() + type.substring(1).toLowerCase()).join(', ')}`);
      $('.pokemon__image').attr('src', pokemonImg);


      $('.pokemon__moves__list').html('');

      pokemonMoves.forEach(move => {
        $('.pokemon__moves__list').append(`<li class="pokemon__moves__item">${move.name}</li>`)
      });

    }, error: (res) => {
      $('.err').text(res.responseText).show();
    }
  })

})