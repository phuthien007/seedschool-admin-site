<script>
import { Pie } from "vue-chartjs";
import {
    HTTP
} from '../../api/index'
export default {
  extends: Pie,
  data(){
    return{
      data :[]
    }
  },
  async mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");
    try {
      let resp = await HTTP.get('student_statistics_by_age')
    if (resp.status == 200) {
            const obj = resp.data
            for (let index = 0; index < obj.length; index += 1) {
                this.data.push(obj[index].quantily)
            }
        }
    } catch (error) {
      if (error.message == "Request failed with status code 403") {
                    window.localStorage.removeItem("token")
                    window.location.reload()
                } else {
                    console.log(error)
                }
    }
    this.renderChart(
      {
        labels: ["3 tháng tuổi đến 12 tháng tuổi", "13 tháng tuổi đến 24 tháng tuổi", "25 tháng tuổi đến 36 tháng tuổi",'3 tuổi đến 4 tuổi','4 tuổi đến 5 tuổi','5 tuổi đến 6 tuổi'],
        datasets: [
          {
            backgroundColor: ['#B12BCD', this.gradient2, "#00D8FF", '#46B94A','#BD1D40','#1D38BD'],
            data: this.data
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false ,
        title: {
          display: true,
          text: "Thống kê học sinh theo tuổi"
        }}
    );
  }
};
</script>