<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  mounted() {
    this.renderChart(
      {
        labels: [
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
        datasets: [
          {
            label: "Học sinh nhập học trong tháng",
            backgroundColor: "#f87979",
            data: [5,1,0,0,0,0,12,2,10,20,13,10]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false,
        title: {
          display: true,
          text: "Số học sinh nhập học mới theo tháng"
        } }
    );
  }
};
</script>
