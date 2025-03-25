import React, { useState, useEffect } from "react";
import {
    Form,
    Button,
    Input,
    Select,
    DatePicker,
    Row,
    Col,
    Collapse,
} from "antd";

// 组件映射表，根据 schema 中 type 映射到对应组件
const COMPONENT_MAP = {
    input: Input,
    select: Select,
    date: DatePicker,
};

const CFrom = ({ schema, onFinish, initialValues = {} }) => {
    const [form] = Form.useForm();
    // 使用 schema 中的 isCollapse 设置初始折叠状态（true 表示初始折叠）
    const [collapsed, setCollapsed] = useState(schema.layout["v-props"].isCollapse);
    // 异步加载选项（例如下拉选项）
    const [asyncOptions, setAsyncOptions] = useState({});

    // 加载每个字段可能定义的异步选项方法
    useEffect(() => {
        const loadOptions = async () => {
            const newOptions = {};
            for (const [key, config] of Object.entries(schema.layout.children)) {
                if (
                    config["v-props"]?.request &&
                    typeof config["v-props"].request === "function"
                ) {
                    try {
                        const data = await config["v-props"].request();
                        newOptions[key] = data;
                    } catch (error) {
                        console.error(`Failed to load options for ${key}:`, error);
                    }
                }
            }
            setAsyncOptions(newOptions);
        };
        loadOptions();
    }, [schema]);

    // 根据 schema 动态渲染表单项
    const renderFormItem = ([fieldName, config]) => {
        // 根据 config.type 获取对应组件，特殊处理密码输入
        let Component = COMPONENT_MAP[config.type];
        if (
            config.type === "input" &&
            config["v-props"]?.type &&
            config["v-props"].type.toLowerCase() === "password"
        ) {
            Component = Input.Password;
        }
        if (!Component) return null;

        const componentProps = {
            placeholder: config.placeholder || "",
            ...config["v-props"],
        };

        // 如果是 select 类型，处理 options（优先使用异步加载的 options）
        if (config.type === "select") {
            const opts = config.options || asyncOptions[fieldName] || [];
            componentProps.children = opts.map((opt) => (
                <Select.Option key={opt.value} value={opt.value}>
                    {opt.label}
                </Select.Option>
            ));
        }

        return (
            <Col key={fieldName} span={24 / (schema.layout["v-props"].visibleCount || 4)}>
                <Form.Item
                    name={fieldName}
                    label={config.label}
                    rules={config.rules || []}
                >
                    <Component {...componentProps} />
                </Form.Item>
            </Col>
        );
    };

    // 所有字段列表
    const allFields = Object.entries(schema.layout.children);
    // 默认显示数量（visibleCount），默认为 4
    const visibleCount = schema.layout["v-props"].visibleCount || 4;
    // 默认显示的字段
    const visibleFields = allFields.slice(0, visibleCount);
    // 需要折叠显示的字段
    const hiddenFields = allFields.slice(visibleCount);

    return (
        <Form
            form={form}
            layout="horizontal"
            initialValues={initialValues}
            onFinish={onFinish}
            labelCol={schema.layout["v-props"].labelCol}
            wrapperCol={schema.layout["v-props"].wrapperCol}
        >
            <Row gutter={16}>
                {visibleFields.map(renderFormItem)}
            </Row>
            {schema.layout["v-props"].hasCollapse && hiddenFields.length > 0 && (
                <Collapse
                    activeKey={collapsed ? [] : ["1"]}
                    onChange={() => setCollapsed(!collapsed)}
                >
                    <Collapse.Panel header="更多筛选条件" key="1">
                        <Row gutter={16}>
                            {hiddenFields.map(renderFormItem)}
                        </Row>
                    </Collapse.Panel>
                </Collapse>
            )}
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    查询
                </Button>
                {schema.layout["v-props"].hasSearch && (
                    <Button style={{ marginLeft: 8 }} onClick={() => form.resetFields()}>
                        重置
                    </Button>
                )}
            </Form.Item>
        </Form>
    );
};

export default CFrom;
