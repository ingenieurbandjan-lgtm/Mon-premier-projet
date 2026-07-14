document.addEventListener("DOMContentLoaded", () => {
    const cv = document.querySelector(".cv");

    if (!cv) {
        return;
    }

    cv.style.opacity = "0";
    cv.style.transform = "translateY(40px)";

    window.setTimeout(() => {
        cv.style.transition = "all 0.8s ease";
        cv.style.opacity = "1";
        cv.style.transform = "translateY(0)";
    }, 100);
});

function downloadPDF() {
    // Masquer le bouton avant impression
    const downloadBtn = document.querySelector(".download");
    if (downloadBtn) {
        downloadBtn.style.display = "none";
    }

    // Ajouter des styles d'impression temporaires
    const style = document.createElement('style');
    style.textContent = `
        @media print {
            body { margin: 0 !important; padding: 0 !important; background: white !important; }
            html { margin: 0 !important; padding: 0 !important; }
        }
    `;
    document.head.appendChild(style);

    // Attendre un bit pour que le DOM se mette à jour
    setTimeout(() => {
        window.print();
        
        // Restaurer le bouton après impression/annulation
        setTimeout(() => {
            if (downloadBtn) {
                downloadBtn.style.display = "flex";
            }
            document.head.removeChild(style);
        }, 500);
    }, 100);
}

// Gérer les événements d'impression
window.addEventListener("beforeprint", () => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.body.style.backgroundColor = "white";
    
    // Forcer les couleurs
    document.documentElement.style.colorScheme = "light";
});

window.addEventListener("afterprint", () => {
    document.body.style.margin = "";
    document.body.style.padding = "";
    document.body.style.backgroundColor = "";
});