document.addEventListener("DOMContentLoaded", function() {
    const generateButton = document.getElementById("generate-button");
    const textInput = document.getElementById("text-input");
    const qrcodeDiv = document.getElementById("qrcode");

    generateButton.addEventListener("click", function() {
        const text = textInput.value;

        if (text.trim() !== "") {
            qrcodeDiv.innerHTML = "";
            const qrcode = new QRCode(qrcodeDiv, {
                text: text,
                width: 128,
                height: 128
            });

            // Guardar el código QR en el almacenamiento local
            const qrImage = qrcodeDiv.querySelector("img");
            if (qrImage) {
                const qrDataURL = qrImage.src;
                localStorage.setItem("qrCode", qrDataURL);
            }
        } else {
            alert("Por favor ingrese un texto para generar el código QR.");
        }
    });

    // Recuperar el código QR almacenado al cargar la página
    const storedQR = localStorage.getItem("qrCode");
    if (storedQR) {
        const qrImage = document.createElement("img");
        qrImage.src = storedQR;
        qrcodeDiv.appendChild(qrImage);
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const generateButton = document.getElementById("generate-button");
    const downloadButton = document.getElementById("download-button"); // Nuevo
    const textInput = document.getElementById("text-input");
    const qrcodeDiv = document.getElementById("qrcode");

    generateButton.addEventListener("click", function() {
        // ... Tu código existente para generar el código QR ...

        // Mostrar el botón de descarga
        downloadButton.style.display = "block";
    });

    // Nuevo: Manejar clic en el botón de descarga
    downloadButton.addEventListener("click", function() {
        const qrImage = qrcodeDiv.querySelector("img");
        if (qrImage) {
            const link = document.createElement("a");
            link.href = qrImage.src;
            link.download = "qr_code.png";
            link.click();
        }
    });
});


