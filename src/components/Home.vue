<template>
    <div class="main">
        <div class="top">
            <div class="container">
                <div class="top-inner">
                    <span style="color: #000000; font-style: italic;">{{ email }}</span>
                    <button class="logout-btn" v-on:click="logout()">Logout</button>
                </div>
            </div>
        </div>

        <div class="landing">
            <h1>ENVIRONMENT MONITORING SYSTEM</h1>
            <p style="color: #FFFF00;">Using internet-of-things (IoT)</p>
        </div>

        <div class="main">
            <h4 class="">A web application that enables you to view environment data captured by the hardware-based system situated at a remote place. You can view all captured data or select data for a particular date.</h4>

            <div class="main-inner">
                <div class="form-div">
                    <input type="date" class="id-field" v-model="date" title="Select date">
                    <button class="btn-primary get-data-btn" v-on:click="getEnvironmentDataByDate()">Get data</button>
                    <div>
                        <button class="btn-primary get-all-data-btn" v-on:click="getAllEnvironmentData()">Get all data</button>
                    </div>
                </div>
            </div>

            <div class="container">
                <div v-if="retrievedOneData == true">
                    <div>
                        <h3 style="text-align: center; margin-top: 10px;">Below are the captured data of the environment for the specified date</h3>
                    </div>

                    <div style="overflow-x: auto;">
                        <table>
                            <thead>
                                <th>S/N</th>
                                <th>Temperature</th>
                                <th>Humidity</th>
                                <th>Gas Concentration</th>
                                <th>Particulate Matter</th>
                                <th>Location</th>
                                <th>Capture Date</th>
                                <th>Capture Time</th>
                            </thead>
                            <tbody>
                                <tr v-for="(allEnvironmentDatum, index) in allEnvironmentDataByDate" :key="index">
                                    <td> {{ index }} </td>
                                    <td> {{ allEnvironmentDatum.temperature }} </td>
                                    <td> {{ allEnvironmentDatum.humidity }} </td>
                                    <td> {{ allEnvironmentDatum.gasConcentration }} </td>
                                    <td> PM2.5: {{ allEnvironmentDatum.particulateMatter.pm25 }}, PM10: {{ allEnvironmentDatum.particulateMatter.pm10 }}</td>
                                    <td> Lat: {{ allEnvironmentDatum.location.latitude }}, Long: {{ allEnvironmentDatum.location.longitude }}</td>
                                    <td> {{ allEnvironmentDatum.date }} </td>
                                    <td> {{ allEnvironmentDatum.time }} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div v-else-if="retrievedOneData == false">
                    <div>
                        <h3 style="text-align: center; margin-top: 10px;">Below are the captured environment data of all dates</h3>
                    </div>

                    <div style="overflow-x: auto;">
                        <table>
                            <thead>
                                <th>S/N</th>
                                <th>Temperature</th>
                                <th>Humidity</th>
                                <th>Gas Concentration</th>
                                <th>Particulate Matter</th>
                                <th>Location</th>
                                <th>Capture Date</th>
                                <th>Capture Time</th>
                            </thead>
                            <tbody>
                                <tr v-for="(allEnvironmentDatum, index) in allEnvironmentData" :key="index">
                                    <td> {{ index }} </td>
                                    <td> {{ allEnvironmentDatum.temperature }} </td>
                                    <td> {{ allEnvironmentDatum.humidity }} </td>
                                    <td> {{ allEnvironmentDatum.gasConcentration }} </td>
                                    <td> PM2.5: {{ allEnvironmentDatum.particulateMatter.pm25 }}, PM10: {{ allEnvironmentDatum.particulateMatter.pm10 }}</td>
                                    <td> Lat: {{ allEnvironmentDatum.location.latitude }}, Long: {{ allEnvironmentDatum.location.longitude }}</td>
                                    <td> {{ allEnvironmentDatum.date }} </td>
                                    <td> {{ allEnvironmentDatum.time }} </td>
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
    import axios from 'axios';

    export default {
        name: 'Home',

        data(){
            return {
                email: 'environsadmin@gmail.com',
                date: '',
                allEnvironmentDataByDate: [],
                allEnvironmentData: [],
                retrievedOneData: null
            }
        },

        methods: {
            getEnvironmentDataByDate: function(){
                this.retrievedOneData = null;

                if(this.date.length > 0){
                    axios.get('https://iot-air-quality-backend.herokuapp.com/api/v1/environment-properties')
                        .then(response => {
                            this.retrievedOneData = true;
                            this.allEnvironmentData = response.data.data;

                            this.allEnvironmentDataByDate = this.allEnvironmentData
                                .filter(allEnvironmentDatum => allEnvironmentDatum.date === (new Date(this.date)).toLocaleDateString());

                            if(this.allEnvironmentDataByDate.length == 0){
                                alert("There are no captured data for this date");
                            }
                        })
                        .catch(e => {
                            alert(e);
                        })
                }else{
                    alert('Please, select date.');
                }
            },

            getAllEnvironmentData: function(){
                this.retrievedOneData = null;

                axios.get('https://iot-air-quality-backend.herokuapp.com/api/v1/environment-properties')
                    .then(response => {
                        this.retrievedOneData = false;
                        this.allEnvironmentData = response.data.data;

                        if(this.allEnvironmentData.length == 0){
                            alert("There are no captured data");
                        }
                    })
                    .catch(e => {
                        alert(e)
                    })
            },

            logout: function(){
                try{
                    localStorage.removeItem("IsEnvironsAdminLoggedIn");
                }catch(e){
                    // DO NOTHING
                }
                
                window.location.href = '/';
            }
        }
    }
