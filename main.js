
document.addEventListener("DOMContentLoaded", function() {
    const generateButton = document.getElementById("generate-button");
    const downloadButton = document.getElementById("download-button");
    const textInput = document.getElementById("text-input");
    const qrcodeDiv = document.getElementById("qrcode");

    let downloadPending = false;  // Variable para controlar si la descarga está pendiente

    generateButton.addEventListener("click", function() {
        const text = textInput.value;

        if (text.trim() !== "") {
            qrcodeDiv.innerHTML = "";
            const qrcode = new QRCode(qrcodeDiv, {
                text: text,
                width: 128,
                height: 128
            });

            // Mostrar el botón de descarga
            downloadButton.style.display = "block";
        } else {
            // Reemplazar el alert con SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor ingrese un texto para generar el código QR.',
            });
        }
    });

    downloadButton.addEventListener("click", function() {
        const qrImage = qrcodeDiv.querySelector("img");
        if (qrImage) {
            // Reemplazar el prompt con SweetAlert
            Swal.fire({
                title: 'Ingrese un nombre para el archivo (sin extensión):',
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off',
                    style: 'width: 85%;'  // Agrega el estilo para el ancho del 85%
                },
                showCancelButton: true,
                confirmButtonText: 'Descargar',
                cancelButtonText: 'Cancelar',
                customClass: {
                    input: 'swal-input-custom'  // Clase personalizada para el campo de entrada
                }
            }).then((result) => {
                if (result.value) {
                    // Marcar la descarga como pendiente
                    downloadPending = true;
                } else {
                    // SweetAlert para manejar la cancelación
                    Swal.fire('Descarga cancelada', '', 'info');
                }
            });
        }
    });

    // Manejar el evento antes de que se abra el diálogo de descarga
    window.addEventListener("beforeunload", function (e) {
        if (downloadPending) {
            // Cancelar la apertura del diálogo de descarga
            const confirmationMessage = "¿Estás seguro de salir sin descargar?";
            (e || window.event).returnValue = confirmationMessage;
            return confirmationMessage;
        }
    });

    // Manejar el evento cuando SweetAlert se cierra
    document.body.addEventListener("click", function () {
        if (downloadPending) {
            // Crear y abrir el enlace de descarga
            const qrImage = qrcodeDiv.querySelector("img");
            if (qrImage) {
                const link = document.createElement("a");
                link.href = qrImage.src;
                link.download = `${result.value}.png`;
                link.click();
            }

            // Reiniciar la variable de descarga pendiente
            downloadPending = false;
        }
    });
});
