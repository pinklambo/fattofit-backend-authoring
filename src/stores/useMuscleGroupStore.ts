import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MuscleGroup } from '../types/models'

import { app } from '../firebase'
import { subscribeToMuscleGroups } from '../services/muscleGroupService'

export const useMuscleGroupStore = defineStore('muscleGroup', () => {
  const groups = ref<MuscleGroup[]>([])
  const loaded = ref(false)
  let unsubscribe: null | (() => void) = null

  function setGroups(newGroups: MuscleGroup[]) {
    groups.value = newGroups
    loaded.value = true
  }

  function addOrUpdateGroup(group: MuscleGroup) {
    const idx = groups.value.findIndex(g => g.id === group.id)
    if (idx !== -1) {
      groups.value[idx] = group
    } else {
      groups.value.push(group)
    }
  }

  function removeGroup(id: string) {
    groups.value = groups.value.filter(g => g.id !== id)
  }

  function clear() {
    groups.value = []
    loaded.value = false
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
  }

  function subscribe() {
    if (unsubscribe) unsubscribe()
    unsubscribe = subscribeToMuscleGroups(app, ({ type, doc }) => {
      if (type === 'added' || type === 'modified') {
        addOrUpdateGroup(doc)
      } else if (type === 'removed') {
        removeGroup(doc.id)
      }
    })
  }

  return { groups, loaded, setGroups, addOrUpdateGroup, removeGroup, clear, subscribe }
}, { persist: true })
