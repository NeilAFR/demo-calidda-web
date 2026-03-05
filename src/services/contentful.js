import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const deliveryToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
const previewToken = import.meta.env.VITE_CONTENTFUL_PREVIEW_TOKEN;

export const obtenerBeneficios = async () => {
    // Detectamos si estamos en la URL de preview para el Inicio también
    const parametros = new URLSearchParams(window.location.search);
    const modoPreviewActivo = parametros.get('preview') === 'true';

    const baseHost = modoPreviewActivo ? 'preview.contentful.com' : 'cdn.contentful.com';
    const token = modoPreviewActivo ? previewToken : deliveryToken;

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
            icono: item.fields.icono || 'star'
        }));
    } catch (error) {
        console.error("Error obteniendo beneficios:", error);
        return [];
    }
};

export const obtenerBeneficioPorId = async (id) => {
    // 1. Detectamos el modo preview desde la URL
    const parametros = new URLSearchParams(window.location.search);
    const modoPreviewActivo = parametros.get('preview') === 'true';

    // 2. Elegimos el host y el token correcto sin repetir nombres de variables
    const baseHost = modoPreviewActivo ? 'preview.contentful.com' : 'cdn.contentful.com';
    const token = modoPreviewActivo ? previewToken : deliveryToken;

    // Dentro de obtenerBeneficioPorId
    const url = `https://${baseHost}/spaces/${spaceId}/environments/master/entries?sys.id=${id}&include=2&locale=es-PE`;

    try {
        const respuesta = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await respuesta.json();
        if (!data.items || data.items.length === 0) return null;

        const item = data.items[0];
        const assets = data.includes?.Asset || [];

        const documentosRaw = item.fields.documentosDescargables || [];
        const documentosProcesados = documentosRaw.map(docLink => {
            const archivoReal = assets.find(a => a.sys.id === docLink.sys.id);
            if (archivoReal) {
                return {
                    id: archivoReal.sys.id,
                    titulo: archivoReal.fields.title,
                    url: `https:${archivoReal.fields.file.url}`,
                    peso: (archivoReal.fields.file.details.size / 1024 / 1024).toFixed(2) + ' MB'
                };
            }
            return null;
        }).filter(Boolean);

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

        // Procesamos las Áreas Destacadas (Cajitas)
        const areasRaw = item.fields.areasDestacadas || [];
        const areasProcesadas = areasRaw.map(ref => {
            const areaEntry = data.includes?.Entry?.find(e => e.sys.id === ref.sys.id);
            if (!areaEntry) return null;

            let areaImgUrl = null;
            if (areaEntry.fields.imagen && areaEntry.fields.imagen.sys) {
                const areaImgAsset = assets.find(a => a.sys.id === areaEntry.fields.imagen.sys.id);
                if (areaImgAsset) areaImgUrl = `https:${areaImgAsset.fields.file.url}`;
            }

            return {
                id: areaEntry.sys.id,
                titulo: areaEntry.fields.titulo,
                descripcion: areaEntry.fields.descripcion,
                imagenUrl: areaImgUrl
            };
        }).filter(Boolean);

        return {
            id: item.sys.id,
            titulo: item.fields.titulo,
            descripcion: item.fields.descripcion,
            icono: item.fields.icono,
            plantilla: item.fields.plantillaVisual || 'plantilla-eps',
            contactoNombre: item.fields.nombreContactoRrhh,
            contactoCorreo: item.fields.correoContactoRrhh,
            contactoTelefono: item.fields.telefonoContactoRrhh,
            contenidoHtml: contenidoHtml,
            documentos: documentosProcesados,
            imagenUrl: imagenUrl,
            areasDestacadas: areasProcesadas
        };
    } catch (error) {
        console.error("Error obteniendo el beneficio por ID:", error);
        return null;
    }
};