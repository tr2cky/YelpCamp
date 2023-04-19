function previewMultiple(event) {
    const images = document.getElementById("image");
    const number = images.files.length;
    for (i = 0; i < number; i++) {
        const urls = URL.createObjectURL(event.target.files[i]);
        document.getElementById("formFile").innerHTML += '<img src="' + urls + '">';
    }
}