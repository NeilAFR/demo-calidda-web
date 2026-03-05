<script setup>
import { ref, onMounted } from 'vue';
import BenefitCard from '../components/BenefitCard.vue';
import { obtenerBeneficios } from '../services/contentful.js';
import { ContentfulLivePreview } from '@contentful/live-preview';
import NavBar from '../components/NavBar.vue';
import { getActiveAccount } from '../services/authAzure';

const usuario = ref(null);
// 1. Definición de variables de estado
const beneficios = ref([]);
const cargando = ref(true);
const modoPreview = ref(false); // Esta faltaba definirla

// 2. Función maestra para cargar datos
const cargarDatos = async (preview = false) => {
  cargando.value = true; // Mostramos el mensaje de carga
  try {
    beneficios.value = await obtenerBeneficios(preview);
  } catch (error) {
    console.error("Error cargando beneficios:", error);
  } finally {
    cargando.value = false; // ¡Aquí está el truco! Apagamos el mensaje siempre al terminar
  }
};

// 3. Función para el botón de Marketing
const alternarModo = () => {
  modoPreview.value = !modoPreview.value;
  cargarDatos(modoPreview.value);
};

// 4. Un solo ciclo de vida onMounted
onMounted(async () => {
  usuario.value = await getActiveAccount();
  // Inicializamos Live Preview de Contentful
  ContentfulLivePreview.init({ locale: 'en-US' });
  
  // Ejecutamos la carga inicial (web oficial)
  cargarDatos(false);
  
});
</script>

<template>
  <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
    <NavBar />

    <main class="flex-1">
      <section class="mx-auto max-w-7xl px-4 py-6">
        <div 
          class="relative mb-12 overflow-hidden rounded-2xl p-8 md:p-12 text-white shadow-lg bg-[#1173d4]"
          style="background-image: url('/fondo-inicio.jpg'); background-size: cover; background-position: center;"
        >
          <div class="absolute inset-0 bg-[#1173d4]/80 mix-blend-multiply z-0"></div>
          
          <div class="relative z-10 max-w-2xl">
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
              Tu bienestar nos importa
            </h1>
            <p class="mb-8 text-lg text-blue-100/90 md:text-xl leading-relaxed">
              Descubre todos los beneficios que tenemos para ti y tu familia. 
              Diseñados para potenciar tu vida dentro y fuera de Cálidda.
            </p>
            <button class="rounded-lg bg-white px-6 py-3 text-sm font-bold text-primary shadow hover:bg-slate-50 transition-colors">
              Explorar Beneficios
            </button>
          </div>
          
          <div class="absolute -right-20 top-0 bottom-0 z-0 hidden w-1/2 opacity-20 md:block bg-gradient-to-l from-white to-transparent transform skew-x-12"></div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 py-16">
        <div class="mb-12 flex items-end justify-between">
          <div>
            <h2 class="text-3xl font-bold tracking-tight text-slate-900">Nuestros Beneficios</h2>
            <div class="mt-2 h-1.5 w-20 rounded-full bg-primary"></div>
          </div>
          <p class="hidden text-sm font-semibold text-primary underline md:block cursor-pointer">Ver todas las categorías</p>
        </div>
        
        <p v-if="cargando" class="text-center py-10">Cargando beneficios...</p>

        <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <BenefitCard 
            v-for="item in beneficios" 
            :key="item.id"
            :id="item.id"           :icon="item.icono"
            :title="item.titulo"
            :description="item.descripcion"
          />
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 pb-16">
        <div class="flex flex-col items-center gap-8 rounded-2xl bg-primary px-8 py-12 md:flex-row md:justify-between">
          <div class="flex flex-col gap-3 text-center md:text-left">
            <h2 class="text-3xl font-extrabold text-white">Manual de Beneficios 2026</h2>
            <p class="text-lg text-blue-100 max-w-xl">
              Conoce todos los detalles, políticas y condiciones de tus beneficios en un solo documento descargable.
            </p>
          </div>
          <button class="flex min-w-[200px] items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-bold text-primary shadow-xl hover:bg-slate-50 transition-all">
            <span class="material-symbols-outlined">download</span> Descargar Manual
          </button>
        </div>
      </section>
    </main>
  </div>
</template>