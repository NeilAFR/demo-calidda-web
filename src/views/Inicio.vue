<script setup>
import { ref, onMounted } from 'vue';
import BenefitCard from '../components/BenefitCard.vue';
import { obtenerBeneficios } from '../services/contentful.js';
import { ContentfulLivePreview } from '@contentful/live-preview';
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
<div v-if="modoPreview" class="bg-yellow-500 text-black text-center py-2 font-bold">
    ESTÁS EN MODO VISTA PREVIA: Viendo borradores de Marketing
    <button @click="alternarModo" class="ml-4 underline">Volver a web oficial</button>
  </div>
  
  <button 
    @click="alternarModo"
    class="fixed bottom-5 right-5 z-50 bg-black text-white p-4 rounded-full shadow-2xl"
  >
    {{ modoPreview ? 'Ver Web Real' : 'Probar Cambios de Marketing' }}
  </button>
  <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
    <header class="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div class="flex items-center gap-3">
          <span class="text-2xl font-black tracking-tight text-primary">Cálidda</span>
        </div>
        <nav class="hidden md:flex items-center gap-8">
          <a class="text-sm font-semibold text-primary" href="#">Inicio</a>
          <a class="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#">Salud</a>
          <a class="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#">Equilibrio</a>
          <a class="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#">Reconocimiento</a>
        </nav>
        <div class="flex items-center gap-4">
          <button class="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <span class="material-symbols-outlined">search</span>
          </button>
          <div class="h-10 w-10 overflow-hidden rounded-full border-2 border-primary/20 bg-primary/10 flex items-center justify-center">
             <span class="material-symbols-outlined text-primary">person</span>
             <span class="text-sm font-bold text-slate-700">{{ usuario?.name }}</span>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <section class="mx-auto max-w-7xl px-4 py-6">
        <div class="relative h-[480px] w-full overflow-hidden rounded-xl bg-slate-900 shadow-2xl">
          <div class="absolute inset-0 bg-blue-900">
             <div class="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent"></div>
          </div>
          <div class="relative flex h-full flex-col items-start justify-center px-8 md:px-16 max-w-2xl">
            <h1 class="mb-4 text-4xl font-extrabold leading-tight text-white md:text-6xl tracking-tight">
              Tu bienestar <br/><span class="text-blue-200">nos importa</span>
            </h1>
            <p class="mb-8 text-lg font-medium text-slate-100/90 md:text-xl">
              Descubre todos los beneficios que tenemos para ti y tu familia. Diseñados para potenciar tu vida.
            </p>
            <div class="flex flex-wrap gap-4">
              <button class="rounded-lg bg-primary px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-primary/90 transition-all">
                Ver Beneficios
              </button>
            </div>
          </div>
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
            :icon="item.icono"
            :title="item.titulo"
            :description="item.descripcion"
          />
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 pb-16">
        <div class="flex flex-col items-center gap-8 rounded-2xl bg-primary px-8 py-12 md:flex-row md:justify-between">
          <div class="flex flex-col gap-3 text-center md:text-left">
            <h2 class="text-3xl font-extrabold text-white">Manual de Beneficios 2024</h2>
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