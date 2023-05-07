<template>
    <div style = "display: flex; flex-direction: row;">
        <!-- ----------------------------- -->
        <div style = "display: flex; flex-direction: column; justify-content: space-around; 
        background-color: #d9d9d9; 
        width: 50vh; height: 100vh;; margin-left: -0.5vw; margin-top: -0.5vw;
        gap: 0.75rem; position: fixed;">
            <div class="logo-container1">
                <img class="logo1" src="../assets/LakbayLogo.png" alt="Lakbay Logo">
            </div>
            <div>
                <h4 style = "text-align: center; font-size: 1.4vw; margin: auto;">Dashboard</h4>
                <h3 style = "text-align: center; font-size: 1vw;">Administrator: {{ userProfile.user_firstname }} {{ userProfile.user_lastname }}</h3>

            </div>
            <div style = "display: flex; flex-direction: column; justify-content: column; gap: calc(100%/7);
                align-items: center;">

                <button class = "InterfaceButtons" v-on:click = "reDirectRegisterLoc" >Register Landmark</button>
                <button class = "InterfaceButtons" v-on:click = "reDirectManageLoc">Manage Landmarks</button>
                <button class = "InterfaceButtons" v-on:click = "reDirectBucketList">Lakbay Bucket List</button>
                <button class = "InterfaceButtons" v-on:click = "reDirectMaps" disabled>Maps</button>
                <button class = "InterfaceButtons" v-on:click = "reDirectManagers">Managers</button>
                <button class = "InterfaceButtons" v-on:click = "reDirectAdministrators">Administrators</button>
                <!-- <button class = "InterfaceButtons" v-on:click = "reDirectUsers">Users</button> -->

                <button class = "InterfaceButtonLogout" v-on:click = "Logout">Logout</button>
                
            </div>
        </div>

        <!-- ----------------------------- -->
        <div style = "display: flex; flex-direction: column; margin-left: 50vh;">
            <div class="logo-container2">
                <img class="logo2" src="../assets/LakbayLogo.png" alt="Lakbay Logo">
            </div>
            <!-- --------------------- Adding Map -->
            <h2 style="margin-left: 15vh;">Adding Map</h2>
            <div style = "display: flex; flex-direction: row; justify-content: space-around;">
                <div style = "display: flex; flex-direction: column;">
                    

                    <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">Map Location</h4>
                    <input class = "RegisterInputs" v-model = "mapLocation" 
                        type = "text" placeholder = "Map Location"/>
                    <h4 style = "font-size: 1.5vh; margin-top: -10px; font-style: italic; font-weight: 300;">
                        EX: Luneta Park</h4>

                    <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">Map Keywords</h4>
                    <input class = "RegisterInputs" v-model = "mapKeywords" 
                        type = "text" placeholder = "Map Keywords"/>
                    <h4 style = "font-size: 1.5vh; margin-top: -10px; font-style: italic; font-weight: 300;">
                        EX: Manila Ciy, Rizal Park</h4>

                    <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">
                        Map Image</h4>
                        <div class = "RegisterInputs" style="display: flex; justify-content: center; 
                            flex-direction: column; align-items: center;">
                            <input  type="file" @change="onFileSelected1" accept="image/*"/>
                        </div>
                </div>

                <div style = "display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    
                    <button class = "InterfaceButtonChild" @click="addMap" style = "align-self: center; width: fit-content;
                            padding: 2vh; margin-top: 3vh;">
                            Add Map</button>
                </div>
            </div>

            <h2 style="margin-left: 15vh;  margin-top: 10vh;">Maps</h2>
            <div style = "display: flex; flex-direction: row; justify-content: center; align-items: center; margin-top: 2vh;">
                <input class = "searchLocationsInput"  v-model = "searchInput" type = "text" placeholder = "Search maps"/>
				<button class = "searchButton" @click="searchMap(searchInput)">
					<img style = "cursor: pointer; width: 3vh; height: 3vh; display: block; margin: auto;" src="../assets/iconSearch.png" alt="">
				</button>
            </div>
            
            <div style = "display: flex; flex-direction: row; padding: 5vh; flex-wrap: wrap;
                justify-content: center; margin-top: 5vh;">
                
                <button v-for="map in maps" :key="map.map_id" class="landmarkCard" 
                >
                    <h4 class="landmarkcardheader">
                        {{map.map_location}}
                    </h4>
                    <p class = "LandmarkUD"  style = "background-color: #e85f5fd5; width: 10vh; height: 2vh; border-radius: 0.5vh; 
                        padding: 0.5vh; cursor: pointer;"
                    @click = "deletingMap(map)">DELETE</p>
                </button>

                
            </div>

        </div>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'
import axios from 'axios'

