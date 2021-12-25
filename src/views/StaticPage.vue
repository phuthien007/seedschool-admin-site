<template>
<div id="static-page">

    <!-- <v-card elevation="3"> -->
    <StatisticUser :data="data" class="ml-2" />
    <!-- </v-card> -->
    <v-card elevation="5" class="mt-2 ml-4 mr-2" min-width="250">
        <v-row>
            <v-col>
                <AreaChart :data ="dataLine" />
            </v-col>
            <v-col>
                <PieChart />
            </v-col>

            <v-col>
                <BarChart />
            </v-col>
            <v-col>
                <LineChart />
            </v-col>

        </v-row>

    </v-card>

</div>
</template>

<script>
import StatisticUser from '@/components/cards/StatisticUser'
import AreaChart from "../components/charts/AreaChart.vue";
import PieChart from "../components/charts/PieChart.vue";
import BarChart from "../components/charts/BarChart.vue";
import LineChart from "../components/charts/LineChart.vue"
import {HTTP} from '../api/index'
export default {
    components: {
        StatisticUser,
        AreaChart,
        PieChart,
        BarChart,
        LineChart
    },
    data() {
        return {
            data:[],
            dataLine:[[], []]
        };
    },
    mounted: async function(){
        var resp = await HTTP.get('account/count')
        if (resp.status == 200){
            this.data.push(resp.data)
        } else{
            this.data.push(0)
        }

        resp = await HTTP.get('teacher/count')
        if (resp.status == 200){
            this.data.push(resp.data)
        } else{
            this.data.push(0)
        }

        resp = await HTTP.get('student/count')
        if (resp.status == 200){
            this.data.push(resp.data)
        } else{
            this.data.push(0)
        }

        this.data.push(10)
        
        resp = await HTTP.get('statistic_student_absent')
        if (resp.status == 200) {
            const obj = resp.data
            obj.sort((a, b) => {
                return a['month'] - b['month'];
            });
            for (let index = 0; index < obj.length; index += 1) {
                this.dataLine[0].push(obj[index].quantily)
                this.dataLine[1].push( this.data[2] -  obj[index].quantily)
            }
        }


    }
}
</script>

<style scoped>
#static-page {
    margin: 0;
    padding: 0;
}

* {
    box-sizing: border-box;
}
</style>
