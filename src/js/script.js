



$('.button1').click(function(){
    var lang = $('html').attr('lang');
    if(lang == 'fr') $('html').attr('lang','ar');
    if(lang == 'ar') $('html').attr('lang','fr');
   
  });