export default {
    data(){
        return{

            maps: [],
            map: null,
            mapLocation: null,
            mapKeywords: null,

            searchInput: null,


            deletemapid: null,
        }
    },
    mounted(){
        axios.get('http://localhost:7000/maps/allview')
            .then((response) => {
                this.maps = response.data;
                console.log(this.maps);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        onFileSelected1(event) {
            this.map= event.target.files[0];
        },
        

        addMap(){
            if (this.mapLocation === null || this.mapKeywords === 1) {
                
                console.log('Some fields are empty')
            }
           else{
                
                const formData = new FormData();
                formData.append('maplocation', this.mapLocation);
                formData.append('mapkeywords', this.mapKeywords);
                formData.append('mapimagesrc', this.map);

                axios.post('http://localhost:7000/maps/adding', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    console.log(response);
                    location.reload()
                })
                .catch(error => {
                    console.log(error);
                });
            }

        },
        searchMap(searchInput){
				if (searchInput.length > 0){
					axios.post('http://localhost:7000/maps/search/keywords', {keywords: this.searchInput})
					.then((response) => {
						console.log(this.searchInput)
						this.maps = response.data
						console.log(this.maps)
                        
					})
					.catch((error) => {
						console.error(error);
						this.error = 'Failed to fetch maps.';
					});
				} else {
					axios.get('http://localhost:7000/maps/allview')
					.then((response) => {
						this.maps = response.data
						console.log(this.maps)
					})
					.catch((error) => {
						console.error(error);
						this.error = 'Failed to fetch maps.';
					});
				}
		},
        deletingMap(map){

            this.deletemapid = map.map_id
            console.log(map.map_location)
            axios.post('http://localhost:7000/maps/deleting/map', {mapid: this.deletemapid})
                .then((response) => {
                    console.log(response)
                    location.reload()
                })
                .catch((error) => {
                    console.error(error);
                    this.error = 'Failed to fetch maps.';
                });
        },
        






        reDirectRegisterLoc(){
            this.$router.push({name: 'adminregisterlocation'})
        },
        reDirectManageLoc(){
            this.$router.push({name: 'adminmanagelocation'})
        },
        reDirectBucketList(){
            this.$router.push({name: 'adminbucketlist'})
        },
        reDirectMaps(){
            this.$router.push({name: 'adminmaps'})
        },
        reDirectManagers(){
            this.$router.push({name: 'adminmanagers'})
        },
        reDirectAdministrators(){
            this.$router.push({name: 'adminadministrators'})
        },
        reDirectUsers(){
            this.$router.push({name: 'adminusers'})
        },
        Logout(){
            
        }


    }
}
</script>

<style scoped>

    .logo-container1 {
        max-width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .logo1 {
        width: 50%;
        margin-top: 1vh;
    }
    .logo-container2 {

        max-width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;

    }
    .logo2 {
        width: 10%;


    }

    .InterfaceButtons {
        border: none;
        width: 15vw;
        height: 6.5vh;
        border-radius: 1.4vh;
        margin-top: 2vh;
        background-color: #c4c4c4;
        padding: 2.5px;
        cursor: pointer;

        text-align: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: calc(0.5em + 4vw);
        line-height: 1;
        font-size: 1vw;
    }
    .InterfaceButtonLogout {
        border: none;
        width: 6vw;
        height: 5vh;
        border-radius: 1vh;
        margin-top: 3vh;
        margin-bottom: 3vh;
        background-color: #c4c4c4;
        padding: 2.5px;
        cursor: pointer;

        text-align: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 1vh;
        line-height: 1;
        font-size: 1vw;
    }

    .RegisterInputs{
        border: none;
        border-radius: 0.75vw;
        width: 40vh;
        height: 40px;
        padding-left: 20px;
        display: block;
        margin-bottom: 20px;
        color: #ffffff;
        background-color: #3C3C3C;
    }
    .InterfaceButtonChild {
        border: none;
        border-radius: 1vh;
        background-color: #c4c4c4;
        cursor: pointer;

        text-align: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        font-size: 1vw;
    }
    .InterfaceButtons:active, .InterfaceButtonLogout:active,
    .InterfaceButtonChild:active{
        background-color: #3c3c3c;
    }

    .searchLocationsInput{
        border: none;
        border-radius: 0.75vw;
        width: 70%;
        height: 5vh;
        text-align: center;
        align-self: center;

        color: #ffffff;
        background-color: #3C3C3C;
    }
	.searchButton{
        margin-left: 2vw; 
        width: 5.5vh; 
        height: 5.5vh;
        border: none;
        border-radius: 0.5vw;
        background-color: #c4c4c4;
    }
    .landmarkCard{
        display: flex; 
        flex-direction: column; 
        justify-content: space-evenly;
        width: 30vh; 
        height: 15vh; 
        background-color: #c4c4c4; 
        border: none;
        border-radius: 2vh; 
        padding: 2vh; 
        text-align: center; 
        margin: 1vh; 
        cursor: default;
    }
    .landmarkcardheader{
        font-size: calc(inherit + 8vh); 
    }


</style>

