<script setup>
import { ref, onMounted } from 'vue';
import { getActiveAccount, logout } from '../services/authAzure.js';

const usuario = ref(null);
const menuAbierto = ref(false); // Controla el dropdown

onMounted(() => {
  usuario.value = getActiveAccount();
});

const cerrarSesion = async () => {
  await logout();
};
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <div class="flex items-center gap-3">
        <router-link :to="{ path: '/inicio', query: $route.query }" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <img src="/logo-calidda.png" alt="Cálidda Logo" class="h-8 object-contain"/>
      </router-link>
      </div>

      <div class="flex items-center gap-5">
        
        <div v-if="usuario" class="relative">
          
          <button @click="menuAbierto = !menuAbierto" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div class="hidden md:flex flex-col text-right">
              <span class="text-sm font-bold text-slate-800 leading-none">{{ usuario.name }}</span>
              <span class="text-xs text-slate-500 mt-1">Colaborador</span>
            </div>
            
            <div class="h-10 w-10 overflow-hidden rounded-full border-2 border-primary/20 bg-primary/10 flex items-center justify-center">
               <span class="material-symbols-outlined text-primary">person</span>
            </div>
          </button>

          <div v-if="menuAbierto" class="absolute right-0 mt-3 w-48 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-slate-100 py-1">
            <div class="px-4 py-3 border-b border-slate-100 md:hidden">
              <p class="text-sm font-bold text-slate-800">{{ usuario.name }}</p>
              <p class="text-xs text-slate-500">Colaborador</p>
            </div>
            <button @click="cerrarSesion" class="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-slate-50">
              <span class="material-symbols-outlined text-lg">logout</span>
              Cerrar Sesión
            </button>
          </div>
          
        </div>
      </div>
    </div>
  </header>
</template>