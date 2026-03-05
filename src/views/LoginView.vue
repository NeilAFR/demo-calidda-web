<script setup>
import { login } from '../services/authAzure';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogin = async () => {
  const account = await login();
  if (account) {
    // Si el login es exitoso, lo mandamos al Inicio
    router.push('/inicio');
  }
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-background-light px-4">
    <div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">
      <div class="mb-6 flex justify-center">
        <span class="text-3xl font-black text-primary">Cálidda</span>
      </div>
      <h1 class="mb-2 text-2xl font-bold text-slate-900">Portal de Beneficios</h1>
      <p class="mb-8 text-slate-600">Inicia sesión con tu cuenta corporativa para continuar.</p>
      
      <button 
        @click="handleLogin"
        class="flex w-full items-center justify-center gap-3 rounded-lg bg-[#2F2F2F] px-6 py-4 text-white hover:bg-black transition-all"
      >
        <img src="https://authjs.dev/img/providers/microsoft.svg" class="h-5 w-5" alt="Microsoft" />
        <span class="font-bold">Iniciar sesión con Outlook</span>
      </button>
    </div>
  </div>
</template>