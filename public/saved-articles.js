$(document).ready(function () {
    $(document).on('click', '.add-note', function () {
        $('#article-note-container').empty();
        $('#articleID').empty();
        var id = $(this).parent().parent().attr('id');
        $('#save-note-btn').attr('data-note-id', id);
        $('#article-note-container').attr('data-note-id', id);
        console.log("Id of note" + id);
        $.ajax({ url: '/articleNotes/' + id }).done(function (notes) {
            console.log(notes);
            $('#articleID').text(id);
            if (notes.length === 0) {
                $('#article-note-container').text("No notes for this article yet.");
            }
            else {
                for (var i = 0; i < notes.length; i++) {
                    var notediv = $('<div>');
                    notediv.addClass('note-div');
                    notediv.attr('id', notes[i]._id);

                    var note_p = $('<p>');
                    note_p.text(notes[i].note);

                    var delete_btn = $('<div>');
                    delete_btn.addClass('btn btn-danger delete-note');
                    delete_btn.text('X');

                    notediv.append(note_p).append(delete_btn);
                    $('#article-note-container').append(notediv);
                }
            }
            $('#notesModal').modal('toggle');
        });
    });

    $(document).on('click', '#save-note-btn', function () {
        var new_note = $('#new-note').val();
        var id = $(this).attr('data-note-id');
        console.log(new_note);
        $.post('/addNote', { note: new_note, id: id }, function (response) {
            console.log(response);
            $('#article-note-container').empty();
            $('#articleID').empty();
            $('#new-note').val("");
        });
    });

    $(document).on('click', '.delete-article', function () {
        var id = $(this).parent().parent().attr('id');

        console.log(id);
        $(this).parent().parent().remove();
        $.post('/deleteArticle', { id: id }, function (response) {
            console.log(response);
        });
    });

    $(document).on('click', '.delete-note', function () {
        var noteId = $(this).parent().attr('id');
        var articleId = $('#article-note-container').attr('data-note-id');
        $('#article-note-container').empty();
        $('#articleID').empty();
        $('#new-note').val("");
        $('.close').click();
        console.log(noteId);
        $.post('/deleteNote', { noteid: noteId, articleid: articleId }, function (response) {
            console.log(response);
        });
    });
});