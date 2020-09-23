<template>
    <div>
        <div class="header">
            <span v-if="open" @click="open = !open">&#x25B2; Collapse</span>
            <span v-if="!open" @click="open = !open">&#x25BC; Expand</span>
        </div>
        <!-- inject content here using a vue slot -->
        <slot v-if="open">
            <!-- can have default content here if nothing is injected from parent template -->
        </slot>
    </div>
</template>

<script>
export default {
  name: 'CollapsibleSection',
  data() {
    return { open: true };
  },
};
</script>

<style scoped>
  .header {
      background-color: #bbb;
      padding: 3px;
      cursor: pointer;
  }
</style>
