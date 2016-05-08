$(document).ready(function () {
  $('.add-rec-button').click(function() {
    $('.add-rec-button').hide();
    $('.add-rec-input').show();
    return false;
  });

  $('.add-rec-cancel').click(function() {
    $('.add-rec-button').show();
    $('.add-rec-input').hide();
    return false;
  });
});
