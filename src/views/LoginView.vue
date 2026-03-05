<script setup>
import { ref } from 'vue';
import { login } from '../services/authAzure';
import { useRouter } from 'vue-router';

const router = useRouter();
const procesando = ref(false);

const handleLogin = async () => {
  if (procesando.value) return; // Si ya está cargando, no hace nada
  
  procesando.value = true;
  try {
    const account = await login();
    if (account) {
      router.push('/inicio');
    }
  } finally {
    procesando.value = false;
  }
};
</script>

<template>
  <button 
    @click.prevent="handleLogin"
    :disabled="procesando"
    class="flex w-full items-center justify-center gap-3 rounded-lg bg-[#2F2F2F] px-6 py-4 text-white hover:bg-black transition-all disabled:opacity-50"
  >
    <span v-if="procesando">Conectando con Microsoft...</span>
    <template v-else>
      <img src="https://authjs.dev/img/providers/microsoft.svg" class="h-5 w-5" alt="Microsoft" />
      <span class="font-bold">Iniciar sesión con Outlook</span>
    </template>
  </button>
</template>