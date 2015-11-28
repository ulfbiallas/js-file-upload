var filelist = [];
var isOverDropZone = false;

$('html').on('dragover', function(event) {
    if(!isOverDropZone) event.originalEvent.dataTransfer.dropEffect = 'none'
    event.preventDefault();  
    event.stopPropagation();
});
$('html').on('dragleave', function(event) {
    event.preventDefault();  
    event.stopPropagation();
});
$('html').on('drop', function(event) {
    event.preventDefault();  
    event.stopPropagation();
});



$('#uploadzone').on('dragover', function(event) {
    event.originalEvent.dataTransfer.dropEffect = 'copy'
    $(this).addClass('dragging');
    isOverDropZone = true;
});
$('#uploadzone').on('dragleave', function(event) {
    $(this).removeClass('dragging');
    isOverDropZone = false;
});
$('#uploadzone').on('drop', function(event) {
    $(this).removeClass('dragging');
    for (var i=0; i<event.originalEvent.dataTransfer.files.length; i++) {
        uploadFile(event.originalEvent.dataTransfer.files[i]);
    }
});



function uploadFile(file) {
    var data = new FormData();
    data.append('data', file);

    $.ajax({
        url: 'http://localhost:8080',
        type: 'POST',
        data: data,
        processData: false,
        contentType: false
    }).done(function() {
        filelist.push(file.name);
        $('#filelist').html(filelist.join('<br>'))
    });
}