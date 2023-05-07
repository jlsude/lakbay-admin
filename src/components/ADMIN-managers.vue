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
                <button class = "InterfaceButtons" v-on:click = "reDirectMaps">Maps</button>
                <button class = "InterfaceButtons" v-on:click = "reDirectManagers" disabled>Managers</button>
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
            <!-- --------------------- Register Manager -->
            <h2 style="margin-left: 15vh;">Register Manager</h2>
            <div style = "display: flex; flex-direction: row; justify-content: space-around;">
                <div style = "display: flex; flex-direction: column;">
                    

                    <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">First Name:</h4>
                    <input class = "RegisterInputs" v-model = "managerinfo.firstname" 
                        type = "text" placeholder = "First Name"/>
                    <h4 style = "font-size: 1.5vh; margin-top: -10px; font-style: italic; font-weight: 300;">
                        EX: Saul</h4>

                    <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">Last Name:</h4>
                    <input class = "RegisterInputs" v-model = "managerinfo.lastname" 
                        type = "text" placeholder = "Last Name"/>
                    <h4 style = "font-size: 1.5vh; margin-top: -10px; font-style: italic; font-weight: 300;">
                        EX: Goodman</h4>

                    <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">Email:</h4>
                    <input class = "RegisterInputs" v-model = "managerinfo.email" 
                        type = "text" placeholder = "Email"/>
                    <h4 style = "font-size: 1.5vh; margin-top: -10px; font-style: italic; font-weight: 300;">
                        EX: saulgoodman@gmail.com</h4>

                    <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">Password: </h4>
                    <input class = "RegisterInputs" v-model = "managerinfo.password" 
                        type = "text" placeholder = "Password"/>
                    <h4 style = "font-size: 1.5vh; margin-top: -10px; font-style: italic; font-weight: 300;">
                        EX: thereisnopassword</h4>

                        <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">Jurisdiction: </h4>
                    <input class = "RegisterInputs" v-model = "managerinfo.jurisdiction" 
                        type = "text" placeholder = "Jurisdiction"/>
                    <h4 style = "font-size: 1.5vh; margin-top: -10px; font-style: italic; font-weight: 300;">
                        EX: Manila City</h4>
                </div>

                <div style = "display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    
                    <button class = "InterfaceButtonChild" @click="register" style = "align-self: center; width: fit-content;
                            padding: 2vh; margin-top: 3vh;">
                            Register Manager</button>
                </div>
            </div>

            <h2 style="margin-left: 15vh;  margin-top: 10vh;">Managers</h2>
            <div style = "display: flex; flex-direction: row; justify-content: center; align-items: center; margin-top: 2vh;">
                <input class = "searchLocationsInput"  v-model = "searchInput" type = "text" placeholder = "Search managers by JURISDICTION"/>
				<button class = "searchButton" @click="searchMap(searchInput)">
					<img style = "cursor: pointer; width: 3vh; height: 3vh; display: block; margin: auto;" src="../assets/iconSearch.png" alt="">
				</button>
            </div>
            
            <div style = "display: flex; flex-direction: row; padding: 5vh; flex-wrap: wrap;
                justify-content: center; margin-top: 5vh;">
                
                <button v-for="manager in managers" :key="manager.user_id" class="landmarkCard" 
                >
                    <h4 class="landmarkcardheader">
                        {{manager.user_firstname}} {{manager.user_lastname}}
                    </h4>
                    <h4 class="landmarkcardheader">
                        Jurisdiction: {{manager.user_city}}
                    </h4>
                    <p class = "LandmarkUD"  style = "background-color: #e85f5fd5; width: 10vh; height: 2vh; border-radius: 0.5vh; 
                        padding: 0.5vh; cursor: pointer;"
                    @click = "deletingMap(manager)">DELETE</p>
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

            managers:[],
            managerinfo: {
                firstname: null,
                lastname: null,

                email: null,
                password: null,
                jurisdiction: null,
                role: 'MANAGER'
            },

            searchInput: null,
            deleteManager: null,

            userProfile: [],
            authToken: null,
        }
    },
    mounted(){
        axios.get('http://localhost:7000/Manage/get/all/manager')
            .then((response) => {
                this.managers = response.data
                console.log(this.managers)
            })
            .catch((error) => {
                console.error(error);
                this.error = 'Failed to fetch maps.';
            });
        let userToken = Cookies.get('auth_token');
			if (userToken) {
				axios.get(`http://localhost:7000/home/u/userprofile`, {
				headers: {
					Authorization: `Bearer ${userToken}`
				}
				})
				.then((response) => {
				this.userProfile = response.data[0];
				})
				.catch(error => {
				if (error.response && error.response.status === 401) {
					// Token has expired
					alert('Your session has expired. Please login again.');
					console.log('Session expired, signing out')
					Cookies.remove('auth_token'); 
					this.$router.push({name: 'adminlogin'});
				} else {
					console.log(error);
				}
				});
			} 
			else {
				console.log('clearing cookie')
                Cookies.remove('auth_token'); 
                this.authToken = ''
				this.$router.push({name: 'adminlogin'});
			};
    },
    methods: {
        register(){
            if(this.managerinfo.email !== null &&
                this.managerinfo.firstname !== null &&
                this.managerinfo.lastname !== null &&
                this.managerinfo.password !== null &&
                this.managerinfo.jurisdiction !== null){

                axios.post('http://localhost:7000/Manage/register/manager', {
                    useremail: this.managerinfo.email,
                    userpassword: this.managerinfo.password,
                    userfirstname: this.managerinfo.firstname,
                    userlastname: this.managerinfo.lastname,
                    userbirthdate: null,
                    usercity:   this.managerinfo.jurisdiction,
                    userrole:   this.managerinfo.role
                })
                .then((response) => {
                    console.log(response);
                    location.reload()
                })
                .catch(error => {
                    console.log(error)
                });
                
                
            }
            else{
                console.log("Input error. Please, check your inputs.")
            }
        },


        searchMap(searchInput){
				if (searchInput.length > 0){
					axios.post('http://localhost:7000/Manage/search/manager', {keywords: this.searchInput})
					.then((response) => {
						console.log(this.searchInput)
						this.managers = response.data
						console.log(this.managers)
                        
					})
					.catch((error) => {
						console.error(error);
						this.error = 'Failed to fetch maps.';
					});
				} else {
					axios.get('http://localhost:7000/Manage/get/all/manager')
					.then((response) => {
						this.managers = response.data
						console.log(this.managers)
					})
					.catch((error) => {
						console.error(error);
						this.error = 'Failed to fetch managers.';
					});
				}
		},
        deletingMap(manager){

            this.deleteManager = manager.user_id
            console.log(manager.user_id)
            axios.post('http://localhost:7000/Manage/delete/manager', {user_id: this.deleteManager})
                .then((response) => {
                    console.log(response)
                    location.reload()
                })
                .catch((error) => {
                    console.error(error);
                    this.error = 'Failed to fetch maps.';
                });
                // 
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
            console.log('deleting cookie')
            Cookies.remove('auth_token'); 
            this.authToken = ''
            this.$router.push({name: 'adminlogin'});
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
        flex-wrap: nowrap;
        flex-direction: column; 
        justify-content: flex-start;
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
        font-size: calc(10px + 0.5vh);
        margin-top: 0.5vh; 
        margin-bottom: 0.5vh; 
        

    }


</style>

