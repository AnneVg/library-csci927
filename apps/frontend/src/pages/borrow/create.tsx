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

import { IBorrow } from "../../interfaces";
import dayjs from "dayjs";

export const BorrowCreate: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const {
        formProps,
        saveButtonProps,
        queryResult,
    } = useForm<IBorrow>();
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
                        status: 'onloan',
                    }}
                >
                    <Row gutter={20}>
                        <Col xs={24} lg={16}>
                            <Row gutter={10}>
                                <Col xs={24} lg={16}>
                                    <Form.Item
                                        label={t("borrows.fields.studentId")}
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
                                        label={t("borrows.fields.bookId")}
                                        name="bookId"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label={t("borrows.field.duedate")}
                                        name="dueDate"
                                        getValueProps={(value) => ({
                                            value: value ? dayjs(value) : "",
                                        })}
                                    >
                                        <DatePicker />
                                    </Form.Item>
                                    <Form.Item
                                        label={t("borrows.fields.status")}
                                        name="status"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Radio.Group>
                                            <Radio disabled={true} value={'onloan'} >{t("enum.borrowStatuses.onloan")} </Radio>
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
