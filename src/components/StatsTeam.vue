<template>
    <div>
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
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>