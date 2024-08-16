import { ref, onMounted, onUnmounted } from 'vue';

export function useIntersectionObserver(callback: () => void) {
  const observer = ref<IntersectionObserver | null>(null);
  const target = ref<HTMLElement | null>(null);

  onMounted(() => {
    observer.value = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });
    if (target.value) {
      observer.value.observe(target.value);
    }
  });

  onUnmounted(() => {
    if (observer.value && target.value) {
      observer.value.unobserve(target.value);
    }
  });

  return { target };
}
