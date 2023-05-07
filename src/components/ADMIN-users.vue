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
                <button class = "InterfaceButtons" v-on:click = "reDirectManagers" >Managers</button>
                <button class = "InterfaceButtons" v-on:click = "reDirectAdministrators" >Administrators</button>
                <button class = "InterfaceButtons" v-on:click = "reDirectUsers" disabled>Users</button>

                <button class = "InterfaceButtonLogout" v-on:click = "Logout">Logout</button>
                
            </div>
        </div>

        <!-- ----------------------------- -->
        <div style = "display: flex; flex-direction: column; margin-left: 50vh;">
            <div class="logo-container2">
                <img class="logo2" src="../assets/LakbayLogo.png" alt="Lakbay Logo">
            </div>
            <!-- --------------------- Register Manager -->
           

            <h2 style="margin-left: 15vh;  margin-top: 10vh;">Users</h2>
            <div style = "display: flex; flex-direction: row; justify-content: center; align-items: center; margin-top: 2vh;">
                <input class = "searchLocationsInput"  v-model = "searchInput" type = "text" placeholder = "Search Admin"/>
				<button class = "searchButton" @click="searchMap(searchInput)">
					<img style = "cursor: pointer; width: 3vh; height: 3vh; display: block; margin: auto;" src="../assets/iconSearch.png" alt="">
				</button>
            </div>
            
            <div style = "display: flex; flex-direction: row; padding: 5vh; flex-wrap: wrap;
                justify-content: center; margin-top: 5vh;">
                
                <button v-for="admin in admins" :key="admin.user_id" class="landmarkCard" 
                >
                    <h4 class="landmarkcardheader">
                        {{admin.user_firstname}} {{admin.user_lastname}}
                    </h4>
                    <p class = "LandmarkUD"  style = "background-color: #e85f5fd5; width: 10vh; height: 2vh; border-radius: 0.5vh; 
                        padding: 0.5vh; cursor: pointer;"
                    @click = "deletingAdmin(admin)">DELETE</p>
                </button>

                
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{

            users: [],

            searchInput: null,
            deleteAdmin: null,
        }
    },
    mounted(){
        axios.get('http://localhost:7000/Manage/get/all/admin')
            .then((response) => {
                this.admins = response.data
                console.log(this.admins)
            })
            .catch((error) => {
                console.error(error);
                this.error = 'Failed to fetch admins.';
            });
    },
    methods: {
        register(){
            if(this.admininfo.email !== null &&
                this.admininfo.firstname !== null &&
                this.admininfo.lastname !== null &&
                this.admininfo.password !== null){

                axios.post('http://localhost:7000/Manage/register/admin', {
                    useremail: this.admininfo.email,
                    userpassword: this.admininfo.password,
                    userfirstname: this.admininfo.firstname,
                    userlastname: this.admininfo.lastname,
                    userbirthdate: null,
                    usercity:   null,
                    userrole:   this.admininfo.role
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
					axios.post('http://localhost:7000/Manage/search/admin', {keywords: this.searchInput})
					.then((response) => {
						console.log(this.searchInput)
						this.admins = response.data
						console.log(this.admins)
                        
					})
					.catch((error) => {
						console.error(error);
						this.error = 'Failed to fetch maps.';
					});
				} else {
					axios.get('http://localhost:7000/Manage/get/all/admin')
					.then((response) => {
						this.admins = response.data
						console.log(this.admins)
					})
					.catch((error) => {
						console.error(error);
						this.error = 'Failed to fetch admins.';
					});
				}
		},
        deletingAdmin(admin){

            this.deleteAdmin = admin.user_id
            console.log(admin.user_id)
            axios.post('http://localhost:7000/Manage/delete/admin', {user_id: this.deleteAdmin})
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

