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
  props: ['partType', 'id'],
  computed: {
    part() {
      // const partType = this.$route.params.partType;
      // const id = this.$route.params.id;
      // should use destructuring:
      // const { partType, id } = this.$route.params; // a downside of this is this component is now coupled to the router. Better to pass the partType and id as props.
      const { partType, id } = this; // can now get the props from this
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
