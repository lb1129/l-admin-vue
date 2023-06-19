<template>
  <div class="vc-checkerboard"></div>
</template>

<script setup lang="ts"></script>

<style>
.vc-checkerboard {
  position: absolute;
  inset: 0;
  background-image: conic-gradient(
    rgb(0 0 0 / 6%) 0 25%,
    transparent 0 50%,
    rgb(0 0 0 / 6%) 0 75%,
    transparent 0
  );
  background-size: 8px 8px;
}
</style>
