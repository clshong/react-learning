import { create } from 'zustand'

const useUser = create((set) => ({
    count: 0,
    data: null,
    loading: false,
    increase: () => set((state) => ({ count: state.count + 1 })),
    decrease: () => set((state) => ({ count: state.count - 1 })),
    fetchData: async () => {
        set({ loading: true });
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
            const json = await response.json();
            set({ data: json });
        } catch (error) {
            console.error('获取数据失败:', error);
        } finally {
            set({ loading: false });
        }
    },
}))

export default useUser