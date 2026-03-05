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
            <span class="hover:text-primary transition-colors cursor-pointer">Beneficios</span>
            <span class="material-symbols-outlined text-sm">chevron_right</span>
            <span class="font-bold text-slate-800">Maternidad y Paternidad</span>
        </nav>

        <div
            class="relative mb-8 overflow-hidden rounded-2xl p-8 md:p-16 text-white shadow-lg bg-slate-400"
            :style="datos.imagenUrl ? `background-image: url(${datos.imagenUrl}); background-size: cover; background-position: center;` : ''"
        >
            <div
                class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-800/50 to-transparent z-10"
            ></div>

            <div class="relative z-20 max-w-2xl mt-12 md:mt-24">
                <span
                    class="mb-3 inline-block text-xs font-bold tracking-widest uppercase text-white/80"
                >BENEFICIOS > MATERNIDAD Y PATERNIDAD</span>
                <h1
                    class="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl"
                >{{ datos.titulo || 'Bienvenida a la Familia Cálidda' }}</h1>
                <p
                    class="text-lg text-slate-200 md:text-xl leading-relaxed"
                >{{ datos.descripcion || 'Acompañamos a nuestros colaboradores en esta etapa tan especial con beneficios diseñados para el bienestar de su familia.' }}</p>
            </div>
        </div>

        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div class="space-y-10 lg:col-span-2">
                <section>
                    <div class="mb-5 flex items-center gap-2 text-primary">
                        <span class="material-symbols-outlined text-2xl">calendar_month</span>
                        <h2 class="text-xl font-bold text-slate-900">Licencias y Permisos</h2>
                    </div>

                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 class="mb-2 font-bold text-slate-900">Licencia Extendida</h3>
                            <p
                                class="mb-4 text-sm text-slate-600 leading-relaxed"
                            >Gozarás de días adicionales de descanso remunerado sumados a los legales para disfrutar tus primeros momentos en familia.</p>
                            <ul class="space-y-2 text-sm text-slate-700">
                                <li class="flex items-center gap-2">
                                    <span
                                        class="material-symbols-outlined text-primary text-sm"
                                    >check_circle</span> 15 días adicionales para mamás
                                </li>
                                <li class="flex items-center gap-2">
                                    <span
                                        class="material-symbols-outlined text-primary text-sm"
                                    >check_circle</span> 5 días adicionales para papás
                                </li>
                            </ul>
                        </div>
                        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 class="mb-2 font-bold text-slate-900">Horarios Flexibles</h3>
                            <p
                                class="mb-4 text-sm text-slate-600 leading-relaxed"
                            >Facilitamos el equilibrio entre tu carrera y tu nuevo rol con esquemas de retorno progresivo.</p>
                            <ul class="space-y-2 text-sm text-slate-700">
                                <li class="flex items-center gap-2">
                                    <span
                                        class="material-symbols-outlined text-primary text-sm"
                                    >check_circle</span> Home office parcial
                                </li>
                                <li class="flex items-center gap-2">
                                    <span
                                        class="material-symbols-outlined text-primary text-sm"
                                    >check_circle</span> Jornada reducida primer mes
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <div class="mb-5 flex items-center gap-2 text-primary">
                        <span class="material-symbols-outlined text-2xl">redeem</span>
                        <h2 class="text-xl font-bold text-slate-900">Subsidios y Kits</h2>
                    </div>

                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div
                            class="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                        >
                            <div
                                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary"
                            >
                                <span class="material-symbols-outlined">child_care</span>
                            </div>
                            <div>
                                <h3 class="mb-1 font-bold text-slate-900">Kit de Bienvenida Bebé</h3>
                                <p
                                    class="text-xs text-slate-600 leading-relaxed"
                                >Set de esenciales para el cuidado del recién nacido y obsequio especial para los padres.</p>
                            </div>
                        </div>
                        <div
                            class="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                        >
                            <div
                                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary"
                            >
                                <span class="material-symbols-outlined">school</span>
                            </div>
                            <div>
                                <h3 class="mb-1 font-bold text-slate-900">Kits Escolares</h3>
                                <p
                                    class="text-xs text-slate-600 leading-relaxed"
                                >Apoyo anual con útiles escolares para hijos de colaboradores en etapa educativa.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div class="mb-5 flex items-center gap-2 text-primary">
                        <span class="material-symbols-outlined text-2xl">psychology</span>
                        <h2 class="text-xl font-bold text-slate-900">Asesoría y Apoyo</h2>
                    </div>
                    <div
                        class="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center justify-between"
                    >
                        <div class="flex-1">
                            <h3 class="mb-2 font-bold text-slate-900">Programa de Acompañamiento</h3>
                            <p
                                class="text-sm text-slate-600 leading-relaxed mb-4"
                            >Ofrecemos sesiones gratuitas de asesoría psicológica y financiera para ayudarte a planificar esta nueva etapa con tranquilidad y seguridad.</p>
                            <div class="flex flex-wrap gap-2">
                                <span
                                    class="bg-white border border-slate-200 text-slate-600 text-xs px-3 py-1 rounded-full font-medium shadow-sm"
                                >Psicología</span>
                                <span
                                    class="bg-white border border-slate-200 text-slate-600 text-xs px-3 py-1 rounded-full font-medium shadow-sm"
                                >Nutrición Infantil</span>
                                <span
                                    class="bg-white border border-slate-200 text-slate-600 text-xs px-3 py-1 rounded-full font-medium shadow-sm"
                                >Finanzas Familiares</span>
                            </div>
                        </div>
                        <button
                            class="shrink-0 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white shadow hover:bg-primary/90 transition-all"
                        >Solicitar Sesión</button>
                    </div>
                </section>

                <section v-if="datos.documentos && datos.documentos.length > 0">
                    <div class="mb-4 flex items-center gap-2 text-primary">
                        <span class="material-symbols-outlined">description</span>
                        <h2 class="text-xl font-bold text-slate-900">Documentación y Formatos</h2>
                    </div>
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <a
                            v-for="doc in datos.documentos"
                            :key="doc.id"
                            :href="doc.url"
                            target="_blank"
                            class="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-primary/50 cursor-pointer group"
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
                <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-center">
                    <div class="relative inline-block mb-4">
                        <div
                            class="h-20 w-20 rounded-full bg-slate-200 overflow-hidden border-4 border-white shadow-md mx-auto flex items-center justify-center"
                        >
                            <span class="material-symbols-outlined text-4xl text-slate-400">face</span>
                        </div>
                        <div
                            class="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-500 border-2 border-white"
                        ></div>
                    </div>

                    <h3
                        class="font-bold text-slate-900 text-lg"
                    >{{ datos.contactoNombre || 'Mariana Torres' }}</h3>
                    <p class="text-xs font-medium text-primary mb-6">Asistenta de Bienestar Social</p>

                    <div class="space-y-3 mb-6">
                        <div
                            class="flex items-center justify-center gap-2 bg-slate-50 rounded-lg py-2 px-3 text-sm text-slate-600 border border-slate-100"
                        >
                            <span class="material-symbols-outlined text-lg">mail</span>
                            <span
                                class="truncate"
                            >{{ datos.contactoCorreo || 'mtorres@calidda.com.pe' }}</span>
                        </div>
                        <div
                            class="flex items-center justify-center gap-2 bg-slate-50 rounded-lg py-2 px-3 text-sm text-slate-600 border border-slate-100"
                        >
                            <span class="material-symbols-outlined text-lg">call</span>
                            <span>{{ datos.contactoTelefono || '+51 (1) 614-9000' }}</span>
                        </div>
                    </div>

                    <button
                        class="flex w-full items-center justify-center gap-2 rounded-lg bg-[#006bd6] py-3 text-sm font-bold text-white hover:bg-blue-700 transition-colors shadow"
                    >
                        <span class="material-symbols-outlined text-base">calendar_month</span> Fijar cita de asesoría
                    </button>
                </div>

                <div class="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <div class="mb-3 flex items-center gap-2 text-primary">
                        <span class="material-symbols-outlined">info</span>
                        <h2 class="text-sm font-bold text-slate-900">¿Sabías que?</h2>
                    </div>
                    <p
                        class="text-xs leading-relaxed text-slate-600 italic"
                    >Cálidda cuenta con salas de lactancia equipadas en todas nuestras sedes principales para tu comodidad y la de tu bebé.</p>
                </div>
            </div>
        </div>
    </div>
</template>