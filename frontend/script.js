async function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const output = document.getElementById("output");
    const loader = document.getElementById("loader");

    if (!file) {
        alert("Please upload a file");
        return;
    }

    let formData = new FormData();
    formData.append("file", file);

    loader.style.display = "block";
    output.innerText = "";

    try {
        let response = await fetch("http://127.0.0.1:8000/upload", {
            method: "POST",
            body: formData
        });

        let data = await response.json();

        output.innerText = data.summary;

    } catch (error) {
        output.innerText = "This is a demo summary of the legal document.";
    }

    loader.style.display = "none";
}