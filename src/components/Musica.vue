<template>
  <div class="flex flex-col mt-2 ml-2">
    <div class="flex mt-2">
      <button @click="siguiente(2)"  class="botones ml-2">Entrada publico 1</button>
      <button @click="siguiente(1)"  class="botones ml-2">Entrada publico 2</button>
      <button @click="siguiente(3)" class="botones">Intro</button>
    </div>
    <div class="flex mt-2">
      <button @click="siguiente(4)"  class="botones">Entrada equipo 1</button>
      <button @click="siguiente(5)"  class="botones ml-2">Entrada equipo 2</button>
      <button @click="siguiente(6)"  class="botones ml-2">Calentamiento</button>
    </div>
    <div class=" flex mt-2" v-for="impro in impros">
      <button @click="siguiente(impro.song)"  class="botones">Impro {{ impro.id }} pensar</button>
    </div>
    <!-- <div class="flex mt-2">
      <button @click="cancion = 7"  class="botones">Impro 1 pensar</button>
      <button class="botones ml-2">Impro 1 votacion</button>
    </div>
    <div class="flex mt-2">
      <button @click="cancion = 8"  class="botones">Impro 2 pensar</button>
      <button class="botones ml-2">Impro 2 votacion</button>
    </div>
    <div class="flex mt-2">
      <button @click="cancion = 9"  class="botones">Impro 3 pensar</button>
      <button class="botones ml-2">Impro 3 votacion</button>
    </div>
    <div class="flex mt-2">
      <button @click="cancion = 7"  class="botones">Impro 4 pensar</button>
      <button class="botones ml-2">Impro 4 votacion</button>
    </div>
    <div class="flex mt-2">
      <button @click="cancion = 7"  class="botones">Impro 5 pensar</button>
      <button class="botones ml-2">Impro 5 votacion</button>
    </div>
    <div class="flex mt-2">
      <button @click="cancion = 7"  class="botones">Impro 6 pensar</button>
      <button class="botones ml-2">Impro 6 votacion</button>
    </div>
    <div class="flex mt-2">
      <button @click="cancion = 7"  class="botones">Impro  pensar</button>
      <button class="botones ml-2">Impro  votacion</button>
    </div>
    <div class="flex mt-2">
      <button @click="cancion = 7"  class="botones">Impro  pensar</button>
      <button class="botones ml-2">Impro  votacion</button>
    </div>
    <div class="flex mt-2">
      <button @click="cancion = 7"  class="botones">Impro  pensar</button>
      <button class="botones ml-2">Impro  votacion</button>
    </div>
    <div class="flex mt-2">
      <button @click="cancion = 7"  class="botones">Impro  pensar</button>
      <button class="botones ml-2">Impro  votacion</button>
    </div>
    <div class="flex mt-2">
      <button @click="cancion = 7"  class="botones">Impro  pensar</button>
      <button class="botones ml-2">Impro  votacion</button>
    </div>
    <div class="flex mt-2">
      <button @click="cancion = 7"  class="botones">Impro  pensar</button>
      <button class="botones ml-2">Impro  votacion</button>
    </div> -->
    <div class="absolute top-2 right-2 flex flex-col mt-2">
      <!-- <audio ref="myAudio" class="w-[500px] h-[100px]"  controls>
        <source :src="'/musica/'+cancion+'.mp3'"  type="audio/mp3">
      </audio> -->
      <button @click="parar" class="botones mt-2">Parar</button>
      <button @click="continuar" class="botones mt-2">continuar</button>
      <!-- <button class="botones mt-2">Led basico</button>
      <button class="botones mt-2">Final tiempo</button>
      <button class="botones mt-2">Punto equipo 1</button>
      <button class="botones mt-2">Punto equipo 2</button> -->
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup(){
    const cancion = ref(1)
    const impros = ref([
      {id: 1, song: 7},
      {id: 2, song: 8},
      {id: 3, song: 9},
      {id: 4, song: 10},
      {id: 5, song: 11},
      {id: 6, song: 12},
      {id: 7, song: 13},
      {id: 8, song: 14},
      {id: 9, song: 15},
      {id: 10, song: 16},
      {id: 11, song: 17},
      {id: 12, song: 18},
    ])
    return{
      cancion, impros
    }
  },
  methods:{
    siguiente(number){
      debugger
      this.cancion = number
      let audio = this.$refs.myAudio;
      audio.play().then(() => {
        audio.volume = 0
        const intervalId = setInterval(() => {
          if (audio.volume < 1) {
            audio.volume += 0.1;
          } else {
            clearInterval(intervalId); 
          }
        }, 100);
      })
 
    },
    parar(){

    },
    continuar(){

    },
  }
}
</script>

<style>

</style>