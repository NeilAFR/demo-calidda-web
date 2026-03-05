<script setup>
// Aquí recibiremos los datos reales desde la vista más adelante
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
            class="relative mb-8 overflow-hidden rounded-2xl p-8 md:p-12 text-white shadow-lg bg-[#1173d4]"
            :style="datos.imagenUrl ? `background-image: url(${datos.imagenUrl}); background-size: cover; background-position: center;` : ''"
        >
            <div
                v-if="datos.imagenUrl"
                class="absolute inset-0 bg-[#1173d4]/70 mix-blend-multiply z-0"
            ></div>

            <div class="relative z-10 max-w-2xl">
                <span
                    class="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold tracking-wider uppercase backdrop-blur-sm"
                >Salud & Bienestar</span>
                <h1
                    class="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl"
                >{{ datos.titulo }}</h1>
                <p
                    class="text-lg text-blue-100/90 md:text-xl leading-relaxed"
                >{{ datos.descripcion }}</p>
            </div>
            <div
                v-if="!datos.imagenUrl"
                class="absolute -right-20 top-0 bottom-0 z-0 hidden w-1/2 opacity-20 md:block bg-gradient-to-l from-white to-transparent transform skew-x-12"
            ></div>
        </div>

        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div class="space-y-8 lg:col-span-2">
                <section>
                    <div class="mb-4 flex items-center gap-2 text-primary">
                        <span class="material-symbols-outlined">info</span>
                        <h2 class="text-xl font-bold text-slate-900">Alcance del Beneficio</h2>
                    </div>

                    <div
                        class="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm rich-text-container text-slate-700"
                        v-html="datos.contenidoHtml"
                    ></div>

                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div
                            class="flex gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                        >
                            <div
                                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary"
                            >
                                <span class="material-symbols-outlined">group</span>
                            </div>
                            <div>
                                <h3 class="mb-1 font-bold text-slate-900">¿Quiénes aplican?</h3>
                                <p
                                    class="text-sm text-slate-600"
                                >Todos los colaboradores con contrato indefinido y sus derechohabientes directos (Cónyuge e hijos).</p>
                            </div>
                        </div>

                        <div
                            class="flex gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                        >
                            <div
                                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary"
                            >
                                <span class="material-symbols-outlined">health_and_safety</span>
                            </div>
                            <div>
                                <h3 class="mb-1 font-bold text-slate-900">Cobertura</h3>
                                <p
                                    class="text-sm text-slate-600"
                                >Atención ambulatoria, hospitalaria, emergencias y maternidad al 100% en red preferencial.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section v-if="datos.documentos && datos.documentos.length > 0">
                    <div class="mb-4 flex items-center gap-2 text-primary">
                        <span class="material-symbols-outlined">description</span>
                        <h2 class="text-xl font-bold text-slate-900">Documentos y Pólizas</h2>
                    </div>

                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <a
                            v-for="doc in datos.documentos"
                            :key="doc.id"
                            :href="doc.url"
                            target="_blank"
                            class="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-hover hover:border-primary/50 cursor-pointer group"
                        >
                            <div class="flex items-center gap-3">
                                <div
                                    class="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500"
                                >
                                    <span class="material-symbols-outlined">picture_as_pdf</span>
                                </div>
                                <div>
                                    <h4 class="text-sm font-bold text-slate-900">{{ doc.titulo }}</h4>
                                    <span class="text-xs text-slate-500">PDF • {{ doc.peso }}</span>
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
                    <div class="mb-6 flex items-center gap-2 text-primary">
                        <span class="material-symbols-outlined">help</span>
                        <h2 class="text-lg font-bold text-slate-900">Soporte y Contacto</h2>
                    </div>

                    <div class="space-y-5">
                        <div>
                            <span
                                class="text-xs font-bold tracking-wider text-primary uppercase"
                            >Ejecutiva de Cuenta</span>
                            <p
                                class="font-bold text-slate-900"
                            >{{ datos.contactoNombre || 'Contacto RRHH' }}</p>
                            <div class="mt-2 space-y-2 text-sm text-slate-600">
                                <p class="flex items-center gap-2">
                                    <span class="material-symbols-outlined text-base">mail</span>
                                    {{ datos.contactoCorreo || 'rrhh@calidda.com.pe' }}
                                </p>
                                <p class="flex items-center gap-2">
                                    <span class="material-symbols-outlined text-base">phone</span>
                                    {{ datos.contactoTelefono || '999 888 777' }}
                                </p>
                            </div>
                        </div>

                        <hr class="border-slate-100" />

                        <div class="space-y-3">
                            <div class="flex items-start gap-3">
                                <span class="material-symbols-outlined text-slate-400">schedule</span>
                                <div>
                                    <span
                                        class="text-xs font-bold tracking-wider text-slate-500 uppercase"
                                    >Horario Presencial</span>
                                    <p
                                        class="text-sm font-bold text-slate-900 mt-1"
                                    >Lunes y Miércoles</p>
                                    <p class="text-xs text-slate-600">09:00 AM - 05:00 PM</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3">
                                <span class="material-symbols-outlined text-slate-400">location_on</span>
                                <div>
                                    <span
                                        class="text-xs font-bold tracking-wider text-slate-500 uppercase"
                                    >Ubicación</span>
                                    <p
                                        class="text-sm font-bold text-slate-900 mt-1"
                                    >Sede Principal, Piso 4</p>
                                    <p class="text-xs text-slate-600">Oficina de Bienestar</p>
                                </div>
                            </div>
                        </div>

                        <button
                            class="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors"
                        >
                            <span class="material-symbols-outlined text-base">calendar_month</span> Agendar Cita Médica
                        </button>
                    </div>
                </div>

                <div class="rounded-2xl border border-[#cce0f5] bg-[#f0f7ff] p-6">
                    <div class="mb-3 flex items-center gap-2 text-primary">
                        <span class="material-symbols-outlined">star</span>
                        <h2 class="text-sm font-bold">Beneficio Destacado</h2>
                    </div>
                    <h3 class="mb-2 font-bold text-slate-900">Seguro Oncológico Nacional</h3>
                    <p
                        class="mb-4 text-xs leading-relaxed text-slate-600"
                    >Cobertura total en tratamientos complejos y preventivos en las mejores redes oncológicas.</p>
                    <a
                        href="#"
                        class="inline-flex items-center gap-1 text-sm font-bold text-primary hover:gap-2 transition-all"
                    >
                        Ver más información
                        <span
                            class="material-symbols-outlined text-sm"
                        >arrow_forward</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
/* Estilos para que el Rich Text de Contentful se vea bien con Tailwind */
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