</script>

<style scoped>
    *{
        box-sizing: border-box;
    }

    .container{
        width: 90%;
        height: 100%;
        margin: auto;
    }

    .top{
        width: 100%;
        height: 80px;
        background-color: #EEEEEE;
    }

    .btn-primary{
        background-color: #1f1b41;
        color: #FFFFFF;
        border: none;
    }

    .top-inner{
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .logout-btn{
        background-color: rgb(158, 35, 35);
        color: #FFFFFF;
        padding: 8px 18px;
        margin-left:10px;
        border-radius: 10px;
        border: 1px solid #FFFFFF;
    }

    .landing{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #FFFFFF;
        flex-flow: column;
        line-height: 0.2em;

        width: 100%;
        height: 350px;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.75) 25.62%, rgba(0, 0, 0, 0.75) 100%), url('~@/assets/img/industry.jpeg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover
    }

    .landing p{
        letter-spacing: 0.2em;
    }

    .landing button{
        margin-top: 25px;
        border-radius: 10px;
        padding: 15px 35px;
        background-color: #1b4125;
        color: #FFFFFF;
        border: 0.5px solid #FFFFFF;
    }

    .main h4{
        padding: 15px;
        color: #555555;
        width: 70%;
        margin: auto;
        text-align: center;
    }

    .form-div{
        width: 50%;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #CCCCCC;
        border-radius: 10px;
    }

    .form-div input,  .form-div button{
        height: 40px;
        margin-top: 8px;
    }

    .form-div .id-field{
        width: 69%;
        float: left;
        padding: 10px;
    }

    .form-div .get-data-btn{
        width: 30%;
        float: right;
    }

    .form-div .get-all-data-btn{
        width: 100%;
    }

    table{
        width: 90%;
        margin: 20px auto;
    }

    table, th, tr, td{
        border: 1px solid #444444;
        border-collapse: collapse;
    }

    table thead th{
        background: #555555;
        color: #FFFFFF;
        border: 1px solid #FFFFFF;
    }

    th, td{
        padding: 8px;
    }

    @media screen and (max-width: 450px){
        .landing h1, .landing p{
            font-size: 1em;
        }

        .landing p{
            letter-spacing: normal;
        }
        .main h4{
            width: 90%;
        }

        .form-div{
            width: 90%;
        }
    }

</style>