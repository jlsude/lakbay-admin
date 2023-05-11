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

                <button class = "InterfaceButtons" v-on:click = "reDirectRegisterLoc" disabled>Register Landmark</button>
                <button class = "InterfaceButtons" v-on:click = "reDirectManageLoc">Manage Landmarks</button>
                <button class = "InterfaceButtons" v-on:click = "reDirectBucketList">Lakbay Bucket List</button>
                <button class = "InterfaceButtons" v-on:click = "reDirectMaps">Maps</button>
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
            <!-- --------------------- CREATE QR CODE -->
            <h2 style="margin-left: 15vh;">Create QR code</h2>
            <div style = "display: flex; flex-direction: row; justify-content: space-around;">
                <div style = "display: flex; flex-direction: column;">
                    

                    <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">QR Code string:</h4>
                    <input class = "RegisterInputs" :disabled = (showQRcode) v-model = "qrcodedata.qrcodecontent" 
                        type = "text" placeholder = "LAKBAY-LANDMARK-CITY"/>
                    <h4 style = "font-size: 1.5vh; margin-top: -10px; font-style: italic; font-weight: 300;">
                        EX: LAKBAY-BDSD-MLA, must have no spaces, only dash lines</h4>

                    <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">QR Landmark Name: </h4>
                    <input class = "RegisterInputs" :disabled = (showQRcode) v-model = "qrcodedata.qrlandmark" 
                        type = "text" placeholder = "Landmark Name"/>
                    <h4 style = "font-size: 1.5vh; margin-top: -10px; font-style: italic; font-weight: 300;">
                        EX: Baluarte De San Diego</h4>

                    <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">City: </h4>
                    <input class = "RegisterInputs" :disabled = (showQRcode) v-model = "qrcodedata.qrcity" type = "text" placeholder = "City Name"/>
                    <h4 style = "font-size: 1.5vh; margin-top: -10px; font-style: italic; font-weight: 300;">
                        EX: Manila</h4>


                </div>
                <div style = "display: flex; flex-direction: column; justify-content: flex-end; align-items: center;">
                    <h5 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">QR Code: </h5>
                    <div style = "background-color: #c4c4c4; border-radius: 5vh; width: 35vh; height: 35vh; 
                        margin-bottom: 2vh; display: flex; justify-content: center; align-items: center;">
                        <img v-if = (showQRcode) style="width: 30vh; height: 30vh; object-fit: cover; border-radius: 5vh;" 
                            :src="'http://localhost:7000/QR/a/qrcode/' + landmarkdata.qrid" alt="">
                    </div>
                    
                    <h4 style = "font-size: 1.5vh; margin-top: -10px; font-style: italic; font-weight: 300; 
                        margin-bottom: 1vh;">
                        This will be linked automatically to the landmark you will be registering</h4>
                        <a v-if = (showQRcode) style = "font-size: 1.5vh; font-weight: 300; color: #3c3c3c;" 
                            :href="'http://localhost:7000/QR/a/qrcode/' + landmarkdata.qrid + '?filename=' + qrcodedata.qrlandmark" download>
                            Download QR code
                        </a>




                    
                </div>
            </div>
            <!-- ---------------- REGISTER LANDMARK -->
            <h2 style="margin-left: 15vh;">Register Landmark</h2>
            <div style = "display: flex; flex-direction: column;">
                
                
                <div style = "display: flex; flex-direction: row; justify-content: space-around">
                    
                    <div style = "display: flex; flex-direction: column; margin-left: -3vh;">
                        

                        <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">Landmark Name:</h4>
                        <input class = "RegisterInputs" :value="qrcodedata.qrlandmark" type = "text" placeholder = "Landmark Name" disabled/>

                        <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">Landmark Address: </h4>
                        <input class = "RegisterInputs" :disabled = (showQRcode) v-model = "landmarkdata.landmarkaddress" type = "text" placeholder = "Landmark Address"/>
                        <h4 style = "font-size: 1.5vh; margin-top: -10px; font-style: italic; font-weight: 300;">
                            EX: Intramuros, Manila city</h4>

                        <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">Landmark Coordinates: </h4>
                        <input class = "RegisterInputs" :disabled = (showQRcode) v-model = "landmarkdata.landmarkcoordinates" type = "text" placeholder = "Landmark Coordinates"/>
                        <h4 style = "font-size: 1.5vh; margin-top: -10px; font-style: italic; font-weight: 300;">
                            EX: 14.5854° N, 120.9756° E, currently optional</h4>


                    </div>
                    <div style = "display: flex; flex-direction: column; align-items: center;">
                        <div>
                            <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">City: </h4>
                        <input class = "RegisterInputs" v-model = "landmarkdata.landmarkcity" type = "text" 
                            placeholder = "City Name" disabled/>

                        <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">Region: </h4>
                        <input class = "RegisterInputs" :disabled = (showQRcode) v-model = "landmarkdata.landmarkregion"
                            type = "text" placeholder = "Region"/>
                        <h4 style = "font-size: 1.5vh; margin-top: -10px; font-style: italic; font-weight: 300;">
                            EX: National Capital Region</h4>
                        </div>
                        
                        
                        <button class = "InterfaceButtonChild" v-on:click = "registerLandmark" style = "align-self: center; width: fit-content;
                            padding: 2vh; margin-top: 3vh;">
                            Register Landmark</button>
                        <h4 v-if = "!(this.registermessage) || this.message" style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px; 
                        color: red; text-align: center;">{{this.message}}</h4>
                        <h4 v-if = "!(this.message) || this.registermessage" style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px; 
                        color: green; text-align: center;">{{this.registermessage}}</h4>
                        
                    </div>

                </div>
            </div> 

            <!-- ---------------- Fill the basic information below -->
            <div v-if = (showQRcode) style = "display: flex; flex-direction: column;">
                <h2 style="margin-left: 15vh;">Fill the Landmark information below</h2>
                <div style = "display: flex; flex-direction: row; justify-content: space-evenly;">

                    <div style = "display: flex; flex-direction: column; align-items: center;">
                        <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px; justify-content: space-evenly;">
                            First Paragraph</h4>
                        <textarea class = "RegisterInputs" style="resize: none; width: 40vh; 
                            height: 25vh; padding: 2vh;" v-model="paragraph1" rows="5" cols="30"/>

                        <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">
                            Second Paragraph</h4>
                        <textarea class = "RegisterInputs" style="resize: none; width: 40vh; 
                            height: 25vh; padding: 2vh;" v-model="paragraph2" rows="5" cols="30"/>

                        <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">
                            Third Paragraph</h4>
                        <textarea class = "RegisterInputs" style="resize: none; width: 40vh; 
                            height: 25vh; padding: 2vh;" v-model="paragraph3" rows="5" cols="30"/>
                
                    </div>


                    <div style = "display: flex; flex-direction: column; align-items: stretch;">
                        <!-- Image 1 -->
                        <div>
                            <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">
                            First Image</h4>
                            <div class = "RegisterInputs" style="display: flex; justify-content: center; 
                                flex-direction: column; align-items: center;">
                                <input  type="file" @change="onFileSelected1" accept="image/*"/>
                            </div>
                            <h4 style = "font-size: 2vh; margin-top: -1vh; margin-bottom: 5px;">Caption</h4>
                            <input class = "RegisterInputs" :disabled = (successmessage2) v-model = "caption1" 
                                type = "text" placeholder = "Caption of the image"/>
                        </div>
                        <!-- Image 2 -->
                        <div>
                            <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">
                            Second Image</h4>
                            <div class = "RegisterInputs" style="display: flex; justify-content: center; 
                                flex-direction: column; align-items: center;">
                                <input  type="file" @change="onFileSelected2" accept="image/*"/>
                            </div>
                            <h4 style = "font-size: 2vh; margin-top: -1vh; margin-bottom: 5px;">Caption</h4>
                            <input class = "RegisterInputs" :disabled = (successmessage2) v-model = "caption2" 
                                type = "text" placeholder = "Caption of the image"/>
                        </div>
                        <!-- Image 3 -->
                        <div>
                            <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">
                            Third Image</h4>
                            <div class = "RegisterInputs" style="display: flex; justify-content: center; 
                                flex-direction: column; align-items: center;">
                                <input  type="file" @change="onFileSelected3" accept="image/*"/>
                            </div>
                            <h4 style = "font-size: 2vh; margin-top: -1vh; margin-bottom: 5px;">Caption</h4>
                            <input class = "RegisterInputs" :disabled = (successmessage2) v-model = "caption3" 
                                type = "text" placeholder = "Caption of the image"/>
                        </div>
                        <!-- Image 4 -->
                        <div>
                            <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">
                            Fourth Image</h4>
                            <div class = "RegisterInputs" style="display: flex; justify-content: center; 
                                flex-direction: column; align-items: center;">
                                <input  type="file" @change="onFileSelected4" accept="image/*"/>
                            </div>
                            <h4 style = "font-size: 2vh; margin-top: -1vh; margin-bottom: 5px;">Caption</h4>
                            <input class = "RegisterInputs" :disabled = (successmessage2) v-model = "caption4" 
                                type = "text" placeholder = "Caption of the image"/>
                        </div>
                        <!-- Image 5 -->
                        <div>
                            <h4 style = "font-size: 2vh; margin-top: 10px; margin-bottom: 5px;">
                            Fifth Image</h4>
                            <div class = "RegisterInputs" style="display: flex; justify-content: center; 
                                flex-direction: column; align-items: center;">
                                <input  type="file" @change="onFileSelected5" accept="image/*"/>
                            </div>
                            <h4 style = "font-size: 2vh; margin-top: -1vh; margin-bottom: 5px;">Caption</h4>
                            <input class = "RegisterInputs" :disabled = (successmessage2) v-model = "caption5" 
                                type = "text" placeholder = "Caption of the image"/>
                        </div>
    
                    </div>
                
                </div>
                <button class = "InterfaceButtonChild" v-on:click = "insertLandmarkInfo" style = "align-self: center; width: fit-content;
                                padding: 2vh; margin-top: 3vh;">
                                Insert landmark information</button>
                <h4 v-if = "!(this.successmessage2) || this.message2" style = "font-size: 2vh; margin-top: 10px; margin-bottom: 20px; 
                color: red; text-align: center;">{{this.message2}}</h4>
                <h4 v-if = "!(this.message2) || this.successmessage2" style = "font-size: 2vh; margin-top: 10px; margin-bottom: 20px; 
                color: green; text-align: center;">{{this.successmessage2}}</h4>
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
            qrid: '',
            qrcodedata: {
                qrcodecontent: null,
                qrlandmark: null,
                qrcity: null,
            },
            message: '',
            responsedata: [],
            responsedata2: [],
            responsedata3: [],
            showQRcode: false,

            registermessage: '',

            paragraph1: null,
            paragraph2: null,
            paragraph3: null,

            image1: null,
            image2: null,
            image3: null,
            image4: null,
            image5: null,

            caption1: null,
            caption2: null,
            caption3: null,
            caption4: null,
            caption5: null,

            message2: null,
            successmessage2: null,

            userProfile: [],
            authToken: null,
            

        }
    },
    computed: {
        landmarkdata() {
            return {
            qrid: '',
            landmarkname: this.qrcodedata.qrlandmark,
            landmarkcity: this.qrcodedata.qrcity,
            landmarkaddress: null,
            landmarkregion: null,
            landmarkcoordinates: 'OPTIONAL', //default
            landmarktypecontent: '1', //default

            landmarkid: 4,
            }
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

    },
    methods: {
        onFileSelected1(event) {
            this.image1= event.target.files[0];
        },
        onFileSelected2(event) {
            this.image2= event.target.files[0];
        },
        onFileSelected3(event) {
            this.image3= event.target.files[0];
        },
        onFileSelected4(event) {
            this.image4= event.target.files[0];

        },
        onFileSelected5(event) {
            this.image5= event.target.files[0];
        },
        registerLandmark(){
            if (this.qrcodedata.qrcodecontent === null || this.qrcodedata.qrlandmark === null || 
                this.qrcodedata.qrcity === null || this.landmarkdata.landmarkaddress === null ||
                this.landmarkdata.landmarkcoordinates === null || this.landmarkdata.landmarkregion === null) {
                    this.message = 'Some fields are empty'
            }
           else{
                //checks qr code
                axios.post('http://localhost:7000/QR/a/checker', { qrcodecontent: this.qrcodedata.qrcodecontent})
                .then((response) => {
                    this.responsedata = response.data
                    console.log(this.responsedata.message)
                    this.message = '';

                    //Generates QR code
                    axios.post('http://localhost:7000/QR/a/generate', this.qrcodedata)
                    .then((response) => {
                        this.responsedata2 = response.data
                        this.landmarkdata.qrid = this.responsedata2.QRID
                        this.showQRcode = true,
                        console.log("showing qr code")
                        console.log(response)
                        
                        //registers landmark
                        axios.post('http://localhost:7000/Manage/a/add/Landmark', this.landmarkdata)
                        .then((response) => {

                            this.responsedata3 = response.data;
                            console.log(this.responsedata3.results.insertId)
                            this.landmarkdata.landmarkid = this.responsedata3.results.insertId
                            this.registermessage = this.responsedata3.message
                            console.log(this.registermessage) 
                                                
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })



                })
                .catch(error => {
                    if (error.response) {
                    console.log(error.response.data.message); 
                    this.message = error.response.data.message;
                    } else {
                    console.log(error.message);
                    }
                });
           }
            

           
        },
        insertLandmarkInfo(){
            if (this.paragraph1 === null || this.paragraph2 === null || this.paragraph3 === null 
                || this.caption1 === null || this.caption2 === null || this.caption3 === null || this.caption4 === null 
                || this.caption5 === null) {

                
                this.message2 = 'Some fields are empty'
                    
            }
           else{
                

                // paragraph 1
                axios.post('http://localhost:7000/Manage/a/add/landmarkinfo', {
                    landmarkid: this.landmarkdata.landmarkid,
                    infoparagraph: this.paragraph1,

                })
                .then((response) => {

                    console.log(response)
                                        
                })
                .catch(error => {
                    console.log(error);
                });

                // paragraph 2
                axios.post('http://localhost:7000/Manage/a/add/landmarkinfo', {
                    landmarkid: this.landmarkdata.landmarkid,
                    infoparagraph: this.paragraph2,

                })
                .then((response) => {

                    console.log(response)
                                        
                })
                .catch(error => {
                    console.log(error);
                });

                // paragraph 3
                axios.post('http://localhost:7000/Manage/a/add/landmarkinfo', {
                    landmarkid: this.landmarkdata.landmarkid,
                    infoparagraph: this.paragraph3,

                })
                .then((response) => {

                    console.log(response)
                                        
                })
                .catch(error => {
                    console.log(error);
                });

                
                for (let i = 1; i <= 5; i++) {
                console.log("process", i)
                const image = this[`image${i}`];
                const caption = this[`caption${i}`];
                if (!image || !caption) {
                    continue;
                }

                const formData = new FormData();
                formData.append('image_src', image);
                formData.append('landmarkid', this.landmarkdata.landmarkid);
                formData.append('imagecaption', caption);

                axios.post('http://localhost:7000/manage/locations', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
            }


                this.successmessage2 = 'Insertion of information is successful'

























           }
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



</style>

