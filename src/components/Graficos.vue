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
            <div class="w-[75px] h-[50px]  absolute top-[42px]" id="equipoIzquierda">
              <img :src="'../../img/izq/'+equipoIzq.data.fondo+'_marcador.png'">
            </div>
            <div class="bg-white text-xl text-center w-[80px] h-[30px] absolute top-[82px] left-[127px]" id="crono">
              <vue-countdown :time="impro.duracion*60*1000" v-slot="{minutes, seconds}">
                {{ String(minutes).padStart(2,'0') }}:{{ String(seconds).padStart(2,'0') }}
              </vue-countdown>
            </div>
            <div class="w-[75px] h-[50px] absolute top-[42px] left-[260px]" id="equipoDerecha">
              <img :src="'../../img/derecha/'+equipoDer.data.fondo+'_marcador.png'">

            </div>
            
          </div>
        </div>
      </div>     
    </transition>
    <transition name="test">
      <div v-if="crono" class="absolute left-[920px] top-[55px] opacity-0 Anton" id="crono">
            <div class="bg-white text-5xl text-center w-[80px] h-[60px] p-2" id="crono">
              <vue-countdown :time="0.5*60*1000" v-slot="{seconds}">
                {{ String(seconds).padStart(2,'0') }}
              </vue-countdown>
            </div>
      </div>     
    </transition>
    <transition name="tarjeta">
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
    </transition>

    <transition name="nombreIzq">
      <div v-if="nJugadorIzq" class="opacity-0  w-[245px] h-[90px] absolute top-[875px] left-[115px]" id="nIzq">
        <div class="relative inline-block">
          <img :src="'../../img/izq/'+equipoIzq.data.fondo+'_nombre.png'">
          <div class="absolute bottom-0 ml-2 uppercase Antonio w-[245px] h-[90px] flex flex-col">
            <div class="text-3xl font-extrabold text-white h-fit mt-4"> {{ improvisadorIzq.name }} </div>
            <div class="text-xl text-white h-fit"> {{ improvisadorIzq.apellidos }} </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="nombreDer">
      <div v-if="nJugadorDer" class="opacity-0 w-[245px] h-[90px] absolute top-[875px] left-[1560px]" id="nDer">
        <div class="relative inline-block">
          <img :src="'../../img/derecha/'+equipoDer.data.fondo+'_nombre.png'">
          <div class="absolute bottom-0 uppercase Antonio w-[245px] h-[90px] flex justify-end">
            <div class="flex flex-col mr-2">
              <div class="text-3xl font-extrabold text-white w-fit h-fit mt-4 "> {{ improvisadorDer.name }} </div>
              <div class="text-xl text-white h-fit flex justify-end"> {{ improvisadorDer.apellidos }} </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="nombreIzq">
      <div v-if="perIzq" class="opacity-0  w-[245px] h-[90px] absolute top-[875px] left-[115px]" id="pIzq">
        <div class="relative inline-block">
          <img :src="'../../img/izq/lliga.png'">
          <div class="absolute bottom-0 ml-2 uppercase Antonio w-[245px] h-[90px] flex flex-col">
            <div class="text-3xl font-extrabold text-white h-fit mt-4"> {{ personaIzq.name }} </div>
            <div class="text-xl text-white h-fit"> {{ personaIzq.apellidos }} </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="nombreDer">
      <div v-if="perDer" class="opacity-0 w-[245px] h-[90px] absolute top-[875px] left-[1560px]" id="pDer">
        <div class="relative inline-block">
          <img :src="'../../img/derecha/lliga.png'">
          <div class="absolute bottom-0 uppercase Antonio w-[245px] h-[90px] flex justify-end">
            <div class="flex flex-col mr-2">
              <div class="text-3xl font-extrabold text-white w-fit h-fit mt-4 "> {{ personaDer.name }} </div>
              <div class="text-xl text-white h-fit flex justify-end"> {{ personaDer.apellidos }} </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="statsIzq">
      <div  v-if="statsIzq" id="estadisticasIzq" class="w-[538px] h-[697px] absolute top-[175px] left-[118px] flex flex-col opacity-0">
        <div class="h-[114px] w-full uppercase flex items-center justify-center">
          <div class="text-white text-7xl Anton">{{ improvisadorIzq.name + " " + improvisadorIzq.apellidos }}</div>
        </div>
        <div class="">
          <div class="Anton flex flex-col mr-4 ml-4 text-5xl text-white uppercase">
            <div class="flex justify-between mt-4">
              <p>ORIGEN:</p>
              <p>{{ improvisadorIzq.pueblo }}</p>
            </div>
            <div class="flex justify-between mt-4">
              <p>EDAD:</p>
              <p>{{ improvisadorIzq.edad }}</p>
            </div>
            <div class="flex justify-between mt-4">
              <p>DEBUT:</p>
              <p>{{ improvisadorIzq.debut }}</p>
            </div>
            <div class="flex justify-between mt-4">
              <p>PROMEDIO:</p>
              <p><VueUiRating :config="configStar" :dataset="ratingLeft"/></p>
            </div>
          </div>
          <div class="Anton">
            <VueUiRadar :config="configRadar" :dataset="datasetIzq"/>
          </div>
        </div>
      </div>
    </transition>
    <transition name="statsDer">
      <div  v-if="statsDer" id="estadisticasDer" class="w-[538px] h-[697px] absolute top-[175px] left-[1265px] flex flex-col opacity-0">
        <div class="h-[114px] w-full uppercase flex items-center justify-center">
          <div class="text-white text-7xl Anton">{{ improvisadorDer.name + " " + improvisadorDer.apellidos }}</div>
        </div>
        <div class="">
          <div class="Anton flex flex-col mr-4 ml-4 text-5xl text-white uppercase">
            <div class="flex justify-between mt-4">
              <p>ORIGEN:</p>
              <p>{{ improvisadorDer.pueblo }}</p>
            </div>
            <div class="flex justify-between mt-4">
              <p>EDAD:</p>
              <p>{{ improvisadorDer.edad }}</p>
            </div>
            <div class="flex justify-between mt-4">
              <p>DEBUT:</p>
              <p>{{ improvisadorDer.debut }}</p>
            </div>
            <div class="flex justify-between mt-4">
              <p>PROMEDIO:</p>
              <p><VueUiRating :config="configStar" :dataset="ratingRight"/></p>
            </div>
          </div>
          <div class="Anton">
            <VueUiRadar :config="configRadar" :dataset="datasetDer"/>
          </div>
        </div>
      </div>
    </transition>

    <transition name="tarjeta">
      <div v-if="clasificacion" class="absolute top-[188px] left-[326px] w-[1268px] h-[694px] flex flex-col clasi text-7xl Antonio text-white opacity-0" id="clasi">
        <table class="table-auto w-full h-full text-left">
            <thead class="h-[86px]">
                <tr>
                    <td class="py-1  text-center  p-4" contenteditable="true"></td>
                    <td class="py-1  text-center  p-4" contenteditable="true"></td>
                    <td class="py-1  text-center  p-4" contenteditable="true"></td>
                    <td class="py-1  text-center  p-4" contenteditable="true">PP</td>
                    <td class="py-1  text-center  p-4" contenteditable="true">PE</td>
                    <td class="py-1  text-center  p-4" contenteditable="true">PG</td>
                    <td class="py-1  text-center font-bold p-4" contenteditable="true">IG</td>
                    <td class="py-1  text-center font-bold  p-4" contenteditable="true">F</td>
                    <td class="py-1  text-center font-bold  p-4" contenteditable="true">I</td>
                    <td class="py-1  text-center font-extrabold  p-4" contenteditable="true">PT</td>
                </tr>
            </thead>
            <tbody class="">
                <tr class="py-1" v-for="equipo in clasi">
                    <td class="py-1  text-center text-black mr-8" contenteditable="true" :class="equipo.posicion < 5 ? 'border-l-8 border-[#be1622]':''"> {{ equipo.posicion }} </td>
                    <td class="py-1 w-fit flex justify-center ml-4" contenteditable="true"> <img :src="'../../img/clasi/'+equipo.equipo+'.png'"> </td>
                    <td class="py-1  text-right  p-4 uppercase text-4xl font-thin" contenteditable="true"> {{equipo.equipo}} </td>
                    <td class="py-1  text-center  p-4" contenteditable="true"> {{equipo.pperdios}}</td>
                    <td class="py-1  text-center  p-4" contenteditable="true"> {{equipo.pempatados}}</td>
                    <td class="py-1  text-center  p-4" contenteditable="true"> {{equipo.pganados}}</td>
                    <td class="py-1  text-center font-bold  p-4" contenteditable="true"> {{equipo.iganadas}}</td>
                    <td class="py-1  text-center font-bold p-4" contenteditable="true"> {{equipo.faltas}}</td>
                    <td class="py-1  text-center font-bold p-4" contenteditable="true"> {{equipo.insignias}}</td>
                    <td class="py-1  text-center font-bold p-4" contenteditable="true"> {{equipo.puntos}}</td>
                </tr>
            </tbody>
        </table>
      </div>
    </transition>

    <transition name="alineacion">
      <div v-if="alIzq" class="flex absolute top-[666px] justify-center opacity-0" :class="alineacionIzq.length>5 ? 'left-[390px]':'left-[485px]'" id="clasiIzq">
        <div v-for="player in alineacionIzq" class="relative inline-block">
          <img :src="'../../img/alineacion/'+equipoIzq.data.fondo+'/'+player.name+'.png'">
          <div class="absolute bottom-6 left-3 flex flex-col uppercase w-[166px] h-[76px] justify-center text-white Anton">
            <div class="text-center w-full text-3xl"> {{ player.name }} </div>
            <div class="text-center w-full text-2xl"> {{ player.apellidos }} </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="alineacion">
      <div v-if="alDer" class="flex absolute top-[666px] justify-center opacity-0" :class="alineacionDer.length>5 ? 'left-[390px]':'left-[485px]'" id="clasiDer">
        <div v-for="player in alineacionDer" class="relative inline-block">
          <img :src="'../../img/alineacion/'+equipoDer.data.fondo+'/'+player.name+'.png'">
          <div class="absolute bottom-6 left-3 flex flex-col uppercase w-[166px] h-[76px] justify-center text-white Anton">
            <div class="text-center w-full text-3xl"> {{ player.name }} </div>
            <div class="text-center w-full text-2xl"> {{ player.apellidos }} </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="alineacion">
        <div v-if="statsEquipo" class="flex absolute left-[118px] top-[815px] w-[683px] h-[172px] opacity-0" id="stats">
          <div class="relative inline-block">
            <img :src="'../../img/izq/'+equipoIzq.data.fondo+'_stats.png'">
            <div class="absolute bottom-0 left-[88px] h-[172px] w-[595px] px-4 py-2  flex flex-col uppercase text-white Anton">
              <div class="flex text-3xl border-solid border-4 border-white justify-between px-2">
                <p>TEC.</p>
                <p>DIB.</p>
                <p>ORG.</p>
                <p>COM.</p>
                <p>REC.</p>
              </div>
              <div class="flex text-8xl justify-between mt-2">
                <p> {{ statsEquipoIzq[0] }} </p>
                <p> {{ statsEquipoIzq[1] }} </p>
                <p> {{ statsEquipoIzq[3] }} </p>
                <p> {{ statsEquipoIzq[3] }} </p>
                <p> {{ statsEquipoIzq[4] }} </p>
              </div>
            </div>
          </div>
        </div>
    </transition>
    <transition name="alineacion">
      <div v-if="statsEquipo" class="flex absolute right-[1118px] top-[815px] w-[683px] h-[172px] opacity-0" id="stats2">
          <div class="relative inline-block">
            <img :src="'../../img/derecha/'+equipoDer.data.fondo+'_stats.png'">
            <div class="absolute bottom-0 right-[88px] h-[172px] w-[595px] px-4 py-2  flex flex-col uppercase text-white Anton">
              <div class="flex text-3xl border-solid border-4 border-white justify-between px-2">
                <p>TEC.</p>
                <p>DIB.</p>
                <p>ORG.</p>
                <p>COM.</p>
                <p>REC.</p>
              </div>
              <div class="flex text-8xl justify-between mt-2">
                <p> {{ statsEquipoDer[0] }} </p>
                <p> {{ statsEquipoDer[1] }} </p>
                <p> {{ statsEquipoDer[3] }} </p>
                <p> {{ statsEquipoDer[3] }} </p>
                <p> {{ statsEquipoDer[4] }} </p>
              </div>
            </div>
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
        <div>
          <n-select v-model:value="impro" size="large" :options="impros" placeholder="Improvisaciones"/>
        </div>
        <div class="flex flex-col mt-2">
          <div class="form">
            <p>Tipo de impro</p>
            <n-select v-model:value="impro.tipo" size="large" :options="tipos" placeholder="Tipo de impro"/>
          </div>
          <div class="form">
            <p>Titulo:</p>
            <n-input v-model:value="impro.titulo" type="text" placeholder="Titulo" clearable/>
          </div>
          <div class="form">
            <p>Num jugadores:</p>
            <n-select v-model:value="impro.jugadores" size="large" :options="numJug" placeholder="Num jugadores"/>
          </div>
          <div class="form">
            <p>Duracion:</p>
            <n-select v-model:value="impro.duracion" size="large" :options="time" placeholder="Duracion"/>
          </div>
          <div class="form">
            <p>Categoria:</p>
            <n-input v-model:value="impro.categoria" type="text" placeholder="Categoria" clearable/>
          </div>
          <!-- <button @click="saveImpro" class="botones">Guardar Impro</button> -->
        </div>
      </n-tab-pane>
      <n-tab-pane name="Jugadores" tab="Jugadores">
        <div class="flex flex-col w-full">
          <button @click="swap" class="botones ">CAMBIO</button>
          <div class="flex">
            <n-input v-model:value="personaIzq.name"  type="text" placeholder="Nombre"/>
            <n-input v-model:value="personaIzq.apellidos" type="text" placeholder="Apellidos"/>
            <button @click="showPerIzq" class="bg-slate-300 rounded p-2">IN/OUT IZQ</button>
          </div>
          <div class="flex">
            <n-input v-model:value="personaDer.name"  type="text" placeholder="Nombre"/>
            <n-input v-model:value="personaDer.apellidos" type="text" placeholder="Apellidos"/>
            <button @click="showPerDer" class="bg-slate-300 rounded p-2">IN/OUT DER</button>
          </div>
          <div >
            <button @click="showPersonas" class="bg-slate-300 rounded p-2">IN/OUT Ambos</button>
          </div>
          <div v-if="jugadoresIzq.length == 0" class="flex">
            <p class="text-3xl">Equipo IZQ</p>
            <n-select v-model:value="equipoIzq.data" size="large" :options="equipos"/>
            <p class="text-3xl">Equipo DER</p>
            <n-select v-model:value="equipoDer.data" size="large" :options="equipos"/>
            <button @click="getImprovisadores" class="botones">Guardar</button>
          </div>
          <div v-else class="flex-col flex  w-full">
            <div class="flex">
              <div class="flex justify-between flex-col w-1/2">
                <p class="text-3xl">Jugadores Izquierda</p>
                <div v-for="improvisador in jugadoresIzq" :key="improvisador.id" class="flex items-center">
                  <p class="mr-2 uppercase "> {{ improvisador.name }} </p>
                  <button @click="playerNameIzq(improvisador)" class="bg-slate-300 rounded p-2 mr-2">IN/OUT</button>
                  <button @click="statIzq(improvisador, true)" class="bg-slate-300 rounded p-2 mr-2">STATS IZQ</button>
                  <button @click="statDer(improvisador, true)" class="bg-slate-300 rounded p-2">STATS DER</button>
                </div>
              </div>
              <div class="flexjustify-between flex-col w-1/2">
                <p class="text-3xl">Jugadores Derecha</p>
                <div v-for="improvisador in jugadoresDer" :key="improvisador.id" class="flex items-center">
                  <p class="mr-2 uppercase "> {{ improvisador.name }} </p>
                  <button @click="playerNameDer(improvisador)" class="bg-slate-300 rounded p-2 mr-2">IN/OUT</button>
                  <button @click="statIzq(improvisador, false)" class="bg-slate-300 rounded p-2 mr-2">STATS IZQ</button>
                  <button @click="statDer(improvisador, false)" class="bg-slate-300 rounded p-2">STATS DER</button>
                </div>
              </div>
            </div>
            <div class="flex mt-4">
              <n-select class="w-40" v-model:value="alineacionIzq" multiple size="large" :options="jIzq"/>
              <button @click="showAlineacionIzq" class="botones">Alineacion</button>
              <n-select class="w-40" v-model:value="alineacionDer" multiple size="large" :options="jDer"/>
              <button @click="showAlineacionDer" class="botones">Alineacion</button>
            </div>
            <div class=" flex mt-4">
              <button @click="showStats" class="botones">Stats Equipos</button>
            </div>

          </div>
        </div>
      </n-tab-pane>
      <n-tab-pane name="Clasificacion" tab="Clasi">
        <button @click="getClasi" class="botones"> Clasificacion IN/OUT</button>
      </n-tab-pane>
    </n-tabs>
  </div>
