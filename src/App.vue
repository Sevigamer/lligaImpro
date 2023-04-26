<template>
<div class="flex">
  <div class="altura w-[1920px]">
    <transition name="test">
      <div v-if="marcador" class="absolute left-[100px] top-[55px] opacity-0 Anton" id="marcador">
        <div class="flex flex-col">
          <div class="w-[98px] h-[32px] bg-red-600 relative left-[161px] text-xl text-white items-center">
            <div class="ml-1">IMPRO {{ impro.id }}</div> 
          </div>
          <div class="flex mt-3">
            <div class="w-[162px] h-[71px] azul" id="equipoIzquierda"></div>
            <div class="bg-black text-white text-xl text-center w-[96px] h-[30px] relative top-[41px]" id="crono">
              <vue-countdown :time="duracion*60*1000" v-slot="{minutes, seconds}">
                {{ String(minutes).padStart(2,'0') }}:{{ String(seconds).padStart(2,'0') }}
              </vue-countdown>
            </div>
            <div class="w-[163px] h-[71px] rojo" id="equipoDerecha"></div>
            <div class="flex absolute left-[49px] top-[32px] w-[317px] h-[54px] bg-white">
              <div class="flex p-2 w-full h-full justify-between items-center">
                <div class="text-2xl text-blue-500">AZL</div>
                <div class="text-black text-2xl">{{ equipoIzq.puntos }}</div>
                <div class="text-red-600 items-end text-lg">{{ equipoIzq.faltas }}</div>
                <div class="text-2xl ml-2 mr-2">-</div>
                <div class="text-red-600 items-end text-lg"> {{ equipoDer.faltas }} </div>
                <div class="text-black text-2xl">{{ equipoDer.puntos }}</div>
                <div class="text-2xl text-red-500">RJO</div>
              </div>
            </div>
          </div>
        </div>
      </div>     
    </transition>

    <transition name="tarjeta">
      <div v-if="tarjeta" class="w-[650px] h-[480px] bg-red-500 absolute top-[340px] left-[760px]">
          <div class="h-4/5">
            <div class="mt-3 ">{{ impro.tipo }}</div>
            <div>
              <p> " {{ impro.titulo }} "</p>
            </div>
          </div>
          <div class="h-1/5 flex flex-col">
            <div class="flex text-white items-center ">
              <i class="fa-regular fa-clock"></i>
              <p>{{ impro.duracion}} minutos</p>
            </div>
            <div class="flex text-white items-center ">
              <i class="fa-solid fa-users"></i>
              <p>{{ impro.jugadores}}</p>
            </div>
            <div class="flex text-white items-center ">
              <i class='bx bx-category'></i>
              <p>{{ impro.categoria}}</p>
            </div>
          </div>
      </div>
    </transition>
  </div>
  <!-- Botones Marcador -->
  <div class="bg-white">
    
    <div class="flex">
        <button @click="inOutMarcador" class="botones">Marcador IN/OUT</button>
        <button @click="tarjeta = !tarjeta" class="botones">Tarjeta</button>
    </div>
    <div class="flex mt-2">
      <button @click="sumarPuntos(true)" class="botones">Sumar Punto Izq</button>
      <button @click="restarPuntos(true)" class="botones">Restar Punto Izq</button>
      <button @click="sumarFaltas(true)" class="botones">Sumar Falta Izq</button>
      <button @click="restarFaltas(true)" class="botones">Restar Falta Izq</button>
      <button @click="sumarPuntos(false)" class="botones">Sumar Punto Der</button>
      <button @click="sumarFaltas(false)" class="botones">Sumar Falta Der</button>
      <button @click="restarFaltas(false)" class="botones">Restar Falta Der</button>
    </div>

    <div class="flex mt-2">
      <div class="form">
        <p>Tipo de impro</p>
        <n-select v-model:value="tipo" size="large" :options="tipos" placeholder="Tipo de impro" @update:value="test"/>
      </div>
      <div class="form">
        <p>Titulo:</p>
        <n-input v-model:value="titulo" type="text" placeholder="Titulo" clearable/>
      </div>
      <div class="form">
        <p>Num jugadores:</p>
        <n-select v-model:value="jugadores" size="large" :options="numJug" placeholder="Num jugadores"/>
      </div>
      <div class="form">
        <p>Duracion:</p>
        <n-select v-model:value="duracion" size="large" :options="time" placeholder="Duracion"/>
      </div>
      <div class="form">
        <p>Categoria:</p>
        <n-input v-model:value="categoria" type="text" placeholder="Categoria" clearable/>
      </div>
      <button @click="saveImpro" class="botones">Guardar Impro</button>
    </div>
  </div>
