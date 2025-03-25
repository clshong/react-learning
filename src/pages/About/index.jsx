import React from 'react'
import CFrom from '@/components/CFrom'

function About() {
    const getSchema = {
        layout: {
            "v-props": {
                labelCol: 8,
                wrapperCol: 16,
                hasSearch: true,
                hasCollapse: true,
                isCollapse: true,
                openColSpan: 1,
                closeColSpan: 1,
            },
            children: {
                username: {
                    label: '用户名',
                    type: 'input', // 文本输入框
                    rules: [{ required: true, message: '请输入用户名' }],
                    placeholder: '请输入用户名',
                },
                password: {
                    label: '密码',
                    type: 'input', // 密码输入框
                    rules: [{ required: true, message: '请输入密码' }],
                    placeholder: '请输入密码',
                    "v-props": {
                        type: 'password',
                    },
                },
                birthDate: {
                    label: '出生日期',
                    type: 'date',
                    rules: [{ required: true, message: '请选择日期' }],
                },
                gender: {
                    label: '性别',
                    type: 'select',
                    options: [
                        { label: '男', value: 'male' },
                        { label: '女', value: 'female' },
                    ],
                    placeholder: '请选择性别',
                    "v-props": {
                        // collapsible: false,
                    },
                },
            },
        },
    }
    const handleFinish = (values) => {
        console.log("表单提交数据：", values);
    };

    return (
        <>
            <h2>动态表单示例</h2>
            <CFrom schema={getSchema} onFinish={handleFinish} />
        </>

    )
}

export default About