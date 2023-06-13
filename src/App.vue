<template>
<div class="flex">
  <div class="altura w-[1920px]">
    <transition name="test">
      <div v-if="marcador" class="absolute left-[100px] top-[55px] opacity-0 Anton" id="marcador">
        <div class="flex flex-col">
          <div class="w-[98px] h-[32px] bg-[#cc0000] relative left-[115px] text-2xl text-white items-center">
            <div class="ml-2">IMPRO {{ impro.id }}</div> 
          </div>
          <div class="flex">
            <div class="flex w-[287px] h-[50px] bg-white ml-6">
              <div class="flex p-2 w-full h-full justify-between items-center">
                <!-- <div class="text-3xl text-blue-500 ml-4">AZL</div> -->
                <div class="text-black text-4xl ml-16">{{ equipoIzq.puntos }}</div>
                <div class="text-red-600 items-end text-lg">{{ equipoIzq.faltas }}</div>
                <div class="text-2xl ml-2 mr-2">-</div>
                <div class="text-red-600 items-end text-lg"> {{ equipoDer.faltas }} </div>
                <div class="text-black text-4xl mr-16">{{ equipoDer.puntos }}</div>
                <!-- <div class="text-3xl text-red-500 mr-4">RJO</div> -->
              </div>
            </div>
            <div class="w-[75px] h-[50px] azul absolute top-[42px]" id="equipoIzquierda"></div>
            <div class="bg-white text-xl text-center w-[80px] h-[30px] absolute top-[82px] left-[127px]" id="crono">
              <vue-countdown :time="duracion*60*1000" v-slot="{minutes, seconds}">
                {{ String(minutes).padStart(2,'0') }}:{{ String(seconds).padStart(2,'0') }}
              </vue-countdown>
            </div>
            <div class="w-[75px] h-[50px] rojo absolute top-[42px] left-[260px]" id="equipoDerecha"></div>
            
          </div>
        </div>
      </div>     
    </transition>
    <transition name="test">
      <div v-if="crono" class="absolute left-[920px] top-[55px] opacity-0 Anton" id="crono">
            <div class="bg-white text-5xl text-center w-[80px] h-[60px] p-2" id="crono">
              <vue-countdown :time="0.5*60*1000" v-slot="{minutes, seconds}">
                {{ String(seconds).padStart(2,'0') }}
              </vue-countdown>
            </div>
      </div>     
    </transition>
    <transition name="tarjeta">
      <div v-if="texto" class="w-[1066px] h-[190px] absolute top-[784px] left-[427px] Anton target" id="texto">
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
    </transition>

    <transition name="nombreIzq">
      <div v-if="nJugadorIzq" class="opacity-0" id="nIzq">
        <div class="w-[245px] h-[90px] absolute top-[875px] left-[115px] bg-white">
          <div class="grid h-full Anton capitalize justify-items-end px-4 py-2">
            <div class="text-3xl"> {{ improvisador.nombre }} </div>
            <div class="text-2xl text-blue-600"> {{ improvisador.apellidos }} </div>
          </div>
        </div>
        <div class="bg-blue-600 w-[162px] h-[90px] absolute top-[895px] left-[33px]">
        </div>
      </div>
    </transition>

    <transition name="nombreDer">
      <div v-if="nJugadorDer" class="opacity-0" id="nDer">
        <div class="w-[245px] h-[90px] absolute top-[875px] left-[1560px] bg-white">
          <div class="flex flex-col h-full Anton capitalize  px-4 py-2">
            <div class="text-3xl"> {{ improvisador.nombre }} </div>
            <div class="text-2xl text-red-600"> {{ improvisador.apellidos }} </div>
          </div>
        </div>
        <div class="bg-red-600 w-[162px] h-[90px] absolute top-[895px] left-[1724px]">
        </div>
      </div>
    </transition>
    
  </div>
  <!-- Botones Marcador -->
  <div class="bg-white w-[1000px]">

    <n-tabs type="line" animated>
      <n-tab-pane name="Marcador" tab="Marcador">
        <button @click="inOutMarcador" class="botones">Marcador IN/OUT</button>
        <div class="flex flex-col mt-2">
          <div class="flex">
            <button @click="sumarPuntos(true)" class="botones">Sumar Punto Izq</button>
            <button @click="restarPuntos(true)" class="botones">Restar Punto Izq</button>
            <button @click="sumarFaltas(true)" class="botones">Sumar Falta Izq</button>
            <button @click="restarFaltas(true)" class="botones">Restar Falta Izq</button>
    
          </div>
          <div class="flex mt-2">
            <button @click="sumarPuntos(false)" class="botones">Sumar Punto Der</button>
            <button @click="restarPuntos(false)" class="botones">Restar Punto Der</button>
            <button @click="sumarFaltas(false)" class="botones">Sumar Falta Der</button>
            <button @click="restarFaltas(false)" class="botones">Restar Falta Der</button>
          </div>
        </div>
      </n-tab-pane>
      <n-tab-pane name="Tarjeta" tab="Tarjeta">
        <div class="flex">
          <button @click="inOutTarjeta()" class="botones">Tarjeta/Crono IN/OUT</button>
        </div>
        <div class="flex flex-col mt-2">
          <div class="form">
            <p>Tipo de impro</p>
            <n-select v-model:value="tipo" size="large" :options="tipos" placeholder="Tipo de impro"/>
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
      </n-tab-pane>
      <n-tab-pane name="Jugadores" tab="Jugadores">
        <div class="flex flex-col w-full">
          <div class="flex">
            <n-input v-model:value="nombre"  type="text" placeholder="Nombre"/>
            <n-input v-model:value="apellidos" type="text" placeholder="Apellidos"/>
            <button @click="nPresentador = !nPresentador" class="bg-slate-300 rounded p-2">IN/OUT</button>
          </div>
          <div class="">
            <p class="text-3xl">Jugadores Izquierda</p>
            <n-dynamic-input v-model:value="jugadoresIzq" :on-create="onCreate">
              <template #create-button-default>
                <p>Añadir Jugador</p>
              </template>
              <template #default="{ value }">
                <div class="flex">
                  <n-input v-model:value="value.nombre"  type="text" placeholder="Nombre"/>
                  <n-input v-model:value="value.apellidos" type="text" placeholder="Apellidos"/>
                  <button @click="playerNameIzq(value.index)" class="bg-slate-300 rounded p-2">IN/OUT</button>
                </div>
              </template>
            </n-dynamic-input>
          </div>
          <div class="">
            <p class="text-3xl">Jugadores Derecha</p>
            <n-dynamic-input v-model:value="jugadoresDer" :on-create="onCreate2">
              <template #create-button-default>
                <p>Añadir Jugador</p>
              </template>
              <template #default="{ value }">
                <div class="flex">
                  <n-input v-model:value="value.nombre"  type="text" placeholder="Nombre"/>
                  <n-input v-model:value="value.apellidos" type="text" placeholder="Apellidos"/>
                  <button @click="playerNameDer(value.index)" class="bg-slate-300 rounded p-2">IN/OUT</button>
                </div>
              </template>
            </n-dynamic-input>
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</div> 
</template>

