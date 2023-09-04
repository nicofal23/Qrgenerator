document.addEventListener("DOMContentLoaded", function() {
    const generateButton = document.getElementById("generate-button");
    const downloadButton = document.getElementById("download-button");
    const textInput = document.getElementById("text-input");
    const qrcodeDiv = document.getElementById("qrcode");
    const qrCard = document.getElementById("qr-card");

    generateButton.addEventListener("click", function() {
        const text = textInput.value;

        if (text.trim() !== "") {
            qrcodeDiv.innerHTML = "";
            const qrcode = new QRCode(qrcodeDiv, {
                text: text,
                width: 128,
                height: 128
            });

            // Mostrar el texto de emergencia
            const qrText = document.getElementById("qr-text");
            qrText.style.display = "block";

            // Mostrar el botón de descarga
            downloadButton.style.display = "block";

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

    // Manejar clic en el botón de descarga
    downloadButton.addEventListener("click", function() {
        html2canvas(qrCard).then(function(canvas) {
            // Convierte la card en una imagen

            // Crea un enlace para descargar la imagen
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "qr_card.png";
            link.click();
        });
    });
});
