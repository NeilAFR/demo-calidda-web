<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from '../components/NavBar.vue';

// Importamos AMBAS plantillas
import PlantillaEPS from '../components/PlantillaEPS.vue';
import PlantillaEducacion from '../components/PlantillaEducacion.vue';
import PlantillaMaternidad from '../components/PlantillaMaternidad.vue';
// Importamos la nueva función del servicio
import { obtenerBeneficioPorId } from '../services/contentful.js';

const route = useRoute();
const idBeneficio = route.params.id;

// Variables de estado
const beneficio = ref(null);
const cargando = ref(true);

// 1. Al cargar la vista, vamos a Contentful a buscar los datos
onMounted(async () => {
  beneficio.value = await obtenerBeneficioPorId(idBeneficio);
  cargando.value = false;
});

// 2. Calculamos qué diseño usar basados en lo que eligió Marketing
const componenteElegido = computed(() => {
  if (!beneficio.value) return null;
  
  if (beneficio.value.plantilla === 'plantilla-educacion') {
    return PlantillaEducacion;
  }
  if (beneficio.value.plantilla === 'plantilla-maternidad') {
    return PlantillaMaternidad;
  }
  
  return PlantillaEPS; // Plantilla por defecto si es "plantilla-eps" o viene vacío
});
</script>

<template>
  <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f7f8]">
    <NavBar />

    <main class="flex-1">
      
      <div v-if="cargando" class="flex h-64 items-center justify-center">
        <p class="text-slate-500 font-medium">Cargando detalles del beneficio...</p>
      </div>
      
      <div v-else-if="!beneficio" class="flex h-64 flex-col items-center justify-center gap-4">
        <span class="material-symbols-outlined text-4xl text-slate-300">sentiment_dissatisfied</span>
        <p class="text-slate-500 font-medium">No se encontró el beneficio solicitado.</p>
      </div>

      <component 
        v-else 
        :is="componenteElegido" 
        :datos="beneficio" 
      />
      
    </main>
  </div>
</template>