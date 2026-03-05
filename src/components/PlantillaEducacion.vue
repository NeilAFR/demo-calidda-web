<script setup>
defineProps({
    datos: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
    <div class="mx-auto max-w-7xl px-4 py-8">
        <nav class="mb-6 text-sm text-slate-500 flex items-center gap-2">
            <router-link
                to="/inicio"
                class="hover:text-primary transition-colors font-medium"
            >Inicio</router-link>
            <span class="material-symbols-outlined text-sm">chevron_right</span>
            <span class="hover:text-primary transition-colors cursor-pointer">Mis Beneficios</span>
            <span class="material-symbols-outlined text-sm">chevron_right</span>
            <span class="font-bold text-slate-800">{{ datos.titulo || 'Detalle' }}</span>
        </nav>

        <div
            class="relative mb-8 overflow-hidden rounded-2xl bg-slate-900 p-8 md:p-12 text-white shadow-lg"
            :style="datos.imagenUrl ? `background-image: url(${datos.imagenUrl}); background-size: cover; background-position: center;` : ''"
        >
            <div
                class="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/40 z-10"
            ></div>

            <div class="absolute inset-0 right-0 bg-slate-800 opacity-30 z-0 flex justify-end">
                <div class="w-1/2 h-full bg-slate-700/50 skew-x-12 transform origin-bottom"></div>
            </div>

            <div class="relative z-20 max-w-2xl">
                <span
                    class="mb-3 inline-block rounded bg-primary px-3 py-1 text-xs font-bold tracking-wider uppercase"
                >Talento Cálidda</span>
                <h1
                    class="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl text-white"
                >{{ datos.titulo }}</h1>
                <p
                    class="mb-8 text-lg text-slate-300 md:text-xl leading-relaxed"
                >{{ datos.descripcion }}</p>

                <div class="flex flex-wrap gap-4">
                    <button
                        class="rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-primary/90 transition-all"
                    >Ver Catálogo de Cursos</button>
                    <button
                        class="rounded-lg bg-white/10 border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition-all backdrop-blur-sm"
                    >Mis Postulaciones</button>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div class="space-y-10 lg:col-span-2">
                <section
                    v-if="datos.contenidoHtml && datos.contenidoHtml !== '<p>No hay detalles adicionales disponibles.</p>'"
                >
                    <div class="mb-4 flex items-center justify-between">
                        <div class="flex items-center gap-2 text-primary">
                            <span class="material-symbols-outlined">school</span>
                            <h2 class="text-xl font-bold text-slate-900">Información del Programa</h2>
                        </div>
                    </div>
                    <div
                        class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm rich-text-container text-slate-700"
                        v-html="datos.contenidoHtml"
                    ></div>
                </section>

                <section v-if="datos.areasDestacadas && datos.areasDestacadas.length > 0">
                    <div class="mb-4 flex items-center justify-between">
                        <h2 class="text-lg font-bold text-slate-900">Áreas Destacadas</h2>
                    </div>

                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div
                            v-for="area in datos.areasDestacadas"
                            :key="area.id"
                            class="group relative h-48 cursor-pointer overflow-hidden rounded-xl bg-slate-800 shadow-sm"
                            :style="area.imagenUrl ? `background-image: url(${area.imagenUrl}); background-size: cover; background-position: center;` : ''"
                        >
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10 transition-opacity group-hover:opacity-90 opacity-80"
                            ></div>

                            <div
                                class="absolute inset-x-0 bottom-0 z-20 p-4 transform transition-transform group-hover:-translate-y-1"
                            >
                                <h3
                                    class="mb-1 font-bold text-white leading-tight"
                                >{{ area.titulo }}</h3>
                                <p class="text-xs text-blue-100">{{ area.descripcion }}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section v-if="datos.documentos && datos.documentos.length > 0">
                    <div class="mb-4 flex items-center gap-2 text-primary">
                        <span class="material-symbols-outlined">folder</span>
                        <h2 class="text-xl font-bold text-slate-900">Recursos y Documentación</h2>
                    </div>

                    <div
                        class="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
                    >
                        <a
                            v-for="doc in datos.documentos"
                            :key="doc.id"
                            :href="doc.url"
                            target="_blank"
                            class="flex items-center justify-between border-b border-slate-100 p-4 hover:bg-slate-50 transition-colors cursor-pointer group"
                        >
                            <div class="flex items-center gap-4">
                                <div
                                    class="flex h-10 w-10 items-center justify-center rounded bg-red-50 text-red-500 font-bold text-xs"
                                >PDF</div>
                                <div>
                                    <h4
                                        class="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors"
                                    >{{ doc.titulo }}</h4>
                                    <span
                                        class="text-xs text-slate-500"
                                    >{{ doc.peso }} • Descarga directa</span>
                                </div>
                            </div>
                            <span
                                class="material-symbols-outlined text-slate-400 group-hover:text-primary"
                            >download</span>
                        </a>
                    </div>
                </section>
            </div>

            <div class="space-y-6">
                <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div class="flex items-center gap-3 mb-6">
                        <div
                            class="h-12 w-12 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-slate-400"
                        >
                            <span class="material-symbols-outlined text-2xl">support_agent</span>
                        </div>
                        <div>
                            <p
                                class="font-bold text-slate-900 leading-tight"
                            >{{ datos.contactoNombre || 'Desarrollo Organizacional' }}</p>
                            <p class="text-xs text-slate-500">Talento & Cultura</p>
                        </div>
                    </div>

                    <div class="space-y-4 mb-6">
                        <div class="flex items-start gap-3">
                            <span class="material-symbols-outlined text-primary text-xl">schedule</span>
                            <div>
                                <p class="text-sm font-bold text-slate-900">Horarios de Atención</p>
                                <p class="text-xs text-slate-600">Lun - Vie: 08:30 - 17:30</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <span class="material-symbols-outlined text-primary text-xl">call</span>
                            <div>
                                <p class="text-sm font-bold text-slate-900">Teléfono / Anexo</p>
                                <p
                                    class="text-xs text-slate-600"
                                >{{ datos.contactoTelefono || 'Anexo 4521' }}</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <span class="material-symbols-outlined text-primary text-xl">mail</span>
                            <div>
                                <p class="text-sm font-bold text-slate-900">Correo</p>
                                <p
                                    class="text-xs text-slate-600 break-all"
                                >{{ datos.contactoCorreo || 'capacitacion@calidda.com.pe' }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <button
                            class="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors"
                        >
                            <span class="material-symbols-outlined text-base">how_to_reg</span> Inscríbete a un Curso
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
/* Los mismos estilos globales para el Rich Text de Contentful */
.rich-text-container p {
    margin-bottom: 1rem;
}
.rich-text-container h1,
.rich-text-container h2,
.rich-text-container h3 {
    font-weight: bold;
    color: #0f172a;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
}
.rich-text-container h2 {
    font-size: 1.25rem;
}
.rich-text-container ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin-bottom: 1rem;
}
.rich-text-container ol {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin-bottom: 1rem;
}
.rich-text-container a {
    color: #1173d4;
    text-decoration: underline;
}
</style>