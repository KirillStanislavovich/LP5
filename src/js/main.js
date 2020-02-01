$(document).ready(function() {
  $('.card').on('click', function() {
    let item = $(this).children('.card__title');
    item.animate({
      'margin': '5px',
      'font-size': '25px',
      'background-size': '0'
    }, 500);
  });

  $('input[type="tel"]').inputmask({"mask": "8 (999) 999-9999"});

  $('form').each(function() {
    $(this).validate({
      errorPlacement(error, element) {
        return true;
      },
      focusInvalid: false,
      rules: {
        name: {
          required: true,
        },
        phone: {
          required: true,
        }
      },
      submitHandler(form) {
        let th = $(form);
        $.ajax({
          type: 'POST',
          url: '../../build/php/post.php',
          data: th.serialize(),
        }).done(() => {
          th.trigger('reset');
        });
        return false;
      },
    })
  });
});
