<template>
  <div v-if="nJugador" class="opacity-0  w-[332px] h-[112px] absolute top-[875px] " :class="pos ? 'left-[115px]':'left-[1560px]'">
        <div class="relative inline-block">
            <img :src="`../../img/nombres/${equipo}.png`">
            <div class="absolute bottom-0 uppercase Antonio w-[332px] h-[112px] " :class="pos ? '':'flex justify-end' ">
                <div class="flex flex-col" :class="pos ? 'ml-2':'mr-2' ">
                    <div class="text-5xl font-extrabold text-white h-fit mt-2"> {{ improvisador.name }} </div>
                    <div class="text-4xl text-white h-fit" :class="pos ? '':'flex justify-end'"> {{ improvisador.apellidos }} </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        equipo: String,
        improvisador: Object,
        nJugador: Boolean,
        pos: Boolean
    }
}
</script>

<style>

</style>