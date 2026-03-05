<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from '../components/NavBar.vue';

// Importamos las plantillas
import PlantillaEPS from '../components/PlantillaEPS.vue';
import PlantillaEducacion from '../components/PlantillaEducacion.vue';
import PlantillaMaternidad from '../components/PlantillaMaternidad.vue';

// Importamos el servicio
import { obtenerBeneficioPorId } from '../services/contentful.js';

const route = useRoute();

// Variables de estado
const beneficio = ref(null);
const cargando = ref(true);

/**
 * Función centralizada para cargar datos.
 * Ahora usa directamente route.params.id para asegurar que siempre
 * pida el ID que está en la barra de direcciones.
 */
const cargarDatosBeneficio = async () => {
  cargando.value = true;
  const id = route.params.id;
  if (id) {
    beneficio.value = await obtenerBeneficioPorId(id);
  }
  cargando.value = false;
};

// 1. Carga inicial cuando el componente aparece
onMounted(async () => {
  await cargarDatosBeneficio();

  // Suscribirse a cambios en tiempo real de Contentful
  ContentfulLivePreview.subscribe({
    action: "ENTRY_UPDATED",
    callback: (updatedEntry) => {
      // Cuando Marketing cambie un texto, volvemos a cargar para refrescar la UI
      cargarDatosBeneficio();
    },
  });
});

// 3. Selección dinámica de plantilla
const componenteElegido = computed(() => {
  if (!beneficio.value) return null;
  
  const plantillas = {
    'plantilla-educacion': PlantillaEducacion,
    'plantilla-maternidad': PlantillaMaternidad,
    'plantilla-eps': PlantillaEPS
  };

  return plantillas[beneficio.value.plantilla] || PlantillaEPS;
});
</script>

<template>
  <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f7f8]">
    <NavBar />

    <main class="flex-1">
      <div v-if="cargando" class="flex h-64 items-center justify-center">
        <div class="flex flex-col items-center gap-3">
          <div class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p class="text-slate-500 font-medium text-sm italic">Sincronizando con Contentful...</p>
        </div>
      </div>
      
      <div v-else-if="!beneficio" class="flex h-64 flex-col items-center justify-center gap-4 text-center px-4">
        <span class="material-symbols-outlined text-5xl text-slate-300">find_in_page</span>
        <div>
          <p class="text-slate-800 font-bold">Beneficio no disponible</p>
          <p class="text-slate-500 text-sm">El contenido que buscas no existe o aún no ha sido publicado.</p>
        </div>
        <router-link to="/inicio" class="text-primary font-bold text-sm underline">Volver al inicio</router-link>
      </div>

      <component 
        v-else 
        :is="componenteElegido" 
        :datos="beneficio" 
      />
      
    </main>
  </div>
</template>