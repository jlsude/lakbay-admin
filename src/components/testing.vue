<template>
    <div>
      <h1>Dropdown Menus</h1>
      <div>
        <label>Menu 1:</label>
        <select v-model="menu1">
          <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
      <div>
        <label>Menu 2:</label>
        <select v-model="menu2">
          <option v-for="option in options.filter(o => o !== menu1)" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
      <div>
        <label>Menu 3:</label>
        <select v-model="menu3">
          <option v-for="option in options.filter(o => o !== menu1 && o !== menu2)" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
      <div>
        <label>Menu 4:</label>
        <select v-model="menu4">
          <option v-for="option in options.filter(o => o !== menu1 && o !== menu2 && o !== menu3)" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
      <div>
        <label>Menu 5:</label>
        <select v-model="menu5">
          <option v-for="option in options.filter(o => o !== menu1 && o !== menu2 && o !== menu3 && o !== menu4)" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        menu1: null,
        menu2: null,
        menu3: null,
        menu4: null,
        menu5: null,
      }
    },
  }
  </script>
  