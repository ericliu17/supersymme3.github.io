$(document).ready(function () {

  var rainbow = ["white", "brown", "violet", "blue", "green", "yellow", "orange", "red", "black"];
  var $pixel = $("#name span"), firstName = "pixel", char = 0;            //For animating logo
  var cellSize = 5,                                                       //For making grid; cellSize in px
    height = Math.floor(($(window).height() - 1)/(cellSize + 1)) - 40,      //Subtract header
    width = Math.floor(($(window).width() - 1)/(cellSize + 1));

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  function typeFirstName() {
    var randomColor = rainbow[getRandomInt(0, rainbow.length)];

    var timeout = setTimeout(function() {
      var letters = firstName.substring(0, char);

      $pixel.text(letters).css("color", randomColor);

      if (char === firstName.length) {
        $("td").hover(function() {                                        //Set initial drawing color
          $(this).css("background-color", randomColor);
        });
        clearTimeout(timeout);
      }
      else {
        char++;
        typeFirstName();
      };

    }, 300);
  };

  function makeGrid(x, y) {
    var cells = "";

    for (var i = 0; i < x; i++) {
      cells += "<tr>";
      for (var j = 0; j < y; j++) {
        cells += "<td></td>";
      };
      cells += "</tr>";
    };

    return cells;
  };

  function makeColorPicker() {
    var buttons = "";

    $.each(rainbow, function(index, color) {
      buttons += "<button id=\"" + color + "\" style=\"background-color:" +
        color + "\"></button>";
    });

    return buttons;
  }

  $(window).load(function() {                                             //Animate logo on load
    typeFirstName();
  });

  $(window).resize(function() {                                           //Redraw grid on window resize
    location.reload();
  });

  $("#colorpicker").append(makeColorPicker());                            //Make colorPicker

  $("#palette").append(makeGrid(height, width));                          //Make grid

  $("#colorpicker button").click(function() {                             //Colorpicker controls
    var color = $(this).attr("id");
    $("td").hover(function() {
      $(this).css("background-color", color);
    });
  });

  $("#clear").click(function() {                                          //Clear grid button
    location.reload();
  });

});
