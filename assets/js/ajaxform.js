$(document).ready(function() {
    $('#ajax-form').submit(function(e) {
        e.preventDefault(); // Prevent form submission

        var form = $(this);
        var url = form.attr('action');
        var formData = form.serialize();

        $.ajax({
            type: 'POST',
            url: url,
            data: formData,
            dataType: 'json',
            success: function(response) {
                $('#result').text(response.message || 'Your message was sent successfully.');
                $('#result').removeClass('text-red-500').addClass('text-green-500');
            },
            error: function(xhr, status, error) {
                var errorMessage = xhr.responseJSON && (xhr.responseJSON.message || xhr.responseJSON.error);
                if (!errorMessage) {
                    errorMessage = 'Unable to send your message. Please try again.';
                }
                $('#result').text(errorMessage);
                $('#result').removeClass('text-green-500').addClass('text-red-500');
            }
        });
    });
});
