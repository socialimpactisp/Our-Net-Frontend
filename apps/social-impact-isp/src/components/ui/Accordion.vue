<!-- eslint-disable vue/no-v-html -->
<template>
  <div v-if="showAccordion">
    <div v-for="(item, index) in categoryItems" :key="index" class="mb-4">
      <div
        class="bg-white relative z-10 px-6 py-3 border rounded-xl font-bold text-lg cursor-pointer"
        @click="makeActive(index)"
      >
        {{ item[questionProperty] }}
      </div>
      <div
        v-if="activeQuestionIndex === index"
        class="relative bg-gray-100 z-0 border -mt-3 px-6 pt-6 pb-3 rounded-b-xl"
        v-html="item[answerProperty]"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Item {
  [key: string]: string;
}

export default defineComponent({
  name: "UiAccordion",

  props: {
    items: {
      type: Array,
      required: true,
    },
    questionProperty: {
      type: String,
      default: "title",
    },
    answerProperty: {
      type: String,
      default: "value",
    },
    categoryProperty: {
      type: String,
      default: "category",
    },
    initalCategory: {
      type: String,
      default: "",
    },
    initialQuestionIndex: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      activeTab: "",
      activeQuestionIndex: null as number | null,
      showAccordion: true,
    };
  },

  computed: {
    categories(): string[] {
      const items = this.items as Item[];
      const uniqueCategories = items
        .map((item) => item[this.categoryProperty])
        .filter(
          (category, index, categories) =>
            categories.indexOf(category) === index,
        );

      return uniqueCategories;
    },

    categoryItems(): Item[] {
      const items = this.items as Item[];
      return items.filter(
        (item) => item[this.categoryProperty] === this.activeTab,
      );
    },

    hasNavigation(): boolean {
      return this.categories.length > 1 && !!this.categories[0];
    },
  },

  mounted() {
    this.activeTab = this.initalCategory || this.categories[0];
    this.activeQuestionIndex = this.initialQuestionIndex || 0;
  },

  methods: {
    makeActive(index: number) {
      this.activeQuestionIndex =
        this.activeQuestionIndex === index ? null : index;
    },
  },
});
</script>
