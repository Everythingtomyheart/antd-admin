import { onBeforeUnmount, onMounted, reactive } from 'vue';
interface Position {
  left: number;
  top: number;
}
type TargetElement = HTMLElement | Element | Document | Window;
function useScroll(target: TargetElement | (() => TargetElement)): [Position, () => void] {
  const position: Position = reactive({ left: 0, top: 0 });
  let el: TargetElement | null = null;
  // TODO 节流 ，是否需要
  const scroll = (e: Event) => {
    const target = e.target;
    if (target) {
      if (target === document) {
        if (!document.scrollingElement) return;
        position.left = document.scrollingElement.scrollLeft;
        position.top = document.scrollingElement.scrollTop;
      } else {
        position.left = (target as HTMLElement).scrollLeft;
        position.top = (target as HTMLElement).scrollTop;
      }
    }
  };
  const stop = () => {
    el?.removeEventListener('scroll', scroll);
  };
  onMounted(() => {
    if (typeof target === 'function') {
      el = target();
    } else {
      el = target;
    }
    if (el) {
      el.addEventListener('scroll', scroll);
      onBeforeUnmount(stop);
    }
  });
  return [position, stop];
}

export default useScroll;
