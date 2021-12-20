<template>
<div>
    <v-container class="px-auto">
        <v-row class="mt-2 mx-auto">
            <!-- <v-card elevation="3"> -->
                <StatisticUser />
            <!-- </v-card> -->

        </v-row>
        <v-row class=" mt-2 mx-auto">
            <v-row class="mt-3 ml-4">
                <v-card>
                    <v-col>
                        <AreaChart />
                    </v-col>
                    <v-col>
                        <PieChart />
                    </v-col>

                </v-card>

            </v-row>
            <v-row>
                <v-card>
                    <v-col>
                        <BarChart />
                    </v-col>
                    <v-col>
                        <LineChart />
                    </v-col>

                </v-card>

            </v-row>
        </v-row>

    </v-container>

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
