<template>
    <div v-if="texto" class="w-[1066px] h-[190px] absolute top-[784px] left-[427px] Anton target opacity-0" id="texto">
        <div class="flex flex-col w-[892px] h-full relative left-[174px] uppercase text-white">
            <div class="flex h-[65px] w-full text-4xl items-center">
                <div class="flex w-[200px] items-center">
                    <div class="border-2 border-white p-2">
                        <p> {{ "#"+ impro.id }} </p>
                    </div>
                    <div class="ml-8">
                        <p> {{ impro.tipo }} </p>
                    </div>
                </div>
                <div class="flex w-full p-2 ml-5">
                    <div class="flex items-center mr-5">
                        <i class="fa-regular fa-clock mr-4"></i>
                        <p v-if="impro.duracion == 0"> INDEF </p>
                        <p v-else> {{ impro.duracion }} </p>
                    </div>
                    <div class="flex  items-center mr-5">
                        <i class="fa-solid fa-users mr-4"></i>
                        <p> {{ impro.jugadores }} </p>
                    </div>
                    <div class="flex items-center">
                        <i class='bx bx-book-open mr-4'></i>
                        <p> {{ impro.categoria }} </p>
                    </div>
                </div>
            </div>
            <div class="h-[125px]w-full p-2" :class="impro.titulo.length < 10 ? 'text-8xl':'text-5xl'">
                {{ impro.titulo }}
            </div>
        </div>
    </div>
</template>

<script>

export default {
  props: {
    impro: Object,
    texto: Boolean
  }
}
</script>

<style>

</style>