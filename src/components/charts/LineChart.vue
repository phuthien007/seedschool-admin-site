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
            label: "Thu",
            data: [2, 10, 5, 9, 0, 6, 0],
            backgroundColor: "rgba(239, 59, 54, 0.7)",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "blue"
          },
          {
            label: "Chi",
            data: [10, 8, 4, 19, 10, 16, 20],
            backgroundColor: this.gradient2,
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "green"
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Thu chi theo tháng"
        }
      }
    );
  }
};
</script>