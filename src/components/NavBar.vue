<template>
  <nav class="navbar" :class="{ fixed: isFixed }">
    <router-link
      v-for="link in navLinks"
      :key="link.name"
      :to="link.path"
      class="nav-link"
      active-class="active-link"
    >
      {{ link.name }}
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps<{ navLinks: NavLink[] }>();

const isFixed = ref(false);
let prevScrollPos = 0; // Store previous scroll position

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  const currentScrollPos = window.scrollY;
  if (prevScrollPos > currentScrollPos) {
    // Scrolling up, show the navbar
    isFixed.value = false;
  } else if (currentScrollPos > 50) {
    // Adjust the threshold as needed
    // Scrolling down, hide the navbar
    isFixed.value = true;
  }
  prevScrollPos = currentScrollPos;
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between; /* Space out links horizontally */
  background-color: #daebfc;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: top 0.3s;
  max-width: 100%; /* Ensure the navbar doesn't exceed the viewport width */
  overflow: hidden; /* Hide overflowing content */
}

.navbar.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 97vw;
  z-index: 999;
}

.nav-link {
  font-weight: bold;
  color: #243349;
  text-decoration: none;
  transition: color 0.3s, background-color 0.3s;
  padding: 10px 15px; /* Reduce padding if necessary */
  white-space: nowrap; /* Prevent text wrapping */
  overflow: hidden; /* Hide overflowing text */
  text-overflow: ellipsis;
}

.nav-link:hover {
  background-color: #ccdfff; /* Lighter blue for hover */
  color: #1a2a3a;
  border-radius: 4px;
}

.active-link {
  background-color: #35495e;
  color: #fff;
  border-radius: 4px;
}

/* Media query for smaller screens */
@media only screen and (max-width: 600px) {
  .navbar {
    flex-direction: column; /* Stack links vertically on small screens */
  }
  .navbar.fixed {
    width: 93vw;
  }
}
@media only screen and (max-width: 400px) {
  .navbar {
    flex-direction: column; /* Stack links vertically on small screens */
  }
  .navbar.fixed {
    width: 91vw;
  }
}
</style>
