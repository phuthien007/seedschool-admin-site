<template>
<div id="static-page">

    <!-- <v-card elevation="3"> -->
    <StatisticUser class="ml-2" />
    <!-- </v-card> -->
    <v-card elevation="5" class="mt-2 ml-4 mr-2" min-width="250">
       <v-row>
<v-col>
                <AreaChart />
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
            chartData: {
                Books: 24,
                Magazine: 30,
                Newspapers: 10
            }
        };
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
