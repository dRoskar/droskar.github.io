var fileName = "subtitles.srt";
var fileType = "application/x-subrip;charset=utf-8";

$(document).ready(function() {
    $("#file-upload").change(readFile)
});

function readFile(e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    if (!file) {
        return;
    }

    fileName = file.name;

    if(!file.name.endsWith(".srt") && !file.name.endsWith(".txt")){
        console.error("Invalid file type!");
        return;
    }

    if(fileName.endsWith(".txt")) {
        fileType = "text/plain;charset=utf-8";
        console.log(fileType);
    }

    reader.readAsText(file)

    reader.onerror = errorHandler;
    reader.onload = fileLoaded;
}

function fileLoaded(e) {
    // clean
    var cleanedString = subtitleCleaner.cleanSubtitle(e.target.result);
    var highlightedSubtitle = subtitleCleaner.highlightSubtitle(e.target.result);

    // create blob
    var blob = new Blob([cleanedString], {
        type: "application/x-subrip;charset=utf-8"
    });

    var url = URL.createObjectURL(blob);
    $("#download-link").removeAttr('hidden');
    $("#download-link").attr("download", fileName);
    $("#download-link").attr("href", url);
}

function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
      console.error("The file could not be read");
    }
  }