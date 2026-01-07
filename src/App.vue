<template>
  <div class="flex">
    <div class="altura w-[1920px]">
      <transition name="test">
        <marcador :impro="impro" :equipoDer="equipoDer" :equipoIzq="equipoIzq" :marcador="marcador"  ></marcador>
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
        <tarjeta :impro="impro" :texto="texto" ></tarjeta>
      </transition>
  
      <transition name="nombreIzq">
        <nombre :pos="true" :equipo="equipoIzq.data.fondo" :improvisador="improvisadorIzq" :nJugador="nJugadorIzq" id="nIzq"></nombre>
      </transition>
  
      <transition name="nombreDer">
        <nombre :pos="false" :equipo="equipoDer.data.fondo" :improvisador="improvisadorDer" :nJugador="nJugadorDer" id="nDer"></nombre>
      </transition>
  
      <transition name="nombreIzq">
        <nombre :pos="true" equipo="lliga" :improvisador="personaIzq" :nJugador="perIzq" id="pIzq"></nombre>
      </transition>
  
      <transition name="nombreDer">
        <nombre :pos="false" equipo="lliga" :improvisador="personaDer" :nJugador="perDer" id="pDer"></nombre>
      </transition>

      <transition name="statsIzq">
        <stats :pos="true" :improvisador="improvisadorIzq" :stats="statsIzq" id="estadisticasIzq" :configStar="configStar" :rating="ratingLeft" :configRadar="configRadar" :dataset="datasetIzq"></stats>
      </transition>

      <transition name="statsDer">
        <stats :pos="false" :improvisador="improvisadorDer" :stats="statsDer" id="estadisticasDer" :configStar="configStar" :rating="ratingRight" :configRadar="configRadar" :dataset="datasetDer"></stats>
      </transition>
  
      <transition name="tarjeta">
        <clasificacion :clasificacion="clasificacion" :equipos="clasi" ></clasificacion>
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
                    <p class="mr-2 uppercase "> {{ improvisador.name}} {{improvisador.apellidos.charAt(0) }}. </p>
                    <button @click="playerNameIzq(improvisador)" class="bg-slate-300 rounded p-2 mr-2">IN/OUT</button>
                    <button @click="statIzq(improvisador, true)" class="bg-slate-300 rounded p-2 mr-2">STATS IZQ</button>
                    <button @click="statDer(improvisador, true)" class="bg-slate-300 rounded p-2">STATS DER</button>
                  </div>
                </div>
                <div class="flexjustify-between flex-col w-1/2">
                  <p class="text-3xl">Jugadores Derecha</p>
                  <div v-for="improvisador in jugadoresDer" :key="improvisador.id" class="flex items-center">
                    <p class="mr-2 uppercase "> {{ improvisador.name}} {{improvisador.apellidos.charAt(0) }}. </p>
                    <button @click="playerNameDer(improvisador)" class="bg-slate-300 rounded p-2 mr-2">IN/OUT</button>
                    <button @click="statIzq(improvisador, false)" class="bg-slate-300 rounded p-2 mr-2">STATS IZQ</button>
                    <button @click="statDer(improvisador, false)" class="bg-slate-300 rounded p-2">STATS DER</button>
                  </div>
                </div>
              </div>
              <!-- <div class="flex mt-4">
                <n-select class="w-40" v-model:value="alineacionIzq" multiple size="large" :options="jIzq"/>
                <button @click="showAlineacionIzq" class="botones">Alineacion</button>
                <n-select class="w-40" v-model:value="alineacionDer" multiple size="large" :options="jDer"/>
                <button @click="showAlineacionDer" class="botones">Alineacion</button>
              </div>
              <div class=" flex mt-4">
                <button @click="showStats" class="botones">Stats Equipos</button>
              </div> -->
  
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
  import { ref } from 'vue';
  import VueCountdown from '@chenfengyuan/vue-countdown';
  import {NSelect, NInput, NTabs, NTabPane} from 'naive-ui';
  import store from './store'
  import Marcador from './components/Marcador.vue';
  import Tarjeta from './components/Tarjeta.vue'
  import Nombre from './components/Nombre.vue'
  import Stats from './components/Stats.vue'
  import Clasificacion from './components/Clasificacion.vue'
  
  export default{
    components:{
      Marcador,
      Nombre,
      Tarjeta,
      Stats,
      Clasificacion,
      VueCountdown,
      NSelect,
      NInput,
      NTabs,
      NTabPane,
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
      const equipoIzq = ref({data:{}, puntos: 0, faltas: 0})
      const equipoDer = ref({data:{}, puntos: 0, faltas: 0})
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
        // {label:"Dreamteam", value: {id: 1, color: '#bd1722', fondo: 'dreamteam'}},
        // {label:"Aspaiet", value: {id:5, color:'#fad517',  fondo:'aspaiet'}},
        {label:"Emta", value: {id:2, color:'#02ad3a',  fondo:'emta'}},
        {label:"Improvsessio", value: {id:3, color:'#ee7004',  fondo:'improvsessio'}},
        {label:"Gladiadoras", value: {id:4, color:'#ff33b9',  fondo:'gladiadoras'}},
        {label:"Impropenosos", value: {id:6, color:'#1c70b7',  fondo:'impropenosos'}},
        {label:"Impracticos", value: {id:7, color:'#1c70b7',  fondo:'impracticos'}},
        {label:"Impronymous", value: {id:8, color:'#bd1722',  fondo:'impronymous'}},
  
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
    created(){
      for(let i = 0; i< store.state.impros.length; i++){
        this.impros.push({label: "IMPRO "+store.state.impros[i].id, value:store.state.impros[i]})
      }
    },
    methods:{
      swap(){
        let izq = this.equipoIzq
        let der = this.equipoDer
        this.equipoIzq = der
        this.equipoDer = izq
        // izq = this.jIzq
        // der = this.jDer
        // this.jIzq = der
        // this.jDer = izq
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
      getClasi(){
        this.clasi = store.state.clasificacion
        this.clasi = this.clasi.sort((a, b) => a.posicion - b.posicion);
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
        this.improvisadorIzq.edad = this.calcularEdad(improvisador.edad)
        let number =  parseFloat(improvisador.promedio)
        this.ratingLeft.rating = number
        let statsGlobal = store.state.estadisticas
        let statsPlayer = statsGlobal.find(s => s.jugador == improvisador.id)
        this.datasetIzq.series[0].values[0] = statsPlayer.tecnica;
        this.datasetIzq.series[1].values[0] = statsPlayer.dibujo;
        this.datasetIzq.series[2].values[0] = statsPlayer.originalidad;
        this.datasetIzq.series[3].values[0] = statsPlayer.comedia;
        this.datasetIzq.series[4].values[0] = statsPlayer.recursos;
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
        this.improvisadorDer.edad = this.calcularEdad(improvisador.edad)
        this.improvisadorDer.promedio = improvisador.promedio
        let number =  parseFloat(improvisador.promedio)
        this.ratingRight.rating = number
        let statsGlobal = store.state.estadisticas
        let statsPlayer = statsGlobal.find(s => s.jugador == improvisador.id)
        this.datasetDer.series[0].values[0] = statsPlayer.tecnica;
        this.datasetDer.series[1].values[0] = statsPlayer.dibujo;
        this.datasetDer.series[2].values[0] = statsPlayer.originalidad;
        this.datasetDer.series[3].values[0] = statsPlayer.comedia;
        this.datasetDer.series[4].values[0] = statsPlayer.recursos;
        setTimeout(function(){ 
          document.getElementById("estadisticasDer").style.opacity = 100
          document.getElementById("estadisticasDer").style.backgroundImage = `url('../../img/stats/${url}.png')`;
         }, 200);
        this.statsDer = !this.statsDer
      },
      calcularEdad(fechaNacimiento) {
        const hoy = new Date(); 
        const nacimiento = new Date(fechaNacimiento); 

        let edad = hoy.getFullYear() - nacimiento.getFullYear(); 
        const mes = hoy.getMonth() - nacimiento.getMonth(); 

        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }

        return edad;
      },

      async getImprovisadores(){
        let jugadores = store.state.jugadores
        this.jugadoresIzq = jugadores.filter(j => j.equipo == this.equipoIzq.data.id)
        this.jugadoresDer = jugadores.filter(j => j.equipo == this.equipoDer.data.id)
      },
      playerNameIzq(pos){
        debugger
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
  