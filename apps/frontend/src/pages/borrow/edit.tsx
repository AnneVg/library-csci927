import {
    Edit,
    useForm
} from "@refinedev/antd";
import {
    IResourceComponentsProps,
    useApiUrl,
    useTranslate,
} from "@refinedev/core";
import {
    Col,
    Form,
    Input,
    Row,
    Radio
} from "antd";

import { IMember } from "../../interfaces";


export const BorrowEdit: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const {
        formProps,
        saveButtonProps,
        queryResult,
    } = useForm<IMember>();
    const memberData = queryResult?.data?.data;
    const apiUrl = useApiUrl('books');

    return (
        <>
            <Edit
                isLoading={queryResult?.isFetching}
                saveButtonProps={saveButtonProps}
            >
                <Form
                    {...formProps}
                    style={{ marginTop: 30 }}
                    layout="vertical"
                    initialValues={{
                        ...formProps.initialValues,
                    }}
                >
                    <Row gutter={20}>
                        <Col xs={24} lg={16}>
                            <Row gutter={10}>
                                <Col xs={24} lg={16}>
                                    <Form.Item
                                        label={t("borrows.fields.memberId")}
                                        name="memberId"
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
                                        label={t("borrows.fields.status")}
                                        name="status"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Radio.Group>
                                            <Radio value={'onloan'}>{t("enum.borrowStatuses.onloan")}</Radio>
                                            <Radio value={'returned'}>
                                                {t("enum.borrowStatuses.returned")}
                                            </Radio>
                                            <Radio value={'overdue'}>
                                                {t("enum.borrowStatuses.overdue")}
                                            </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Edit>
        </>
    );
};
