$( document.body ).on( 'click', '.dropdown-menu li', function( event ) {
  var $target = $( event.currentTarget );
  $target.closest( '.btn-group' )
  .find( '[data-bind="label"]' )
  .text( $target.text() )
  .end()
  .children( '.dropdown-toggle' )
  .dropdown( 'toggle' );


  var userId = $target.attr('id').split('-')[0];
  var role = $target.attr('id').split('-')[1];

  $.post('/admin/user/'+userId+'/role', {role: role});

  return false;
});
