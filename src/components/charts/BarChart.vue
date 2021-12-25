<script>
import {
    Bar
} from "vue-chartjs";
import {
    HTTP
} from '../../api/index'

export default {
    extends: Bar,
    data() {
        return {
            data : [0]
        }
    },
    async mounted() {
        let resp = await HTTP.get('student_enrollment_statistics')
        if (resp.status == 200) {
            const obj = resp.data
            obj.sort((a, b) => {
                return a['month'] - b['month'];
            });
            for (let index = 0; index < obj.length; index += 1) {
                this.data.push(obj[index].quantily)
            }
        }

        this.renderChart({
            labels: ["",
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ],
            datasets: [{
                label: "Học sinh nhập học trong tháng",
                backgroundColor: "#f87979",
                data: this.data
            }]
        }, {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: "Số học sinh nhập học mới theo tháng"
            }
        });
    }
};
</script>