</div> 
</template>

<script>
import axios from 'axios'
import { ref } from 'vue';
import VueCountdown from '@chenfengyuan/vue-countdown';
import {NSelect, NInput, NTabs, NTabPane} from 'naive-ui';
import {VueUiRadar, VueUiRating} from "vue-data-ui"


export default{
  components:{
    VueCountdown,
    NSelect,
    NInput,
    NTabs,
    NTabPane,
    VueUiRadar,
    VueUiRating
  },
  setup(){
    const improvisadorIzq = ref({})
    const improvisadorDer = ref({})
    const personaIzq = ref({})
    const personaDer = ref({})
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
    const perIzq = ref(false) 
    const perDer = ref(false) 
    const statsIzq = ref(false)
    const statsDer = ref(false)
    const alIzq = ref(false)
    const alDer = ref(false)
    const statsEquipo = ref(false)
    const imageIzq = ref("")
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
    const impro = ref({})
    const impros = ref([])
    const imageUrl = ref("../img/logo.gif");
    const jugadoresIzq = ref([])
    const jugadoresDer = ref([])
    const statsEquipoIzq = ref([])
    const statsEquipoDer = ref([])
    const equipos = ref([
      {label:"Dreamteam", value: {id: 1, color: '#bd1722', fondo: 'dreamteam'}},
      {label:"Emta", value: {id:2, color:'#02ad3a',  fondo:'emta'}},
      {label:"Improvsessio", value: {id:3, color:'#ee7004',  fondo:'improvsessio'}},
      {label:"Gladiadoras", value: {id:4, color:'#ff33b9',  fondo:'gladiadoras'}},
      {label:"Aspaiet", value: {id:5, color:'#fad517',  fondo:'aspaiet'}},
      {label:"Impropenosos", value: {id:6, color:'#1c70b7',  fondo:'impropenosos'}},
    ])
    const configRadar = ref({
    "style":{
       "fontFamily":"inherit",
       "chart":{
          "backgroundColor":"#00000000",
          "color":"#ffffff",
          "layout":{
             "useDiv":true,
             "plots":{
                "show":true,
                "radius":2
             },
             "outerPolygon":{
                "stroke":"#CCCCCC",
                "strokeWidth":1
             },
             "dataPolygon":{
                "strokeWidth":1,
                "transparent":false,
                "opacity":20,
                "useGradient":true
             },
             "grid":{
                "show":true,
                "stroke":"#e1e5e8",
                "strokeWidth":0.5,
                "graduations":5
             },
             "labels":{
                "dataLabels":{
                   "show":true,
                   "fontSize":20,
                   "color":"#ffffff"
                }
             }
          },
          "title":{
             "text":"",
             "color":"#2D353C",
             "fontSize":20,
             "bold":true,
             "subtitle":{
                "color":"#A1A1A1",
                "text":"",
                "fontSize":16,
                "bold":false
             }
          },
          "tooltip":{
             "show":true,
             "backgroundColor":"#FFFFFF",
             "color":"#2D353C",
             "fontSize":14,
             "showValue":true,
             "showPercentage":true,
             "roundingValue":0,
             "roundingPercentage":0
          },
          "legend":{
             "show":false,
             "bold":true,
             "backgroundColor":"#FFFFFF",
             "color":"#2D353C",
             "fontSize":14,
             "roundingPercentage":0
          }
       }
    },
    "table":{
       "show":false,
       "th":{
          "backgroundColor":"#FAFAFA",
          "color":"#2D353C",
          "outline":"1px solid #e1e5e8"
       },
       "td":{
          "backgroundColor":"#FFFFFF",
          "color":"#2D353C",
          "outline":"1px solid #e1e5e8",
          "roundingValue":0,
          "roundingPercentage":0
       }
    },
    "userOptions":{
       "show":false,
       "title":"options",
       "labels":{
          "useDiv":"Title & legend inside",
          "showTable":"Show table"
       }
    },
    "translations":{
       "target":"Target"
    }
    })
    const datasetIzq = ref({
      categories: [{name: "stats", color: "#42d392"}],
      series:[
        {
          name: "TECNICA",
          values: [95],
          color: "",
          target: 100
        },
        {
          name: "DIBUJO",
          values: [95],
          color: "",
          target: 100
        },
        {
          name: "ORIGINALIDAD",
          values: [95],
          color: "",
          target: 100
        },
        {
          name: "COMEDIA",
          values: [95],
          color: "",
          target: 100
        },
        {
          name: "RECURSOS",
          values: [95],
          color: "",
          target: 100
        },
      ]
    })
    const datasetDer = ref({
      categories: [{name: "stats", color: "#42d392"}],
      series:[
        {
          name: "TECNICA",
          values: [95],
          color: "",
          target: 100
        },
        {
          name: "DIBUJO",
          values: [95],
          color: "",
          target: 100
        },
        {
          name: "ORIGINALIDAD",
          values: [95],
          color: "",
          target: 100
        },
        {
          name: "COMEDIA",
          values: [95],
          color: "",
          target: 100
        },
        {
          name: "RECURSOS",
          values: [95],
          color: "",
          target: 100
        },
      ]
    })
    const configStar = ref(
      {
        "type":"star",
        "readonly":false,
        "from":1,
        "to":3,
        "style":{
            "fontFamily":"inherit",
            "animated":true,
            "itemSize":48,
            "backgroundColor":"#00000000",
            "star":{
              "activeColor":"#FFD055",
              "borderColor":"#FFD055",
              "borderWidth":3,
              "apexes":5,
              "inactiveColor":"#e1e5e8",
              "useGradient":true
            },
            "image":{
              "src":"",
              "inactiveOpacity":0.3,
              "alt":"rating image"
            },
            "title":{
              "textAlign":"center",
              "fontSize":20,
              "color":"#2D353C",
              "bold":true,
              "text":"",
              "offsetY":6,
              "subtitle":{
                  "fontSize":14,
                  "color":"#CCCCCC",
                  "bold":false,
                  "text":"",
                  "offsetY":12
              }
            },
            "rating":{
              "show":true,
              "fontSize":48,
              "bold":true,
              "roundingValue":1,
              "position":"right",
              "offsetY":0,
              "offsetX":4
            },
            "tooltip":{
              "show":true,
              "fontSize":14,
              "offsetY":0,
              "color":"#2D353C",
              "bold":true,
              "backgroundColor":"#FFFFFF",
              "borderColor":"#e1e5e8",
              "borderRadius":4,
              "boxShadow":"0 6px 12px -6px rgba(0,0,0,0.2)"
            }
        }
      }
    )
    const ratingLeft = ref({rating: 0.0})
    const ratingRight = ref({rating: 0.0})
    const clasi = ref([])
    const clasificacion = ref(false)
    const jIzq = ref([])
    const jDer = ref([])
    const alineacionIzq = ref([])  
    const alineacionDer = ref([])  
    return{
      equipoIzq,
      crono,
      equipoDer,
      marcador,
      tarjeta,
      tipos,
      nJugadorIzq,
      nJugadorDer,
      nombre,
      apellidos,
      numJug,
      time,
      impro,impros,
      tipo,
      titulo,
      jugadores,
      duracion, 
      categoria,
      imageUrl,
      texto,
      jugadoresIzq,jugadoresDer,
      improvisadorIzq,improvisadorDer,
      statsIzq, statsDer,
      equipos,
      datasetIzq, datasetDer,
      configRadar,
      configStar,
      ratingLeft, ratingRight,
      imageIzq,
      clasi,
      clasificacion,
      alineacionIzq,alineacionDer, alDer, alIzq,
      jIzq, jDer,
      personaIzq,personaDer, perIzq, perDer,
      statsEquipoIzq, statsEquipoDer, statsEquipo
    }
  },
  async created(){
    axios.get("http://lligaimproback.test/api/impros")
    .then(response => {
      for(let i = 0; i< response.data.length; i++){
        this.impros.push({label: "IMPRO "+response.data[i].id, value:response.data[i]})
      }
    })
  },
  methods:{
    swap(){
      let izq = this.equipoIzq
      let der = this.equipoDer
      this.equipoIzq = der
      this.equipoDer = izq
      izq = this.jIzq
      der = this.jDer
      this.jIzq = der
      this.jDer = izq
      izq = this.statsEquipoIzq
      der = this.statsEquipoDer
      this.statsEquipoIzq = der
      this.statsEquipoDer = izq
      izq = this.jugadoresIzq
      der = this.jugadoresDer
      this.jugadoresIzq = der
      this.jugadoresDer = izq
    },
    showStats(){
      setTimeout(function(){ 
        document.getElementById("stats").style.opacity = 100
        document.getElementById("stats2").style.opacity = 100
       }, 200);
      this.statsEquipo = !this.statsEquipo 
    },
    showPerDer(){
      setTimeout(function(){ 
        document.getElementById("pDer").style.opacity = 100
       }, 200);
      this.perDer = !this.perDer 
    },
    showPerIzq(){
      setTimeout(function(){ 
        document.getElementById("pIzq").style.opacity = 100
       }, 200);
      this.perIzq = !this.perIzq
    },
    showPersonas(){
      setTimeout(function(){ 
      document.getElementById("pIzq").style.opacity = 100
      }, 200);
      setTimeout(function(){ 
      document.getElementById("pDer").style.opacity = 100
      }, 200);
      this.perDer = !this.perDer 
      this.perIzq = !this.perIzq
    },
    showAlineacionIzq(){
      setTimeout(function(){ 
        document.getElementById("clasiIzq").style.opacity = 100
       }, 200);
      this.alIzq = !this.alIzq
    },
    showAlineacionDer(){
      setTimeout(function(){ 
        document.getElementById("clasiDer").style.opacity = 100
       }, 200);
      this.alDer = !this.alDer
    },
    async getClasi(){
      await axios.get('http://lligaimproback.test/api/clasi')
      .then(response => {
        this.clasi = response.data
      })
      setTimeout(function(){ 
        document.getElementById("clasi").style.opacity = 100
       }, 200);
      this.clasificacion = !this.clasificacion
    },
    async statIzq(improvisador,pos){
      let url = ""
      if(pos){
        this.datasetIzq.categories[0].color = this.equipoIzq.data.color
        url =  this.equipoIzq.data.fondo
      }else{
        this.datasetIzq.categories[0].color = this.equipoDer.data.color
        url = this.equipoDer.data.fondo
      }
      this.improvisadorIzq.name = improvisador.name
      this.improvisadorIzq.apellidos = improvisador.apellidos
      this.improvisadorIzq.pueblo = improvisador.pueblo
      this.improvisadorIzq.debut = improvisador.debut
      this.improvisadorIzq.edad = improvisador.edad
      let number =  parseFloat(improvisador.promedio)
      this.ratingLeft.rating = number
      await axios.get(`http://lligaimproback.test/api/stats/${improvisador.id}`)
      .then(response => {
        for(let i = 0; i< response.data.length; i++){
          this.datasetIzq.series[i].values[0] = response.data[i];
        }
      })
      setTimeout(function(){ 
        document.getElementById("estadisticasIzq").style.opacity = 100
        document.getElementById("estadisticasIzq").style.backgroundImage = `url('../../img/stats/${url}.png')`;
       }, 200);
      this.statsIzq = !this.statsIzq
    },
    async statDer(improvisador, pos){
      let url = ""
      if(pos){
        this.datasetDer.categories[0].color = this.equipoIzq.data.color
        url =  this.equipoIzq.data.fondo
      }else{
        this.datasetDer.categories[0].color = this.equipoDer.data.color
        url = this.equipoDer.data.fondo
      }
      this.improvisadorDer.name = improvisador.name
      this.improvisadorDer.apellidos = improvisador.apellidos
      this.improvisadorDer.pueblo = improvisador.pueblo
      this.improvisadorDer.debut = improvisador.debut
      this.improvisadorDer.edad = improvisador.edad
      this.improvisadorDer.promedio = improvisador.promedio
      let number =  parseFloat(improvisador.promedio)
      this.ratingRight.rating = number
      await axios.get(`http://lligaimproback.test/api/stats/${improvisador.id}`)
      .then(response => {
        for(let i = 0; i< response.data.length; i++){
          this.datasetDer.series[i].values[0] = response.data[i];
        }
      })
      setTimeout(function(){ 
        document.getElementById("estadisticasDer").style.opacity = 100
        document.getElementById("estadisticasDer").style.backgroundImage = `url('../../img/stats/${url}.png')`;
       }, 200);
      this.statsDer = !this.statsDer
    },
    async getImprovisadores(){
      await axios.get(`http://lligaimproback.test/api/improvisadores/${this.equipoIzq.data.id}`)
      .then(response => {
        this.jugadoresIzq = response.data
        for(let i = 0; i< response.data.length; i++){
          this.jIzq.push({label: response.data[i].name, value: response.data[i]})
        }
      })
      await axios.get(`http://lligaimproback.test/api/equipos/${this.equipoIzq.data.id}`)
      .then(response => {
        this.statsEquipoIzq = response.data
      })
      await axios.get(`http://lligaimproback.test/api/improvisadores/${this.equipoDer.data.id}`)
      .then(response => {
        this.jugadoresDer = response.data
        for(let i = 0; i< response.data.length; i++){
          this.jDer.push({label: response.data[i].name, value: response.data[i]})
        }
      })
      await axios.get(`http://lligaimproback.test/api/equipos/${this.equipoDer.data.id}`)
      .then(response => {
        this.statsEquipoDer = response.data
      })
    },
    playerNameIzq(pos){
      setTimeout(function(){ 
        document.getElementById("nIzq").style.opacity = 100
       }, 200);
      this.improvisadorIzq = pos;
      this.nJugadorIzq = !this.nJugadorIzq
    },
    playerNameDer(pos){
      setTimeout(function(){ 
        document.getElementById("nDer").style.opacity = 100
       }, 200);
      this.improvisadorDer = pos;
      this.nJugadorDer = !this.nJugadorDer
    },
    inOutTarjeta(){
      setTimeout(function(){ 
        document.getElementById("crono").style.opacity = 100
        document.getElementById("texto").style.opacity = 100
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

<style scoped>

.n-tabs .n-tabs-tab .n-tabs-tab__label{
  font-size: x-large !important;
}
.n-base-select-menu .n-base-select-option{
  font-size: xx-large !important;
}
.n-input .n-input-wrapper{
  font-size: xx-large !important;
}

.clasi{
  background-image: url(../../img/clasi/fondo.png);
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
  background-image: url(../../img/tarjeta.png);
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

.alineacion-enter-to {
	animation: slide-in-bot 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.alineacion-leave-to {
	animation: slide-in-bot 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
}

@keyframes slide-in-bot {
  0% {
    transform: translateY(1000px);
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
.statsIzq-enter-to {
	animation: slide-in-left 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.statsIzq-leave-to {
	animation: slide-in-left 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
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
.statsDer-enter-to {
	animation: slide-in-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.statsDer-leave-to {
	animation: slide-in-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
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
