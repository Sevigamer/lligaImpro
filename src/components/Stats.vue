<template>
    <div  v-if="stats" class="w-[538px] h-[697px] absolute top-[50px] flex flex-col opacity-0" :class="pos ? 'left-[118px]':'left-[1265px]'">
        <div class="h-[114px] w-full uppercase flex items-center justify-center">
            <div class="text-white Anton" :class="(improvisador.name.length + improvisador.apellidos.length)> 15 ? 'text-6xl': 'text-7xl'">
                {{ improvisador.name + " " + improvisador.apellidos }}
            </div>
        </div>
        <div class="">
            <div class="Anton flex flex-col mr-4 ml-4 text-5xl text-white uppercase">
                <div class="flex justify-between mt-4">
                    <p>ORIGEN:</p>
                    <p>{{ improvisador.pueblo }}</p>
                </div>
                <div class="flex justify-between mt-4">
                    <p>EDAD:</p>
                    <p>{{ improvisador.edad }}</p>
                </div>
                <div class="flex justify-between mt-4">
                    <p>DEBUT:</p>
                    <p>{{ improvisador.debut }}</p>
                </div>
                <div class="flex justify-between mt-4">
                    <p>PROMEDIO:</p>
                    <p><VueUiRating :config="configStar" :dataset="rating"/></p>
                </div>
            </div>
            <div class="Anton">
                <VueUiRadar :config="configRadar" :dataset="dataset"/>
            </div>
        </div>
    </div>
</template>

<script>
import {VueUiRadar, VueUiRating} from "vue-data-ui"

export default {
    components:{
        VueUiRating, VueUiRadar
    },
    props: {
        improvisador: Object,
        configStar: Object,
        configRadar: Object,
        rating: Object,
        dataset: Object,
        stats: Boolean,
        pos: Boolean
    }
}
</script>

<style>

</style>