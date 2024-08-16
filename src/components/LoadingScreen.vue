<template>
  <div class="loading-square"></div>
</template>

<style scoped>
.loading-square {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background-color: #3498db;
  animation: square-spin 1.5s infinite linear;
}

@keyframes square-spin {
  0%, 100% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  50% {
    transform: translate(-50%, -50%) rotate(180deg);
  }
}
</style>
