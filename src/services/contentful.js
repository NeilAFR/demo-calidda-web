// Leemos las variables que pusiste en el .env
const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

export const obtenerBeneficios = async () => {
    // Asegúrate de que 'beneficioCorporativo' sea exactamente el ID del modelo que creaste
    const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?content_type=beneficioCorporativo`;

    try {
        const respuesta = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (!respuesta.ok) throw new Error("Error en la conexión con el CMS");

        const datos = await respuesta.json();

        // Contentful devuelve un montón de meta-datos. Nosotros solo mapeamos lo que nos sirve
        // para que a nuestras tarjetas les llegue la información limpia.
        return datos.items.map(item => ({
            id: item.sys.id,
            titulo: item.fields.titulo,
            descripcion: item.fields.descripcion,
            // Si pusiste un campo de ícono en texto, lo jalamos. Si no, le ponemos uno por defecto
            icono: item.fields.icono || 'star'
        }));

    } catch (error) {
        console.error("Hubo un problema trayendo los datos de Marketing:", error);
        return []; // Retornamos un arreglo vacío para que la web no se rompa
    }
};