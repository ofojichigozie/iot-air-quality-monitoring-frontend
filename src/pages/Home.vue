<template>
  <div class="main">
    <div class="top">
      <div class="container">
        <div class="top-inner">
          <span style="color: #000000; font-style: italic">{{ email }}</span>
          <button class="logout-btn" v-on:click="logout()">Logout</button>
        </div>
      </div>
    </div>

    <div class="landing">
      <h1>ENVIRONMENT MONITORING SYSTEM</h1>
      <p style="color: #ffff00">Using internet-of-things (IoT)</p>
    </div>

    <div class="main">
      <h4 class="">
        A web application that enables you to view environment data captured by
        the hardware-based system situated at a remote place. You can view all
        captured data or select data for a particular date.
      </h4>

      <div class="main-inner">
        <div class="form-div">
          <input
            type="date"
            class="id-field"
            v-model="date"
            title="Select date"
          />
          <button
            class="btn-primary get-data-btn"
            :style="loading ? 'background-color: grey; cursor: none;' : ''"
            :disabled="loading"
            v-on:click="getEnvironmentDataByDate()"
          >
            {{ getDataButtonText }}
          </button>
          <div>
            <button
              class="btn-primary get-all-data-btn"
              :style="loading ? 'background-color: grey; cursor: none;' : ''"
              :disabled="loading"
              v-on:click="getAllEnvironmentData()"
            >
              {{ getAllDataButtonText }}
            </button>
          </div>
        </div>
      </div>

      <div class="container">
        <div v-if="isAllData == true || isAllData == false">
          <div>
            <h3 style="text-align: center; margin-top: 10px">
              {{ tagLine }}
            </h3>
          </div>

          <div style="overflow-x: auto">
            <table>
              <thead>
                <th>S/N</th>
                <th>Temperature</th>
                <th>Humidity</th>
                <th>Gas Concentrations</th>
                <th>Particulate Matter</th>
                <th>Location</th>
                <th>Capture Date</th>
                <th>Capture Time</th>
              </thead>
              <tbody>
                <tr
                  v-for="(environmentDatum, index) in environmentData"
                  :key="index"
                >
                  <td>{{ index + 1 }}</td>
                  <td>{{ environmentDatum.temperature }}</td>
                  <td>{{ environmentDatum.humidity }}</td>
                  <td v-if="email === 'admin01@gmail.com'">
                    Carbon-dioxide: {{ environmentDatum.gasConcentration.mq3 }}
                    <br />
                    Methane: {{ environmentDatum.gasConcentration.mq5 }} <br />
                    Natural Gas: {{ environmentDatum.gasConcentration.mq5e }}
                    <br />
                    Butane: {{ environmentDatum.gasConcentration.mq6 }} <br />
                    Smoke: {{ environmentDatum.gasConcentration.mq7 }} <br />
                    Carbon-monoxide: {{ environmentDatum.gasConcentration.mq9 }}
                  </td>
                  <td v-else-if="email === 'admin02@gmail.com'">
                    Butane: {{ environmentDatum.gasConcentration.mq2 }} <br />
                    Methane: {{ environmentDatum.gasConcentration.mq4 }} <br />
                    Hydrogen Gas: {{ environmentDatum.gasConcentration.mq8 }}
                    <br />
                    Flammable Gas: {{ environmentDatum.gasConcentration.mq9 }}
                    <br />
                    Ammonia: {{ environmentDatum.gasConcentration.mq135 }}
                    <br />
                    Hydrogen Sulphide Gas:
                    {{ environmentDatum.gasConcentration.mq136 }}
                  </td>
                  <td>
                    PM2.5: {{ environmentDatum.particulateMatter.pm25 }} <br />
                    PM10: {{ environmentDatum.particulateMatter.pm10 }}
                  </td>
                  <td>
                    Lat: {{ environmentDatum.location.latitude }} <br />
                    Long: {{ environmentDatum.location.longitude }}
                  </td>
                  <td>{{ environmentDatum.date }}</td>
                  <td>{{ environmentDatum.time }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import environmentDataO1 from "src/db/environmentDataO1.json";
import environmentDataO2 from "src/db/environmentDataO2.json";

export default {
  name: "Home",

  data() {
    return {
      email: "",
      date: "",
      tagLine: "",
      getDataButtonText: "Get data",
      getAllDataButtonText: "Get all data",
      loading: false,
      environmentData: [],
      isAllData: null,
    };
  },

  methods: {
    getEnvironmentDataByDate: function () {
      this.isAllData = null;
      this.loading = true;
      this.getDataButtonText = "Loading";
      

      if (this.date.length > 0) {
        this.isAllData = false;
        this.environmentData = this.getEnvironmentData();

        this.environmentData = this.environmentData.filter(
          (environmentDatum) =>
            environmentDatum.date ===
            new Date(this.date).toLocaleDateString()
        );

        if (this.environmentData.length == 0) {
          alert("There are no captured data for this date");
        } else {
          this.tagLine =
            "Captured data of the environment for the specified date";
        }

        window.scrollBy(0, 300);
        this.loading = false;
        this.getDataButtonText = "Get data";
      } else {
        alert("Please, select date.");
      }
    },

    getAllEnvironmentData: function () {
      this.isAllData = null;
      this.loading = true;
      this.getAllDataButtonText = "Loading";

      this.isAllData = true;
      this.environmentData = this.getEnvironmentData();

      if (this.environmentData.length == 0) {
        alert("There are no captured data");
      } else {
        this.tagLine = "Captured environment data of all dates";
      }

      window.scrollBy(0, 300);
      this.loading = false;
      this.getAllDataButtonText = "Get all data";
    },

    logout: function () {
      try {
        localStorage.removeItem("user");
      } catch (e) {
        // DO NOTHING
      }

      window.location.href = "/";
    },

    getEnvironmentData: function () {
      const user = localStorage.getItem("user")
        ? localStorage.getItem("user")
        : "";

      if (user === "admin01@gmail.com") {
        return environmentDataO1;
      }

      if (user === "admin02@gmail.com") {
        return environmentDataO2;
      }

      return [];
    },
  },

  mounted() {
    this.email = localStorage.getItem("user")
      ? localStorage.getItem("user")
      : "";
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  width: 90%;
  height: 100%;
  margin: auto;
}

.top {
  width: 100%;
  height: 80px;
  background-color: #eeeeee;
}

.btn-primary {
  background-color: #1f1b41;
  color: #ffffff;
  border: none;
}

.btn-primary:hover {
  cursor: pointer;
}

.top-inner {
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.logout-btn {
  background-color: rgb(158, 35, 35);
  color: #ffffff;
  padding: 8px 18px;
  margin-left: 10px;
  border-radius: 10px;
  border: 1px solid #ffffff;
}

.logout-btn:hover {
  cursor: pointer;
}

.landing {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  flex-flow: column;
  text-align: center;

  width: 100%;
  height: 350px;
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.75) 25.62%,
      rgba(0, 0, 0, 0.75) 100%
    ),
    url("~@/assets/img/industry.jpeg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.landing h1 {
  margin-bottom: 0;
}

.landing p {
  letter-spacing: 0.2em;
}


.landing button {
  margin-top: 25px;
  border-radius: 10px;
  padding: 15px 35px;
  background-color: #1b4125;
  color: #ffffff;
  border: 0.5px solid #ffffff;
}

.main h4 {
  padding: 15px;
  color: #555555;
  width: 70%;
  margin: auto;
  text-align: center;
}

.form-div {
  width: 50%;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #cccccc;
  border-radius: 10px;
}

.form-div input,
.form-div button {
  height: 40px;
  margin-top: 8px;
}

.form-div .id-field {
  width: 69%;
  float: left;
  padding: 10px;
}

.form-div .get-data-btn {
  width: 30%;
  float: right;
}

.form-div .get-all-data-btn {
  width: 100%;
}

table {
  width: 90%;
  margin: 20px auto;
}

table,
th,
tr,
td {
  border: 1px solid #444444;
  border-collapse: collapse;
}

table thead th {
  background: #555555;
  color: #ffffff;
  border: 1px solid #ffffff;
}

th,
td {
  padding: 8px;
}

@media screen and (max-width: 750px) {
  .landing h1,
  .landing p {
    font-size: 1.3em;
  }

  .landing p {
    letter-spacing: normal;
  }
  .main h4 {
    width: 90%;
  }

  .form-div {
    width: 90%;
  }
}
</style>