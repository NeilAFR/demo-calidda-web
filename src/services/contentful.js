const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const deliveryToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
const previewToken = import.meta.env.VITE_CONTENTFUL_PREVIEW_TOKEN;
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
// ============================================================================
// FUNCIÓN 1: Trae TODOS los beneficios (Usada en Inicio.vue para las tarjetas)
// ============================================================================
export const obtenerBeneficios = async (esPreview = false) => {
    const baseHost = esPreview ? 'preview.contentful.com' : 'cdn.contentful.com';
    const token = esPreview ? previewToken : deliveryToken;

    const url = `https://${baseHost}/spaces/${spaceId}/environments/master/entries?content_type=beneficioCorporativo`;

    try {
        const respuesta = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const datos = await respuesta.json();
        return datos.items.map(item => ({
            id: item.sys.id,
            titulo: item.fields.titulo,
            descripcion: item.fields.descripcion,
            icono: item.fields.icono || 'star',
            estado: item.sys.publishedAt ? 'Publicado' : 'Borrador'
        }));
    } catch (error) {
        console.error("Error obteniendo beneficios:", error);
        return [];
    }
};

// ============================================================================
// FUNCIÓN 2: Trae UN SOLO beneficio por ID (Usada en DetalleBeneficioView.vue)
// ============================================================================
export const obtenerBeneficioPorId = async (id, esPreview = false) => {
    const parametros = new URLSearchParams(window.location.search);
    const esPreview = parametros.get('preview') === 'true';
    const baseHost = esPreview ? 'preview.contentful.com' : 'cdn.contentful.com';
    const token = esPreview ? previewToken : deliveryToken;

    // TRUCO: Usamos ?sys.id= y &include=2 para que Contentful nos empaquete los PDFs adjuntos
    const url = `https://${baseHost}/spaces/${spaceId}/environments/master/entries?sys.id=${id}&include=2`;

    try {
        const respuesta = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await respuesta.json();

        // Si no hay resultados, regresamos null
        if (!data.items || data.items.length === 0) return null;

        const item = data.items[0];
        const assets = data.includes?.Asset || []; // Aquí vienen escondidos los PDFs

        // 1. Procesamos los documentos si es que Marketing subió alguno
        const documentosRaw = item.fields.documentosDescargables || [];
        const documentosProcesados = documentosRaw.map(docLink => {
            // Buscamos el archivo real usando su ID
            const archivoReal = assets.find(a => a.sys.id === docLink.sys.id);
            if (archivoReal) {
                return {
                    id: archivoReal.sys.id,
                    titulo: archivoReal.fields.title,
                    url: `https:${archivoReal.fields.file.url}`, // Le agregamos https:
                    peso: (archivoReal.fields.file.details.size / 1024 / 1024).toFixed(2) + ' MB' // Convertimos bytes a MB
                };
            }
            return null;
        }).filter(Boolean); // Limpiamos los nulos

        // 2. Traducimos el Rich Text a HTML
        const contenidoHtml = item.fields.contenidoDetallado
            ? documentToHtmlString(item.fields.contenidoDetallado)
            : '<p>No hay detalles adicionales disponibles.</p>';

        let imagenUrl = null;
        if (item.fields.imagen && item.fields.imagen.sys) {
            const archivoImagen = assets.find(a => a.sys.id === item.fields.imagen.sys.id);
            if (archivoImagen) {
                imagenUrl = `https:${archivoImagen.fields.file.url}`;
            }
        }
        const areasRaw = item.fields.areasDestacadas || [];
        const areasProcesadas = areasRaw.map(ref => {
            // 1. Buscamos el contenido de la cajita en los "includes"
            const areaEntry = data.includes?.Entry?.find(e => e.sys.id === ref.sys.id);
            if (!areaEntry) return null;

            // 2. Buscamos la foto de esta cajita específica
            let areaImgUrl = null;
            if (areaEntry.fields.imagen && areaEntry.fields.imagen.sys) {
                const areaImgAsset = data.includes?.Asset?.find(a => a.sys.id === areaEntry.fields.imagen.sys.id);
                if (areaImgAsset) {
                    areaImgUrl = `https:${areaImgAsset.fields.file.url}`;
                }
            }

            // 3. Devolvemos la cajita armada
            return {
                id: areaEntry.sys.id,
                titulo: areaEntry.fields.titulo,
                descripcion: areaEntry.fields.descripcion,
                imagenUrl: areaImgUrl
            };
        }).filter(Boolean); // Limpiamos los vacíos
        return {
            id: item.sys.id,
            titulo: item.fields.titulo,
            descripcion: item.fields.descripcion,
            icono: item.fields.icono,
            plantilla: item.fields.plantillaVisual || 'plantilla-eps',
            contactoNombre: item.fields.nombreContactoRrhh,
            contactoCorreo: item.fields.correoContactoRrhh,
            // ¡Nuestros nuevos campos listos para usar!
            contenidoHtml: contenidoHtml,
            contactoTelefono: item.fields.telefonoContactoRrhh,
            documentos: documentosProcesados,
            imagenUrl: imagenUrl,
            areasDestacadas: areasProcesadas
        };
    } catch (error) {
        console.error("Error obteniendo el beneficio por ID:", error);
        return null;
    }
};