</div> 
</template>

<script>
import { ref } from 'vue';
import VueCountdown from '@chenfengyuan/vue-countdown';
import {NSelect, NInput} from 'naive-ui';

export default {
  components:{
    VueCountdown,
    NSelect,
    NInput
  },
  setup(){
    const tipo = ref()
    const titulo = ref()
    const jugadores = ref()
    const duracion = ref()
    const categoria = ref()
    const marcador = ref(false)
    const tarjeta = ref(false) 
    const equipoIzq = ref({nombre: "", puntos: 0, faltas: 0})
    const equipoDer = ref({nombre: "", puntos: 0, faltas: 0})
    const tipos = ref([
      {label: "Mixta", value:"Mixta"},
      {label: "Seguida", value:"Seguida"},
      {label: "Comparada", value:"Comparada"},
    ])
    const numJug = ref([
      {label: "1", value: "1"},
      {label: "2", value: "2"},
      {label: "3", value: "3"},
      {label: "4", value: "4"},
      {label: "Todos", value: "Todos"},
      {label: "Indefinido", value: "Indefinido"},
    ])
    const time = ref([
      {label: "30 segundos", value: 0.5},
      {label: "1 minuto", value: 1},
      {label: "1,5 minuto", value: 1.5},
      {label: "2 minuto", value: 2},
      {label: "2,5 minuto", value: 2.5},
      {label: "3 minuto", value: 3},
      {label: "3,5 minuto", value: 3.5},
      {label: "4 minuto", value: 4},
      {label: "4,5 minuto", value: 4.5},
    ])
    const impro = ref({id: 0})
    return{
      equipoIzq,
      equipoDer,
      marcador,
      tarjeta,
      tipos,
      numJug,
      time,
      impro,
      tipo,
      titulo,
      jugadores,
      duracion, 
      categoria
    }
  },
  methods:{
    inOutMarcador(){
      setTimeout(function(){ 
        document.getElementById("marcador").style.opacity = 100
       }, 200);
       this.marcador = !this.marcador;
    }, 
    sumarPuntos(equipo){
      if(equipo)
        this.equipoIzq.puntos += 1;
      else
        this.equipoDer.puntos += 1;
    },
    sumarFaltas(equipo){
      if(equipo){
        this.equipoIzq.faltas += 1;
        if(this.equipoIzq.faltas == 3){
          this.equipoIzq.faltas = 0;
          this.equipoDer.puntos += 1;
        }
      }
      else{
        this.equipoDer.faltas += 1;
        if(this.equipoDer.faltas == 3){
          this.equipoDer.faltas = 0;
          this.equipoIzq.puntos += 1;
        }
      }
    },
    saveImpro(){
      this.impro.id++;
      this.impro.titulo = this.titulo;
      this.impro.tipo = this.tipo;
      this.impro.jugadores = this.jugadores;
      this.impro.duracion = this.duracion;
      this.impro.categoria = this.categoria;
    },
  },
  computed:{
  
  }
}
</script>

<style>
.puntos{
  background-image: url(../img/marcador.png);
}

/* .azul{
  background-image: url(../img/blue.png);
}
.rojo{
  background-image: url(../img/red.png);
} */
.azul{
  background-image: url(../img/izq/impropenosos.png);
}
.rojo{
  background-image: url(../img/derecha/gladiadoras.png);
}

.altura{
  height: 1080px;
}

.marcador-enter-to{
  animation: test 2.5s linear both;
}
.marcador-leave-to{
  animation: test 2.5s linear both reverse;
}

@keyframes test {
  0%{
    transform: translateY(-200px);
  }
  100%{
    transform: translateY(0px);
  }
}

.tarjeta-enter-to {
	animation: rotate-vert-center 1.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
}
.tarjeta-leave-to {
	animation: rotate-vert-center 1.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both reverse;
}

@keyframes rotate-vert-center {
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(360deg);
  }
}


.bounce-enter-active {
  animation: bounce-in 1.5s;
}
.bounce-leave-active {
  animation: bounce-in 1.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.test-enter-to {
	animation: slide-in-top 2.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.test-leave-to {
	animation: slide-in-top 2.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
}

@keyframes slide-in-top {
  0% {
    transform: translateY(-1000px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