<script>
import { ref } from 'vue';
import VueCountdown from '@chenfengyuan/vue-countdown';
import {NSelect, NInput, NTabs, NTabPane, NDynamicInput} from 'naive-ui';

export default{
  components:{
    VueCountdown,
    NSelect,
    NInput,
    NTabs,
    NTabPane,
    NDynamicInput
  },
  setup(){
    const improvisador = ref({})
    const tipo = ref()
    const titulo = ref()
    const jugadores = ref()
    const nombre = ref()
    const apellidos = ref()
    const duracion = ref()
    const categoria = ref()
    const marcador = ref(false)
    const crono = ref(false)
    const tarjeta = ref(false) 
    const texto = ref(false) 
    const nJugadorIzq = ref(false) 
    const nJugadorDer = ref(false) 
    const nPresentador = ref(false) 
    const equipoIzq = ref({puntos: 0, faltas: 0})
    const equipoDer = ref({puntos: 0, faltas: 0})
    const tipos = ref([
      {label: "Mixta", value:"MXT"},
      {label: "Seguida", value:"SEG"},
      {label: "Comparada", value:"CMP"},
    ])
    const numJug = ref([
      {label: "1", value: "1"},
      {label: "2", value: "2"},
      {label: "3", value: "3"},
      {label: "4", value: "4"},
      {label: "Todos", value: "Todos"},
      {label: "Indefinido", value: "Indef"},
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
      {label: "Idefinido", value: 0},
    ])
    const impro = ref({id: 0})
    const imageUrl = ref("../img/logo.gif");
    const jugadoresIzq = ref([])
    const jugadoresDer = ref([])
    return{
      equipoIzq,
      crono,
      equipoDer,
      marcador,
      tarjeta,
      tipos,
      nJugadorIzq,
      nJugadorDer,
      nPresentador,
      nombre,
      apellidos,
      numJug,
      time,
      impro,
      tipo,
      titulo,
      jugadores,
      duracion, 
      categoria,
      imageUrl,
      texto,
      jugadoresIzq,
      jugadoresDer,
      improvisador
    }
  },
  methods:{
    onCreate(){
      return { nombre: "", apellidos: "", index: this.jugadoresIzq.length}
    },
    onCreate2(){
      return { nombre: "", apellidos: "", index: this.jugadoresDer.length}
    },
    playerNameIzq(pos){
      setTimeout(function(){ 
        document.getElementById("nIzq").style.opacity = 100
       }, 200);
      this.improvisador = this.jugadoresIzq[pos];
      this.nJugadorIzq = !this.nJugadorIzq
    },
    playerNameDer(pos){
      setTimeout(function(){ 
        document.getElementById("nDer").style.opacity = 100
       }, 200);
      this.improvisador = this.jugadoresDer[pos];
      this.nJugadorDer = !this.nJugadorDer
    },
    inOutTarjeta(){
      setTimeout(function(){ 
        document.getElementById("crono").style.opacity = 100
       }, 200);
       this.crono = !this.crono;
       this.texto = !this.texto;
    },
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
    restarPuntos(equipo){
      if(equipo){
        if(this.equipoIzq.puntos != 0){
          this.equipoIzq.puntos -= 1;
        }
      }
      else{
        if(this.equipoDer.puntos !=  0){
          this.equipoDer.puntos -= 1;
        }
      }
    },
    restarFaltas(equipo){
      if(equipo){
        if(this.equipoIzq.faltas != 0){
          this.equipoIzq.faltas -= 1;
        }
      }
      else{
        if(this.equipoDer.faltas !=  0){
          this.equipoDer.faltas -= 1;
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
.n-tabs .n-tabs-tab .n-tabs-tab__label{
  font-size: x-large !important;
}
.n-base-select-menu .n-base-select-option{
  font-size: xx-large !important;
}
.n-input .n-input-wrapper{
  font-size: xx-large !important;
}

.logo{
  background-image: url(../img/tarjeta.jpeg);
}

.azul{
  background-image: url(../img/blue.png);
}
.rojo{
  background-image: url(../img/red.png);
}

.target{
  background-image: url(../img/tarjeta.png);
}

.altura{
  height: 1080px;
}

.marcador-enter-to{
  animation: test 2s linear both;
}
.marcador-leave-to{
  animation: test 2s linear both reverse;
}

@keyframes test {
  0%{
    transform: translateY(-200px);
  }
  100%{
    transform: translateY(0px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease 2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


/*.tarjeta-enter-to {
	animation: rotate-vert-center 1.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
}
.tarjeta-leave-to {
	animation: rotate-vert-center 1.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both reverse;
}*/

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
	animation: slide-in-top 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.test-leave-to {
	animation: slide-in-top 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
}

@keyframes slide-in-top {
  0% {
    transform: translateY(-1000px);
  }
  100% {
    transform: translateY(0);
  }
}

.nombreIzq-enter-to {
	animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.nombreIzq-leave-to {
	animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
}

@keyframes slide-in-left {
  0% {
    transform: translateX(-1000px);
  }
  100% {
    transform: translateX(0);
  }
}

.nombreDer-enter-to {
	animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.nombreDer-leave-to {
	animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
}

@keyframes slide-in-right {
  0% {
    transform: translateX(1000px);
  }
  100% {
    transform: translateX(0);
  }
}


.tarjeta-enter-to {
	animation: mostrar-objeto 1s forwards;
}
.tarjeta-leave-to {
	animation:  mostrar-objeto 1s forwards reverse;
}

@keyframes mostrar-objeto {
  0% {
    transform: translateX(-2000px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
