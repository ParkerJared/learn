$(document).ready( function(){

    let active = $(`a[href="${location.pathname}"]`);
    if( active[0] ){
      // Show active page
      active.addClass('active');

      // Dropdown to active page
      active.parents('.dropdown').children('.nav').slideToggle(0);
      // Scroll to active page
      $('.sidebar').scrollTop( active.offset().top );
    };

    $('.dropdown a:not(:only-child)').click( function(){
      $(this).parent().children('.nav').stop().slideToggle();
    });

    // Page transitions

    function transitionPage( href ){

        $('.nav a').removeClass( 'active' );
        $(`a[href="${href}"]`).addClass('active');

        $.ajax({
            url: href,
            success: function( data ){
                $('.main').fadeOut( 300, () => {
                    let content = $(data).filter('.main').html();
                    
                    $('.main').html(content);

                    $('.main').fadeIn( 300 );
                });
            }
        });
    };

    // $(window).on('popstate', function(){
    //    transitionPage( location.href );
    // });

    // $('a').click( function(e){
    //     let href = $(this).attr('href');

    //     if( location.href.split('/').includes(href.split('/')[1]) ){};

    //     e.preventDefault();

    //     if( href ){
    //         window.history.pushState(null, null, href);

    //         transitionPage( href );
    //     };
    // });
});