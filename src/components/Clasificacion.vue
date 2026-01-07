<template>
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
                <tr class="py-1" v-for="equipo in equipos" :key="equipo">
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
</template>

<script>
export default {
    props: {
        equipos: Array,
        clasificacion: Boolean
    }
}
</script>

<style>

</style>