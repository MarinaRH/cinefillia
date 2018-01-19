$(function () {
  $apiKeyTdbm = '26ae59014ea0da877c1779bb203cb4da';
  $apiLen = '&language=es-ES&include_adult=false&sort_by=created_at.asc';
  $apiJustLen = '&language=es-ES';
  $apiTdbm = 'https://api.themoviedb.org/3/genre/';
  $api = 'https://api.themoviedb.org/3/';
  $apiYoutbe = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=';

  $('.genero-movie').on('click', function (event) {
    event.preventDefault();
    if(window.sessionStorage){
      sessionStorage.setItem('generoId', $(this).attr('id'));
    }
    document.location.href = '../search/';
    console.log(window.location.href);

  });

  if (sessionStorage.getItem('generoId')) {
    $('#container-peliculas').html('');
    $genreId = sessionStorage.getItem('generoId');
    $.getJSON(($api + 'genre/' + $genreId + '/movies?api_key=' + $apiKeyTdbm + $apiLen),gotDataGenre);
    function gotDataGenre (data) {
      //console.log(data.results.length);
      for (var i = 0; i < data.results.length; i++ ){
        //console.log(data.results[i]);
        $currentMovie = data.results[i];
        $('#container-peliculas').append("<div id=" + $currentMovie.id + " class='movie-click'><img src= 'http://image.tmdb.org/t/p/w185/" + $currentMovie.poster_path + "  '><h2>" + $currentMovie.title + "</h2></div>")

      }

      $('.movie-click').on('click', function () {
        console.log('hola');
        if(window.sessionStorage){
          sessionStorage.setItem('movieId', $(this).attr('id'));
        }
        //sessionStorage.setItem('movieId', $('.movie-click').attr('id'));
        document.location.href = '../movie/';
        //return false;
      });

    }
  }

  if (sessionStorage.getItem('movieId')) {
    $idMovie = sessionStorage.getItem('movieId');
    $.getJSON(($api + 'movie/' + $idMovie + '?api_key=' + $apiKeyTdbm + $apiJustLen),gotDataMovie);
    function gotDataMovie (data) {
      console.log(data);
      $('#title-movie').text(data.title);
      $('#tagline-movie').text(data.tagline);
      $('#plot-movie').text(data.overview);
      $('#genero-movie').text(data.genres[1].name);
      $('#runtime-movie').text(data.runtime + 'min');
      $('#year-movie').text(data.release_date);

      $.getJSON(($apiYoutbe + data.original_title + 'behind the scenes' + '&type=video&key=AIzaSyBezaSWH0w7yaDcfjmuoaq4Vhc6eAf9-_o'),gotDataBehind);

      function gotDataBehind (data) {
        console.log(data.items);
        $.each(data.items, function (index, item) {
          console.log(item);
          $('#main-container-videos').append("<div class='video-behind col-md-6'> <iframe class='video' width='520' height='300' src='//www.youtube.com/embed/" + item.id.videoId + "' frameborder='0' allowfullscreen> </iframe> <h2 class='title-video col-md-6 col-md-push-2'> " + item.snippet.title  + "</h2></div>") ;
        });

      }

      //BEHIND THE SCENES CLICK
      $('#behind').on('click', function (event) {
        event.preventDefault();
        $('#main-container-videos').html('');
        $('#cast-container').html('');
        $('#director-container').html('');
        $('#review-container').removeClass('d-block');

        $.getJSON(($apiYoutbe + data.original_title + 'behind the scenes' + '&type=video&key=AIzaSyBezaSWH0w7yaDcfjmuoaq4Vhc6eAf9-_o'),gotDataBehind);

        function gotDataBehind (data) {
          console.log(data.items);
          $.each(data.items, function (index, item) {
            console.log(item);
            $('#main-container-videos').append("<div class='video-behind col-md-6'> <iframe class='video' width='520' height='300' src='//www.youtube.com/embed/" + item.id.videoId + "' frameborder='0' allowfullscreen> </iframe> <h2 class='title-video col-md-6 col-md-push-2'> " + item.snippet.title  + "</h2></div>") ;
          });
        }
      });

      //TOP SCENES CLICK
      $('#top-scenes').on('click', function (event) {
        event.preventDefault();
        $('#main-container-videos').html('');
        $('#cast-container').html('');
        $('#director-container').html('');
        $('#review-container').removeClass('d-block');

        $.getJSON(($apiYoutbe + data.original_title + 'movie scenes' + '&type=video&key=AIzaSyBezaSWH0w7yaDcfjmuoaq4Vhc6eAf9-_o'),gotDataScenes);

        function gotDataScenes (data) {
          console.log(data.items);
          $.each(data.items, function (index, item) {
            console.log(item);
            $('#main-container-videos').append("<div class='video-behind col-md-6'> <iframe class='video' width='520' height='300' src='//www.youtube.com/embed/" + item.id.videoId + "' frameborder='0' allowfullscreen> </iframe> <h2 class='title-video col-md-6 col-md-push-2'> " + item.snippet.title  + "</h2></div>") ;
          });
        }
      });


    }

    //CAST COMPLETO CLICK
    $('#cast').on('click', function (event) {
      $('#main-container-videos').html('');
      $('#cast-container').html('');
      $('#director-container').html('');
      $('#review-container').removeClass('d-block');
      event.preventDefault();

      $.getJSON(($api + 'movie/' + $idMovie + '/credits?api_key=' + $apiKeyTdbm + $apiJustLen), gotCastMovie);
      function gotCastMovie (data) {
        for (var i = 0; i < 10 ; i++) {
          $('#cast-container').append("<li id=" + data.cast[i].id + " class='movie-single-actor col-md-4'><img src= 'http://image.tmdb.org/t/p/w185/" + data.cast[i].profile_path + "  '><h2>" + data.cast[i].name + "</h2></li>")
        }
        $('#director-container').append("<div id=" + data.crew[0].id + " class='movie-single-director'><img src= 'http://image.tmdb.org/t/p/w185/" + data.crew[0].profile_path + "  '><h2>" + data.crew[0].name + "</h2><h4>" + data.crew[0].job + "</h4></div>");
        console.log(data);
      }
    });

    //REVIEW COMPLETO CLICK
    $('#review').on('click', function (event) {
      $('#main-container-videos').html('');
      $('#cast-container').html('');
      $('#director-container').html('');
      $('#review-container').addClass('d-block');
      event.preventDefault();

      $.getJSON(($api + 'movie/' + $idMovie + '/reviews?api_key=' + $apiKeyTdbm + $apiJustLen), gotReviews);
      function gotReviews (data) {
        console.log(data);
      }

      firebase.database().ref('posts').on('child_added', function(snapshot) {
        $thisPost = '';
        $elemento = snapshot.val();
        $userName = $elemento.name;
        $postConent = $elemento.message;
        $userPhoto = $elemento.photo;

        $thisPost = "<div class='single-response'><img class='user-img' src=" + $userPhoto + "> <div class='content-review'><p>" + $elemento.message + "</p></div></div>";

        $('#responses').prepend($thisPost);
      });


      $('#submit-review').on('click', function () {
        console.log($('#input-review').val());
        
        firebase.auth().onAuthStateChanged( function(user) {
          if(user) {
            var user = firebase.auth().currentUser;
            if($('#input-review').val() !== '' ){
              console.log('hola');
              // $('#responses').prepend("<img class='user-img' src=" + user.photoURL + "> <div class='content-review'><p>" + $('#input-review').val() + "</p></div>" );
              var newPost = {
                name: user.displayName,
                photo: user.photoURL,
                message: $('#input-review').val()
              };
              firebase.database().ref('posts/').push(newPost);
              
            }
          }
        });
      });
    });

  

  }
  
  
    // Firebase
    // var database = firebase.database();
    // var storage = firebase.storage();
    // var reference = database.ref('users');
    // var referencePost = database.ref('posts');
  // Función postear 

  // $('#submit-review').on('click', function() {
  //   var textPost = $('#input-review').val();
  //   var boxPost = $('#responses');
  //   $('#submit-review').attr('disabled', false);
  //   boxPost.prepend('<div class="row col-md-7 border-post"><div class="box-img-post"><figure class="border-photo-post-user" >' +user.displayName+
  //   '<img class="img-user-post"></figure></div><p class="usersComent"></p><div class=""><p>' + textPost + '</p></div><div class="comment"><i class="fa fa-heart-o fa-lg logo" aria-hidden="true"></i><i class="fa fa-comment-o fa-lg" aria-hidden="true"></i></div></div>');
    
  // });

  referencePost.on('value', function(datos) {
    // newPost.remove();
    posts = datos.val();
    // Recorremos todos los post y los mostramos
    $.each(posts, function(indice, valor) {
      if(users) {
      $('#responses').prepend('<div class="row col-md-7 border-post"><div class="box-img-post"><figure class="border-photo-post-user" >' +user.displayName+
      '<img class="img-user-post"></figure></div><p class="usersComent"></p><div class=""><p>' + textPost + '</p></div><div class="comment"><i class="fa fa-heart-o fa-lg logo" aria-hidden="true"></i><i class="fa fa-comment-o fa-lg logo" aria-hidden="true"></i></div></div>');
      }
    });
  }, function(objetoError) {
    console.log('Error de lectura:' + objetoError.code);
  });


  /* mostrar menu de lista de generos */
  $('#btnSlide').on('click',function(event) {
    event.preventDefault();
    $("#slideIzq").removeClass('hiden');
    $("#slideIzq").animate({
      width: "toggle"
        /*
        width: "show"
        width: "hide"
        */
    });
  }); 
  
  // funcion de mostrar cerrar sesion
  $('#btn-profile').on('click',function(event){
    event.preventDefault();
    $('.slide-profile').toggleClass('hiden');
  })
  
  // funcion agregar favoritos
  $('#favorito').on('click',function(){
    $('.icon-favorito').addClass('red');
    $('.add-favorito').append('<p><span><i class="fa fa-film" aria-hidden="true"></i>&nbsp&nbsp'+$('#title-movie').html()+'</span></p>');
  });
  
  $('#i-favorito').on('click',function(event){
    event.preventDefault();
    $('.add-favorito').toggleClass('hiden');
  })

});
  
