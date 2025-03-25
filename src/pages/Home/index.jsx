import { useEffect } from 'react'
import { useUser } from '@/store/index'

function Home() {
    const { count, increase, decrease, data, loading, fetchData } = useUser();

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) return <div>加载中...</div>;
    return (
        <>
            <h2>{count}</h2>
            <button onClick={() => increase()}>加1</button>
            <button onClick={() => decrease()}>减1</button>
            <h2>数据加载结果：</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
    )
}

export default Home