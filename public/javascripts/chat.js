$(function() {

  let socket = io();


  $('form').submit((event) => {
    event.preventDefault();
    //set user message to equal the values of what is input
    let userMessage =  $('.textbox').val();
    let userName = $('.name').val();

    socket.emit('chat message', {
      message: userMessage,
      userName: userName
    });

    //clear typing box
    $('.textbox').val('');
  });

  socket.on('chat message', (message) => {
    console.log("client", message.userName)
    $('#messages').append(
      `<tr>
        <td>${message.userName}:</td>
        <td>${message.message}</td>
      </tr>`
    )
  });

});
