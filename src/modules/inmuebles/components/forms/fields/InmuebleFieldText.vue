<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    
    <input
      v-if="type !== 'textarea'"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :class="inputClasses"
      :disabled="disabled"
    />

    <textarea
      v-else
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :rows="rows"
      :class="inputClasses"
      :disabled="disabled"
    ></textarea>

    <p v-if="error" class="text-sm text-red-600 mt-1">
      {{ error }}
    </p>
    
    <p v-if="helpText" class="text-sm text-gray-500 mt-1">
      {{ helpText }}
    </p>
  </div>
</template>

<script setup>

import {computed} from 'vue'
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text' // 'text', 'number', 'email', 'url', 'textarea'
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  helpText: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  rows: {
    type: Number,
    default: 3
  }
})

defineEmits(['update:modelValue'])

const inputClasses = computed(() => {
  const base = 'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors'
  const error = props.error ? 'border-red-300' : 'border-gray-300'
  const disabled = props.disabled ? 'bg-gray-100 cursor-not-allowed opacity-50' : 'bg-white'
  return `${base} ${error} ${disabled}`
})
</script>