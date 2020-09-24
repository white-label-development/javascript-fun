<template>
    <div>
        <h1>{{ part.title }}</h1>
        <div>
            {{ part.description }}
        </div>
    </div>
</template>

<script>
import parts from '../data/parts';

export default {
  name: 'PartInfo',
  computed: {
    part() {
      // const partType = this.$route.params.partType;
      // const id = this.$route.params.id;
      // should use destructuring:
      const { partType, id } = this.$route.params;

      return parts[partType].find((part) => part.id === +id); // reminder +id casts id string to a number
    },
  },
  // data() {
  //   return {
  //     part: {
  //       title: 'Part Title',
  //       description: 'Part Description',
  //     },
  //   };
  // },
};
</script>
