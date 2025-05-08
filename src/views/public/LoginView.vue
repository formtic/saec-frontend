<template>
    <div class="grid grid-cols-1 md:grid-cols-2" style="height: 100dvh;">

      <section class=" flex flex-col items-center px-6 py-6 justify-center">
        <div class="flex flex-col items-center gap-5 mb-6">
          <img :src="logo" class="w-52 h-20" />
          <h1 class="text-3xl font-semibold text-gray-700">Inicio de sesión</h1>
        </div>
  
        <form class="w-full max-w-sm space-y-4 mt-8">
          <div class="flex flex-col">
            <label for="iptCode" class="mb-1 text-sm font-medium text-gray-700 text-left">
              Código de acceso:
            </label>
            <input
              id="iptCode"
              type="text"
              placeholder="Clave de usuario"
              class="rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div class="flex flex-col mt-6">
            <label for="iptPass" class="mb-1 text-sm font-medium text-gray-700 text-left">
              Contraseña:
            </label>
            <input
              id="iptPass"
              type="password"
              placeholder="Contraseña"
              class="rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div class="flex flex-col mt-10">
            <button type="submit" class="bg-sky-800 rounded-sm text-white p-2" @click="login">Iniciar Sesión</button>
            <br/>
            <button type="button" class="text-blue-500">Olvide mi contraseña</button>
          </div>
        </form>
      </section>
  
      <section class="hidden md:flex items-center justify-center">
        <img src="../../assets/svg/docs.png" alt="grupo de cirujanos" class="object-cover w-full h-full" />
      </section>
    </div>
  </template>
  
  <script>
  import logo from "@/assets/svg/logo.svg";
  
  export default {
    setup() {
      return {
        logo,
      };
    },
    methods:{
        login(){
            alert("Iniciando sesión...");
        }
    }
  };
  </script>  