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