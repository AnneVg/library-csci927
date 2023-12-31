import {
    Create,
    useForm
} from "@refinedev/antd";

import {
    IResourceComponentsProps,
    useApiUrl,
    useTranslate,
} from "@refinedev/core";
import {
    Col,
    DatePicker,
    Form,
    Input,
    Radio,
    Row
} from "antd";

import { IMember } from "../../interfaces";
import dayjs from "dayjs";

export const MemberCreate: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const {
        formProps,
        saveButtonProps,
        queryResult,
    } = useForm<IMember>();
    const apiUrl = useApiUrl('books');

    return (
        <>
            <Create
                isLoading={queryResult?.isFetching}
                saveButtonProps={saveButtonProps}
            >
                <Form
                    {...formProps}
                    style={{ marginTop: 30 }}
                    layout="vertical"
                    initialValues={{
                        status: 'active',
                    }}
                >
                    <Row gutter={20}>
                        <Col xs={24} lg={16}>
                            <Row gutter={10}>
                                <Col xs={24} lg={16}>
                                    <Form.Item
                                        label={t("members.fields.studentId")}
                                        name="studentId"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label={t("members.fields.name")}
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label={t("members.fields.dayOfBirth")}
                                        name="dayOfBirth"
                                        getValueProps={(value) => ({
                                            value: value ? dayjs(value) : "",
                                        })}
                                    >
                                        <DatePicker />
                                    </Form.Item>
                                    <Form.Item
                                        label={t("members.fields.status")}
                                        name="status"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Radio.Group>
                                            <Radio value={'active'}>{t("enum.memberStatuses.active")}</Radio>
                                            <Radio value={'blocked'}>
                                                {t("enum.memberStatuses.blocked")}
                                            </Radio>
                                            <Radio value={'expired'}>
                                                {t("enum.memberStatuses.expired")}
                                            </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Create>
        </>
    );
};
