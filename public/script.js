$(document).ready( function(){

    // Set page title
    let subject = $('.sidebar .wrapper > a').text().trim();
    let topic   = $('.main h1:first-child()').text().trim();
    document.title = `${subject}${ (topic) ? ` - ${topic}` : '' }`;

    let active = $(`a[href="${location.pathname}"]`);
    if( active[0] ){
      // Show active page
      active.addClass('active');

      // Dropdown to active page
      active.parents('.dropdown').children('.nav').slideToggle(0);
      // Scroll to active page
      $('.sidebar').scrollTop( active.offset().top );
    };

    // Open links that are not pages in a new tab
    $(`a[href]:not([href^="/${window.location.pathname.split('/')[1]}"])`).attr( 'target', '_blank' );

    // Toggle dropdown items
    $('.dropdown a:not(:only-child)').click( function(){
      $(this).parent().children('.nav').stop().slideToggle();
    });

    // Toggle sidebar (mobile) - event: click link in nav or click drawer
    $('.drawer, .sidebar .item:not(.dropdown) a').click( function(){
      $('.sidebar').toggleClass('hide');
      $('.drawer i').toggleClass('fas far');
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