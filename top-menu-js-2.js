/**
 * jQuery-Plugin "clearField"
 * 
 * @version: 1.1, 04.12.2010
 * 
 * @author: Stijn Van Minnebruggen
 *          stijn@donotfold.be
 *          http://www.donotfold.be
 * 
 * @example: $('selector').clearField();
 * @example: $('selector').clearField({ blurClass: 'myBlurredClass', activeClass: 'myactiveClass' });
 * 
 */
	
	(function($){$.fn.clearField=function(s){s=jQuery.extend({blurClass:'clearFieldBlurred',activeClass:'clearFieldActive',attribute:'rel',value:''},s);return $(this).each(function(){var el=$(this);s.value=el.val();if(el.attr(s.attribute)==undefined){el.attr(s.attribute,el.val()).addClass(s.blurClass)}else{s.value=el.attr(s.attribute)}el.focus(function(){if(el.val()==el.attr(s.attribute)){el.val('').removeClass(s.blurClass).addClass(s.activeClass)}});el.blur(function(){if(el.val()==''){el.val(el.attr(s.attribute)).removeClass(s.activeClass).addClass(s.blurClass)}})})}})(jQuery);


;
(function ($) {

  Drupal.behaviors.ulima = {
    attach: function(context, settings) {
      //text clear
      $('.block-search .form-text').clearField();
      $('#edit-field-user-email-und-0-email').clearField();
      $('#edit-field-user-page-und-0-url').val("URL Página Web");
      $('#edit-field-user-page-und-0-url').clearField();   
      $('#links-button', context).click(linksButton);
      $('#login-button', context).click(loginButton);
      $('#ulima-login', context).click(displayCommentForm);
      $('#guest-login', context).click(displayCommentForm);
      
      selectTopMenuStatus(context);
      
      //New formatter accordeon
      $('.product-info').hide();
      $('.collapsed').hide();

      $('.uncollapsed').click(function(e){
        $(this).siblings('.product-info').slideDown(800);
        $(this).hide();
        $(this).siblings('.collapsed').show();
        return e.preventDefault();
      });

      $('.collapsed').click(function(e){
        $(this).siblings('.product-info').slideUp(800);
        $(this).hide();
        $(this).siblings('.uncollapsed').show();
        return e.preventDefault();
      });

      //accordeon
      $('.ul-container').hide();
      $('.show').click(function(e){
        $(this).siblings('div, ul').slideDown(800);
        $(this).hide();
        $(this).siblings('.hide').show();
        $(this).siblings('.hide').css('display', 'block');
        return e.preventDefault();
      });

      $('.hide').click(function(e){
        $(this).siblings('div, ul').slideUp(800);
        $(this).hide();
        $(this).siblings('.show').show();
        $(this).siblings('.show').css('display', 'block');
        return e.preventDefault();
      });

      //Accordion widget

      //content is hidden by default
      $('.accordion-content').hide();

      $('.accordion-title').click(function(e){

        var accordionContent = $(this).parent().find('.accordion-content');

        if (accordionContent.css('display') != 'block') {
          $(this).removeClass('closed');
          $(this).addClass('open');
          accordionContent.slideDown(800);
        }
        else {
          $(this).removeClass('open');
          $(this).addClass('closed');
          accordionContent.slideUp(800);
        }

        return e.preventDefault();
      });

      $('.cycle-movie-list').cycle({
        fx:     'fade',
        pager:  '.pager-slide',
        pagerAnchorBuilder: function(index, DOMelement){
          element = '<li><a href="">';
          element = element + Drupal.settings.feature_movies.image[index];
          element = element + '</a></li>';
          return element;
        }
      });
 
      $('.field-name-field-wymeditor a').click(function(){
        var url_to_copy = $(this).attr('href');
        url_to_copy = url_to_copy.replace('https', 'http');

        if($(this).next().children().first().val() != url_to_copy){
          url_to_copy = '<div><input type="text" class="form-text form-text-image-wymeditor" readonly="readonly" value="' + url_to_copy + '" /> </div>'
          $(url_to_copy).insertAfter($(this));
        }
        return false;
      });
   }
  };
  
  function selectTopMenuStatus(context) {
    if(Drupal.settings.ulima_topmenu == undefined) return;
    if(Drupal.settings.ulima_topmenu.ulima_topmenu_status == undefined) return;

    switch(Drupal.settings.ulima_topmenu.ulima_topmenu_status){
      case 1:
        $('#login-button', context).click();
        break;
      case 2:
        $('#links-button', context).click();
        break;
    }
  }
  
  var displayCommentForm = function(){
    $button = $(this);
    if ($button.attr("id") == 'guest-login'){
      $("#comment_login_form").hide();
      $("#tab-1").addClass('active');
      $("#tab-2").removeClass('active');
      $("#comment_anonymous_form").show();
    }
    else if ($button.attr("id") == 'ulima-login'){
      $("#comment_login_form").show();
      $("#tab-1").removeClass('active');
      $("#tab-2").addClass('active');
      $("#comment_anonymous_form").hide();
    }
    return false;
  }

  var linksButton = function() {
    if($('.top-menu').css('display') == "block") {
      $('.top-menu').slideToggle(1000, function(){
        $('#links-button').removeClass('top-tabs-active');
        $('#login-button').removeClass('top-tabs-active');
        if($('.top-menu-user').css('display') != "none") {
          $('.top-menu-user').hide();
          $('.top-menu-links').show();
          $('.top-menu').slideToggle(1000, function(){
            $('#links-button').addClass('top-tabs-active');
          });

          if(Drupal.settings.js_extra_settings.logged_in == 1){
            $.ajax({
              url: Drupal.settings.basePath+'ulima_topmenu_ajax/2'
            });
          }
        }
        else{
          if(Drupal.settings.js_extra_settings.logged_in == 1){
            $.ajax({
              url: Drupal.settings.basePath+'ulima_topmenu_ajax/0'
            });
          }        
        }
      });
    }
    else {
      $('.top-menu-user').hide();
      $('.top-menu-links').show();
      $('.top-menu').slideToggle(1000, function(){
        $('#links-button').addClass('top-tabs-active');
      });

      if(Drupal.settings.js_extra_settings.logged_in == 1){
        $.ajax({
          url: Drupal.settings.basePath+'ulima_topmenu_ajax/2'
        });
      }
    };
  }

  var loginButton = function () {
    if($('.top-menu').css('display') == "block") {
      $('.top-menu').slideToggle(1000, function(){
        $('#links-button').removeClass('top-tabs-active');
        $('#login-button').removeClass('top-tabs-active');
        if($('.top-menu-links').css('display') != "none") {
          $('.top-menu-links').hide();
          $('.top-menu-user').show();
          $('.top-menu').slideToggle(1000, function(){
            $('#login-button').addClass('top-tabs-active');
          });

          if(Drupal.settings.js_extra_settings.logged_in == 1){
            $.ajax({
              url: Drupal.settings.basePath+'ulima_topmenu_ajax/1'
            });
          }
        }
        else{
          if(Drupal.settings.js_extra_settings.logged_in == 1){
            $.ajax({
              url: Drupal.settings.basePath+'ulima_topmenu_ajax/0'
            });
          }          
        }
      });//slideToggle
    }
    else {
      $('.top-menu-links').hide();
      $('.top-menu-user').show();
      $('.top-menu').slideToggle(1000, function(){
        $('#login-button').addClass('top-tabs-active');
      });

      if(Drupal.settings.js_extra_settings.logged_in == 1){
        $.ajax({
          url: Drupal.settings.basePath+'ulima_topmenu_ajax/1'
        });
      }
    };
  }
}(jQuery));
;
