// Your solution here

$(document).ready(function() {

  var $donutList = $("ul#doughnuts");
  var $editModal = $("#edit-modal");
  var editButton = '<button type="button" class="edit btn btn-warning">Edit</button>';
  var deleteButton = '<button type="button" class="delete btn btn-danger">Delete</button>';

  function bindEdit(){
    $('.edit').off().on('click', function(){
      console.log('Click.');
      $('#edit-modal').modal();
    });
  }

  // GET ALL or ONE
  $.ajax({
    url: "https://api.doughnuts.ga/doughnuts/",
    method: "GET",
    success: function(response, status) {
      response.forEach(function(elem, index){
        var $newMenu = $('<li data-id="'+elem.id+'"></li>');
        $newMenu.append(response[index].flavor + ' - ');
        $newMenu.append(response[index].style + ' - ');
        $newMenu.append(editButton);
        $newMenu.append(deleteButton);
        $donutList.append($newMenu);
        bindEdit();
        bindDelete();
      });
    },
    error: function(response, status) {
      console.log(response);
      console.log(status);
    }
  });

  // POST
  $('#new-doughnut').on('submit', function(e){
    e.preventDefault();
    $.ajax({
      url: "https://api.doughnuts.ga/doughnuts/",
      method: "POST",
      data: {
        style: $('#new-doughnut-style').val(),
        flavor: $('#new-doughnut-flavor').val()
      },
      success: function(response, status) {
        console.log(response);
        var $newDonut = $('<li data-id='+response.id+'></li>');
        $newDonut.append(response.flavor + ' - ');
        $newDonut.append(response.style + ' - ');
        $newDonut.append(editButton);
        $newDonut.append(deleteButton);
        $donutList.prepend($newDonut);
        bindEdit();
        bindDelete();
      },
      error: function(response, status) {
        console.log(response);
        console.log(status);
      }
    });
  });



  // PUT
  $('#edit-modal').on('submit', function(e){
    e.preventDefault();
    $.ajax({
      url: "https://api.doughnuts.ga/doughnuts/",
      method: "PUT",
      data: {
        style: $('#edit-doughnut-style').val(),
        flavor: $('#edit-doughnut-flavor').val()
      },
      success: function(response, status) {
        console.log(response);
        console.log(status);
      },
      error: function(response, status) {
        console.log(response);
        console.log(status);
      }
    });
  });

  // DELETE
  function bindDelete() {
    $('.delete').off().on('click', function(){
      console.log("Click.");
      $.ajax({
        url: "https://api.doughnuts.ga/doughnuts/" + $("this#id").val(),
        method: "DELETE",
        success: function(response, status) {
          console.log("DELETE!!! DELEEEEEETE!!!")
          console.log(response);
          console.log($(this));
          $(this).parent().attr('id').remove();
        },
        error: function(response, status) {
          console.log("Delete failed");
          console.log(response);
          console.log(status);
        }
      });
    });
  }

});
