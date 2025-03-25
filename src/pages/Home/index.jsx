import { useEffect } from 'react'
import { useUser } from '@/store/index'
import SubmitBottom from '@/components/Bottom/SubmitBottom';
import { useEcharts } from '@/Hooks/useEcharts.js'

function Home() {
  const { count, increase, decrease, data, loading, fetchData } = useUser();
  const option = {
    title: {
      text: 'pp',
      left: 30,
      top: 5
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['07-11', '07-12', '07-13', '07-14', '07-15', '07-16', '07-17']
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    series: [
      {
        name: "测试1",
        type: 'line',
        areaStyle: {
          color: '#1890ff',
          opacity: 0.2
        },
        emphasis: {
          focus: 'series'
        },
        data: [120, 140, 120, 190, 150, 111, 160]
      },
      {
        name: "测试2",
        type: 'line',
        areaStyle: {
          color: '#1890ff',
          opacity: 0.3
        },
        emphasis: {
          focus: 'series'
        },
        data: [90, 122, 90, 140, 123, 280, 200]
      },
    ]
  };

  const [echartsRef] = useEcharts(option);






  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <div>加载中...</div>;
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <h2>{count}</h2>
      <button onClick={() => increase()}>加1</button>
      <button onClick={() => decrease()}>减1</button>
      <h2>数据加载结果：</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <SubmitBottom >
      </SubmitBottom>
      <hr />
      <div className='h-200 w-200'>
        <div ref={echartsRef} className='w-full h-full'></div>
      </div>
    </>
  )
}

export default Home
