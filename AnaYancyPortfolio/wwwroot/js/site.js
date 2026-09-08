// =========================================================
// ANA YANCY PORTFOLIO
// CARRUSEL + GALERÍAS + VISOR DE IMÁGENES
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // 1. CARRUSEL PRINCIPAL DE PROYECTOS
    // =====================================================

    const slides = document.querySelectorAll(".project-slide");
    const dots = document.querySelectorAll(".project-dot");

    const projectPrev =
        document.getElementById("projectPrev");

    const projectNext =
        document.getElementById("projectNext");

    let currentSlide = 0;


    function showSlide(index) {

        if (!slides.length) {
            return;
        }

        if (index < 0) {
            index = slides.length - 1;
        }

        if (index >= slides.length) {
            index = 0;
        }

        slides.forEach(function (slide, i) {

            slide.classList.toggle(
                "active",
                i === index
            );

        });


        dots.forEach(function (dot, i) {

            dot.classList.toggle(
                "active",
                i === index
            );

        });


        currentSlide = index;
    }


    projectPrev?.addEventListener(
        "click",
        function () {

            showSlide(currentSlide - 1);

        }
    );


    projectNext?.addEventListener(
        "click",
        function () {

            showSlide(currentSlide + 1);

        }
    );


    dots.forEach(function (dot, index) {

        dot.addEventListener(
            "click",
            function () {

                showSlide(index);

            }
        );

    });


    // =====================================================
    // 2. VISOR GENERAL DE IMÁGENES
    // =====================================================

    const modal =
        document.getElementById("projectImageModal");

    const modalImage =
        document.getElementById("projectModalImage");

    const closeButton =
        document.getElementById("projectModalClose");

    const previousButton =
        document.getElementById("projectModalPrev");

    const nextButton =
        document.getElementById("projectModalNext");


    if (!modal || !modalImage) {
        return;
    }


    // =====================================================
    // PROYECTO ACTUAL
    // =====================================================

    let currentImages = [];

    let currentImageIndex = 0;


    // =====================================================
    // ABRIR IMAGEN
    // =====================================================

    function openImage(images, index) {

        if (!images || !images.length) {
            return;
        }


        currentImages = images;

        currentImageIndex = index;


        updateModalImage();


        modal.classList.add("active");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow = "hidden";
    }


    // =====================================================
    // ACTUALIZAR IMAGEN DEL VISOR
    // =====================================================

    function updateModalImage() {

        if (!currentImages.length) {
            return;
        }


        const image =
            currentImages[currentImageIndex];


        modalImage.src = image.src;

        modalImage.alt = image.alt || "";


        // Caption si existe
        const caption =
            document.getElementById(
                "projectModalCaption"
            );


        if (caption) {

            caption.textContent =
                image.alt || "";

        }

    }


    // =====================================================
    // SIGUIENTE
    // =====================================================

    function nextImage() {

        if (!currentImages.length) {
            return;
        }


        currentImageIndex++;


        if (
            currentImageIndex >=
            currentImages.length
        ) {

            currentImageIndex = 0;

        }


        updateModalImage();
    }


    // =====================================================
    // ANTERIOR
    // =====================================================

    function previousImage() {

        if (!currentImages.length) {
            return;
        }


        currentImageIndex--;


        if (currentImageIndex < 0) {

            currentImageIndex =
                currentImages.length - 1;

        }


        updateModalImage();
    }


    // =====================================================
    // CERRAR VISOR
    // =====================================================

    function closeModal() {

        modal.classList.remove("active");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        modalImage.src = "";


        currentImages = [];

        currentImageIndex = 0;


        document.body.style.overflow = "";
    }


    // =====================================================
    // CADA PROYECTO POR SEPARADO
    // =====================================================

    const projectSlides =
        document.querySelectorAll(
            ".project-slide"
        );


    projectSlides.forEach(function (slide) {


        // =================================================
        // MINIATURAS DE ESTE PROYECTO
        // =================================================

        const thumbnails =
            slide.querySelectorAll(
                ".project-mobile-thumb"
            );


        if (!thumbnails.length) {
            return;
        }


        // =================================================
        // CREAR LISTA DE IMÁGENES
        // SOLO DE ESTE PROYECTO
        // =================================================

        const projectImages =
            Array.from(thumbnails).map(
                function (thumbnail) {

                    return {

                        src:
                            thumbnail.getAttribute(
                                "data-image"
                            ),

                        alt:
                            thumbnail.getAttribute(
                                "data-alt"
                            ) || ""

                    };

                }
            );


        // =================================================
        // PORTADA
        // =================================================

        const mainButton =
            slide.querySelector(
                ".main-image-button"
            );


        if (mainButton) {

            mainButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    // Siempre abre la imagen 0
                    openImage(
                        projectImages,
                        0
                    );

                }
            );

        }


        // =================================================
        // MINIATURAS
        // =================================================

        thumbnails.forEach(
            function (thumbnail, index) {


                thumbnail.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();


                        openImage(
                            projectImages,
                            index
                        );

                    }
                );


            }
        );


        // =================================================
        // GALERÍA DE MINIATURAS
        // =================================================

        const gallery =
            slide.querySelector(
                ".project-mobile-gallery"
            );


        if (!gallery) {
            return;
        }


        const thumbs =
            Array.from(
                gallery.querySelectorAll(
                    ".project-mobile-thumb"
                )
            );


        const previousThumbButton =
            gallery.querySelector(
                ".facturacion-thumb-arrow:first-child"
            );


        const nextThumbButton =
            gallery.querySelector(
                ".facturacion-thumb-arrow:last-child"
            );


        const indicator =
            gallery.querySelector(
                ".facturacion-gallery-controls span"
            );


        // Si no hay controles,
        // no necesitamos paginar miniaturas.

        if (
            !previousThumbButton ||
            !nextThumbButton ||
            !indicator
        ) {

            return;

        }


        const imagesPerPage = 5;

        let currentPage = 0;


        // =================================================
        // MOSTRAR MINIATURAS
        // =================================================

        function updateThumbnailPage() {

            const start =
                currentPage *
                imagesPerPage;


            const end =
                Math.min(
                    start + imagesPerPage,
                    thumbs.length
                );


            thumbs.forEach(
                function (thumb, index) {

                    if (
                        index >= start &&
                        index < end
                    ) {

                        thumb.style.display = "";

                    }
                    else {

                        thumb.style.display =
                            "none";

                    }

                }
            );


            indicator.textContent =
                `${start + 1}–${end} / ${thumbs.length}`;


            previousThumbButton.disabled =
                currentPage === 0;


            nextThumbButton.disabled =
                end >= thumbs.length;

        }


        // =================================================
        // MINIATURAS ANTERIORES
        // =================================================

        previousThumbButton.addEventListener(
            "click",
            function () {

                if (currentPage > 0) {

                    currentPage--;

                    updateThumbnailPage();

                }

            }
        );


        // =================================================
        // MINIATURAS SIGUIENTES
        // =================================================

        nextThumbButton.addEventListener(
            "click",
            function () {

                const maxPage =
                    Math.ceil(
                        thumbs.length /
                        imagesPerPage
                    ) - 1;


                if (currentPage < maxPage) {

                    currentPage++;

                    updateThumbnailPage();

                }

            }
        );


        // =================================================
        // INICIAR GALERÍA
        // =================================================

        updateThumbnailPage();

    });


    // =====================================================
    // BOTÓN SIGUIENTE DEL VISOR
    // =====================================================

    nextButton?.addEventListener(
        "click",
        function () {

            nextImage();

        }
    );


    // =====================================================
    // BOTÓN ANTERIOR DEL VISOR
    // =====================================================

    previousButton?.addEventListener(
        "click",
        function () {

            previousImage();

        }
    );


    // =====================================================
    // BOTÓN CERRAR
    // =====================================================

    closeButton?.addEventListener(
        "click",
        function () {

            closeModal();

        }
    );


    // =====================================================
    // CERRAR HACIENDO CLICK EN EL FONDO
    // =====================================================

    modal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modal
            ) {

                closeModal();

            }

        }
    );
    // =====================================================
    // TECLADO
    // =====================================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !modal.classList.contains("active")
            ) {
                return;
            }

            // ESC
            if (event.key === "Escape") {

                closeModal();

            }

            // DERECHA
            if (event.key === "ArrowRight") {

                nextImage();

            }

            // IZQUIERDA
            if (event.key === "ArrowLeft") {

                previousImage();

            }

        }
    );


    // =====================================================
    // VISOR DE CERTIFICADOS
    // =====================================================

    const certificadoPreviews =
        document.querySelectorAll(".certificado-preview");

    const certificadoModal =
        document.getElementById("certificadoModal");

    const certificadoModalImagen =
        document.getElementById("certificadoModalImagen");

    const certificadoCerrar =
        document.querySelector(".certificado-cerrar");


    if (
        certificadoPreviews.length &&
        certificadoModal &&
        certificadoModalImagen &&
        certificadoCerrar
    ) {

        certificadoPreviews.forEach(function (preview) {

            preview.addEventListener(
                "click",
                function () {

                    const imagen =
                        preview.querySelector("img");

                    if (!imagen) {
                        return;
                    }

                    certificadoModalImagen.src =
                        imagen.src;

                    certificadoModalImagen.alt =
                        imagen.alt || "Certificado";

                    certificadoModal.classList.add(
                        "activo"
                    );

                    document.body.style.overflow =
                        "hidden";

                }
            );

        });


        // CERRAR CON X

        certificadoCerrar.addEventListener(
            "click",
            function () {

                certificadoModal.classList.remove(
                    "activo"
                );

                certificadoModalImagen.src = "";

                document.body.style.overflow = "";

            }
        );


        // CERRAR HACIENDO CLICK EN EL FONDO

        certificadoModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === certificadoModal
                ) {

                    certificadoModal.classList.remove(
                        "activo"
                    );

                    certificadoModalImagen.src = "";

                    document.body.style.overflow = "";

                }

            }
        );


        // CERRAR CON ESC

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    certificadoModal.classList.contains(
                        "activo"
                    )
                ) {

                    certificadoModal.classList.remove(
                        "activo"
                    );

                    certificadoModalImagen.src = "";

                    document.body.style.overflow = "";

                }

            }
        );

    }

});