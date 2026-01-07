<template>
  <div v-if="marcador" class="absolute left-[100px] top-[55px] opacity-0 Anton" id="marcador">
          <div class="flex flex-col">
            <div class="w-[98px] h-[32px] bg-[#cc0000] relative left-[115px] text-2xl text-white items-center">
              <div class="ml-2">IMPRO {{ impro.id }}</div> 
            </div>
            <div class="flex">
              <div class="flex w-[287px] h-[50px] bg-white ml-6">
                <div class="flex p-2 w-full h-full justify-between items-center">
                  <div class="text-black text-4xl ml-16">{{ equipoIzq.puntos }}</div>
                  <div class="text-red-600 items-end text-lg">{{ equipoIzq.faltas }}</div>
                  <div class="text-2xl ml-2 mr-2">-</div>
                  <div class="text-red-600 items-end text-lg"> {{ equipoDer.faltas }} </div>
                  <div class="text-black text-4xl mr-16">{{ equipoDer.puntos }}</div>
                </div>
              </div>
              <div class="w-[75px] h-[50px]  absolute top-[42px]" id="equipoIzquierda">
                <img :src="'../../img/marcador/'+equipoIzq.data.fondo+'.png'">
              </div>
              <div class="bg-white text-xl text-center w-[80px] h-[30px] absolute top-[82px] left-[127px]" id="crono">
                <vue-countdown :time="impro.duracion*60*1000" v-slot="{minutes, seconds}">
                  {{ String(minutes).padStart(2,'0') }}:{{ String(seconds).padStart(2,'0') }}
                </vue-countdown>
              </div>
              <div class="w-[75px] h-[50px] absolute top-[42px] left-[260px]" id="equipoDerecha">
                <img :src="'../../img/marcador/'+equipoDer.data.fondo+'.png'">
              </div>
              
            </div>
          </div>
        </div> 
</template>

<script>
import VueCountdown from '@chenfengyuan/vue-countdown';

export default {
  components:{
    VueCountdown,
  },
  props: {
    impro: Object,
    equipoDer: Object,
    equipoIzq: Object,
    marcador: Boolean
  }
}
</script>

<style>

</style>