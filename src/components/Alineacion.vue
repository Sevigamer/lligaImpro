<template>
    <div>
        <div v-if="alIzq" class="flex absolute top-[666px] justify-center opacity-0" :class="alineacionIzq.length>5 ? 'left-[390px]':'left-[485px]'" id="clasiIzq">
            <div v-for="player in alineacionIzq" class="relative inline-block">
            <img :src="'../../img/alineacion/'+equipoIzq.data.fondo+'/'+player.name+'.png'">
            <div class="absolute bottom-6 left-3 flex flex-col uppercase w-[166px] h-[76px] justify-center text-white Anton">
                <div class="text-center w-full text-3xl"> {{ player.name }} </div>
                <div class="text-center w-full text-2xl"> {{ player.apellidos }} </div>
            </div>
            </div>
        </div>
        <div v-if="alDer" class="flex absolute top-[666px] justify-center opacity-0" :class="alineacionDer.length>5 ? 'left-[390px]':'left-[485px]'" id="clasiDer">
          <div v-for="player in alineacionDer" class="relative inline-block">
            <img :src="'../../img/alineacion/'+equipoDer.data.fondo+'/'+player.name+'.png'">
            <div class="absolute bottom-6 left-3 flex flex-col uppercase w-[166px] h-[76px] justify-center text-white Anton">
              <div class="text-center w-full text-3xl"> {{ player.name }} </div>
              <div class="text-center w-full text-2xl"> {{ player.apellidos }} </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>