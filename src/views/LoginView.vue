<script setup>
import { ref } from 'vue';
import { login } from '../services/authAzure';

const procesando = ref(false);

const handleLogin = async () => {
  if (procesando.value) return;
  procesando.value = true;
  await login(); // Esto saca al usuario de tu web hacia Microsoft
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-[#f6f7f8] px-4">
    <div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center border border-slate-200">
      <div class="mb-6 flex justify-center">
        <div class="flex items-center gap-2">
            <div class="h-8 w-8 bg-[#1173d4] rounded flex items-center justify-center">
                <span class="text-white font-bold text-sm">C</span>
            </div>
            <span class="text-3xl font-black text-[#1173d4]">Cálidda</span>
        </div>
      </div>
      <h1 class="mb-2 text-2xl font-bold text-slate-900">Portal de Beneficios</h1>
      <p class="mb-8 text-slate-600">Inicia sesión con tu cuenta corporativa para continuar.</p>
      
      <button 
        @click.prevent="handleLogin"
        :disabled="procesando"
        class="flex w-full items-center justify-center gap-3 rounded-lg bg-[#2F2F2F] px-6 py-4 text-white hover:bg-black transition-all disabled:opacity-50"
      >
        <span v-if="procesando">Redirigiendo a Microsoft...</span>
        <template v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21"><path fill="#f25022" d="M1 1h9v9H1z"/><path fill="#00a4ef" d="M1 11h9v9H1z"/><path fill="#7fba00" d="M11 1h9v9h-9z"/><path fill="#ffb900" d="M11 11h9v9h-9z"/></svg>
          <span class="font-bold">Iniciar sesión con Outlook</span>
        </template>
      </button>
    </div>
  </div>
</template>