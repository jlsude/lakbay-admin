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
                <button class = "InterfaceButtons" v-on:click = "reDirectBucketList" disabled>Lakbay Bucket List</button>
                <button class = "InterfaceButtons" v-on:click = "reDirectMaps" >Maps</button>
                <button class = "InterfaceButtons" v-on:click = "reDirectManagers" >Managers</button>
                <button class = "InterfaceButtons" v-on:click = "reDirectAdministrators">Administrators</button>
                <!-- <button class = "InterfaceButtons" v-on:click = "reDirectUsers">Users</button> -->

                <button class = "InterfaceButtonLogout" @click = "Logout">Logout</button>
                
            </div>
        </div>

        <!-- ----------------------------- -->
        <div style = "display: flex; flex-direction: column; margin-left: 50vh;">
            <div class="logo-container2">
                <img class="logo2" src="../assets/LakbayLogo.png" alt="Lakbay Logo">
            </div>
            <!-- --------------------- Adding Bucket List -->
            <h2 style="margin-left: 15vh;">Adding Bucket List</h2>
            <div style = "display: flex; flex-direction: row; justify-content: space-around;">
                <div style = "display: flex; flex-direction: column;">
                    

                    <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">Bucket List name:</h4>
                    <input class = "RegisterInputs" v-model = "bucketListName" 
                        type = "text" placeholder = "Bucket List name"/>
                    <h4 style = "font-size: 1.5vh; margin-top: -10px; font-style: italic; font-weight: 300;">
                        EX: The Walled City</h4>

                    <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">Bucket List short introduction: </h4>
                    <textarea class = "RegisterInputs" style="resize: none; width: 38vh; 
                            height: 25vh; padding: 2vh;" v-model="bucketListIntro" rows="5" cols="30"/>
                    

                    <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">
                        Bucket List image</h4>
                        <div class = "RegisterInputs" style="display: flex; justify-content: center; 
                            flex-direction: column; align-items: center;">
                            <input  type="file" @change="onFileSelected1" accept="image/*"/>
                        </div>
                </div>

                <div style = "display: flex; flex-direction: column; justify-content: flex-start;">
                    <!--
                        <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">Search for Landmarks to add in the list:</h4>
                        <div style = "display: flex; flex-direction: column; justify-content: flex-start; align-items: center;
                        width: 50vh; height: 30vh; background-color: #d9d9d9; border-radius: 3vh; padding: 5px; overflow-y: auto;">
                        
                        <div style = "display: flex; flex-direction: row; justify-content: center;">
                            <input class = "RegisterInputs" style = "width: 30vh;" v-model = "searchInputLandmark" 
                            type = "text" placeholder = "Search Landmarks"/>
                            <button class = "searchButton" @click="searchLandmark(searchInputLandmark)">
                                <img style = "cursor: pointer; width: 3vh; height: 3vh; display: block; margin: auto;" src="../assets/iconSearch.png" alt="">
                            </button>
                        </div>
                        <div v-for = "i in 3" :key = "i " style = "background-color: #ffffff; width: 45vh; height: 5vh; 
                            border-radius: 1.5vh; margin: 1vh; 
                            padding: 1vh; text-align: center;" >hello</div>
                        </div> -->
                    <!-- inputs landmarks -->
                    <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">First Landmark: </h4>
                    <input class = "RegisterInputs" v-model = "checkerlandmark1" 
                        type = "text" placeholder = "Landmark Name"/>
                    <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">Second Landmark: </h4>
                    <input class = "RegisterInputs" v-model = "checkerlandmark2" 
                        type = "text" placeholder = "Landmark Name"/>
                    <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">Third Landmark: </h4>
                    <input class = "RegisterInputs" v-model = "checkerlandmark3" 
                        type = "text" placeholder = "Landmark Name"/>
                    <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">Fourth Landmark: </h4>
                    <input class = "RegisterInputs" v-model = "checkerlandmark4" 
                        type = "text" placeholder = "Landmark Name"/>
                        <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">Fifth Landmark: </h4>
                    <input class = "RegisterInputs" v-model = "checkerlandmark5" 
                        type = "text" placeholder = "Landmark Name"/>
                    
                    <button class = "InterfaceButtonChild" @click="createBucketList" style = "align-self: center; width: fit-content;
                            padding: 2vh; margin-top: 3vh;">
                            Create Bucket List</button>
                    <h1 v-if = "(showWarning)" class = "warning">An error occured. Restart the window to try again</h1>
                </div>
            </div>

            <h2 style="margin-left: 15vh;  margin-top: 10vh;">Maps</h2>
            <div style = "display: flex; flex-direction: row; justify-content: center; align-items: center; margin-top: 2vh;">
                <input class = "searchLocationsInput"  v-model = "searchInput" type = "text" placeholder = "Search Bucketlists"/>
				<button class = "searchButton" @click="searchMap(searchInput)">
					<img style = "cursor: pointer; width: 3vh; height: 3vh; display: block; margin: auto;" src="../assets/iconSearch.png" alt="">
				</button>
            </div>
            
            <div style = "display: flex; flex-direction: row; padding: 5vh; flex-wrap: wrap;
                justify-content: center; margin-top: 5vh;">
                
                <button v-for="bucketlist in bucketlists" :key="bucketlist.bucketlist_id" class="landmarkCard" 
                >
                    <h4 class="landmarkcardheader">
                        {{bucketlist.bucketlist_name}}
                    </h4>
                    <p class = "LandmarkUD"  style = "background-color: #e85f5fd5; width: 10vh; height: 2vh; border-radius: 0.5vh; 
                        padding: 0.5vh; cursor: pointer;"
                    @click = "deletingbucketlist(bucketlist)">DELETE</p>
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

            userProfile: [],
            authToken: null,
            searchInputLandmark: null,

            stopOperation: false,
            
            bucketlistidinserted: null,
            showWarning: false,

            bucketListName: null,
            bucketListIntro: null,
            bucketlistImage: null,

            checkerlandmark1: null,
            landmark1Id: null,
            checkerlandmark2: null,
            landmark2Id: null,
            checkerlandmark3: null,
            landmark3Id: null,
            checkerlandmark4: null,
            landmark4Id: null,
            checkerlandmark5: null,
            landmark5Id: null,

            bucketlists:[],
            searchInput: null,
            deletebucketlist: null,
        }
    },
    mounted(){
        
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

            axios.get('http://localhost:7000/bucketlist/allview')
            .then((response) => {
                this.bucketlists = response.data;
                console.log(this.maps);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        onFileSelected1(event) {
            this.bucketlistImage = event.target.files[0];
        },
        
        createBucketList(){
            //First checker
            console.log(this.checkerlandmark1)
            axios.post('http://localhost:7000/Lakbayscan/u/search/landmark/name', {
                landmarkname: this.checkerlandmark1})
            .then((response) => {
                console.log(response.data[0])
                if (response.data.length > 0){
                    this.landmark1Id = response.data[0].landmark_id;
                    
                    //second checker
                    console.log(this.checkerlandmark2)
                    axios.post('http://localhost:7000/Lakbayscan/u/search/landmark/name', {
                        landmarkname: this.checkerlandmark2})
                    .then((response) => {
                        console.log(response)
                        if (response.data.length > 0){
                            this.landmark2Id = response.data[0].landmark_id;

                            //third checker
                            console.log(this.checkerlandmark3)
                            axios.post('http://localhost:7000/Lakbayscan/u/search/landmark/name', {
                                landmarkname: this.checkerlandmark3})
                            .then((response) => {
                                console.log(response)
                                if (response.data.length > 0){
                                    this.landmark3Id = response.data[0].landmark_id;

                                    //fourth checker
                                    console.log(this.checkerlandmark4)
                                    axios.post('http://localhost:7000/Lakbayscan/u/search/landmark/name', {
                                        landmarkname: this.checkerlandmark4})
                                    .then((response) => {
                                        console.log(response)
                                        if (response.data.length > 0){
                                            this.landmark4Id = response.data[0].landmark_id;

                                            //last checker
                                            console.log(this.checkerlandmark5)
                                            axios.post('http://localhost:7000/Lakbayscan/u/search/landmark/name', {
                                                landmarkname: this.checkerlandmark5})
                                            .then((response) => {
                                                console.log(response)
                                                if (response.data.length > 0){
                                                    this.landmark5Id = response.data[0].landmark_id;
                                                    console.log("PASSED")
                                                    this.stopOperation = false

                                                    console.log("performing second operation")
                                                    const formData = new FormData();
                                                    formData.append('bucketlistname', this.bucketListName);
                                                    formData.append('bucketlistintro', this.bucketListIntro);
                                                    formData.append('bucketlistimage', this.bucketlistImage);

                                                    axios.post('http://localhost:7000/bucketlist/addingbucketlist', formData, {
                                                        headers: {
                                                            'Content-Type': 'multipart/form-data',
                                                        },
                                                    })
                                                    .then(response => {
                                                        console.log("Bucket List Created")
                                                        console.log(response);
                                                        this.bucketlistidinserted = response.data.insertId
                                                        // location.reload()
                                                        
                                                        //landmark 1
                                                        axios.post('http://localhost:7000/bucketlist/add/locationbucketlist', {
                                                            bucketlistid: this.bucketlistidinserted,
                                                            landmarkid: this.landmark1Id
                                                        })
                                                        .then((response) => {
                                                            console.log("Landmark 1 success")
                                                            console.log(response)
                                                            
                                                        }).catch(error => {
                                                            console.log(error);
                                                        });

                                                        //landmark 2
                                                        axios.post('http://localhost:7000/bucketlist/add/locationbucketlist', {
                                                            bucketlistid: this.bucketlistidinserted,
                                                            landmarkid: this.landmark2Id
                                                        })
                                                        .then((response) => {
                                                            console.log("Landmark 2 success")
                                                            console.log(response)
                                                            
                                                        }).catch(error => {
                                                            console.log(error);
                                                        });

                                                        //landmark 3
                                                        axios.post('http://localhost:7000/bucketlist/add/locationbucketlist', {
                                                            bucketlistid: this.bucketlistidinserted,
                                                            landmarkid: this.landmark3Id
                                                        })
                                                        .then((response) => {
                                                            console.log("Landmark 3 success")
                                                            console.log(response)
                                                            
                                                        }).catch(error => {
                                                            console.log(error);
                                                        });

                                                        //landmark 4
                                                        axios.post('http://localhost:7000/bucketlist/add/locationbucketlist', {
                                                            bucketlistid: this.bucketlistidinserted,
                                                            landmarkid: this.landmark4Id
                                                        })
                                                        .then((response) => {
                                                            console.log("Landmark 4 success")
                                                            console.log(response)
                                                            
                                                        }).catch(error => {
                                                            console.log(error);
                                                        });

                                                        //landmark 5
                                                        axios.post('http://localhost:7000/bucketlist/add/locationbucketlist', {
                                                            bucketlistid: this.bucketlistidinserted,
                                                            landmarkid: this.landmark5Id
                                                        })
                                                        .then((response) => {
                                                            console.log("Landmark 5 success")
                                                            console.log(response)
                                                            
                                                        }).catch(error => {
                                                            console.log(error);
                                                        });

                                                        console.log("congratssssssss")
                                                        location.reload()

                                                        
                                                    })
                                                    .catch(error => {
                                                        console.log(error);
                                                    });
                                                } else{
                                                    this.stopOperation = true
                                                    this.showWarning = !this.showWarning;
                                                    console.log("NONE 5 ")
                                                }
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            });
                                        } else{
                                            this.stopOperation = true
                                            this.showWarning = !this.showWarning;
                                            console.log("NONE 4 ")
                                        }
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                                } else{
                                    this.stopOperation = true
                                    this.showWarning = !this.showWarning;
                                    console.log("NONE 3 ")
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        } else{
                            this.stopOperation = true
                            this.showWarning = !this.showWarning;
                            console.log("NONE 2 ")
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                } else{
                    this.stopOperation = true
                    this.showWarning = !this.showWarning;
                    console.log("NONE 1 ")
                }
            })
            .catch((error) => {
                console.log(error);
                
            });


        },
        searchMap(searchInput){
				if (searchInput.length > 0){
					axios.post('http://localhost:7000/bucketlist/search/bucketlist', {keywords: this.searchInput})
					.then((response) => {
						console.log(this.searchInput)
						this.bucketlists = response.data
						console.log(this.maps)
                        
					})
					.catch((error) => {
						console.error(error);
						this.error = 'Failed to fetch maps.';
					});
				} else {
					axios.get('http://localhost:7000/bucketlist/allview')
					.then((response) => {
						this.bucketlists = response.data
						console.log(this.maps)
					})
					.catch((error) => {
						console.error(error);
						this.error = 'Failed to fetch bucketlists.';
					});
				}
		},
        deletingbucketlist(bucketlist){

            this.deletebucketlist = bucketlist.bucketlist_id

            axios.post('http://localhost:7000/bucketlist/delete/bucketlist', {bucketlistid: this.deletebucketlist})
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
    .warning{
        text-align: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 1.5;
        color:red
    }


</style>

