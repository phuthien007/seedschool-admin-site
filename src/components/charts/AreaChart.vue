<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  data() {
    return {
      gradient: null,
      gradient2: null
      
    };
  },
  
  props:{
    data:Array
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 400);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 400);

    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");

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
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        datasets: [
          {
            label: "Học sinh nghỉ",
            borderColor: "#FC2525",
            pointBackgroundColor: "red",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data: this.data[0]
          },
          {
            label: "Học sinh đi học",
            borderColor: "#05CBE1",
            pointBackgroundColor: "blue",
            pointBorderColor: "aqua",
            borderWidth: 1,
            backgroundColor: this.gradient2,
            data: this.data[1]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false,aspectRatio:2,
        title: {
          display: true,
          text: "Thống kê tình trạng đi học của học sinh"
        } }
    );
  }
};
</script>
