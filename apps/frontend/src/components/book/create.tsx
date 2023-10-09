import { Create, useSelect } from "@refinedev/antd";
import { useApiUrl, useTranslate } from "@refinedev/core";
import {
    ButtonProps,
    Drawer,
    DrawerProps,
    Form,
    FormProps,
    Grid,
    Input,
    InputNumber,
    Radio,
    Select,
    Typography
} from "antd";

import { IBookCategory } from "../../interfaces";

const { Text } = Typography;

type CreateBookProps = {
    drawerProps: DrawerProps;
    formProps: FormProps;
    saveButtonProps: ButtonProps;
};

export const CreateBook: React.FC<CreateBookProps> = ({
    drawerProps,
    formProps,
    saveButtonProps,
}) => {
    const t = useTranslate();
    const apiUrl = useApiUrl('books');
    const breakpoint = Grid.useBreakpoint();

    const { selectProps: categorySelectProps } = useSelect<IBookCategory>({
        resource: "categories",
    });

    return (
        <Drawer
            {...drawerProps}
            width={breakpoint.sm ? "500px" : "100%"}
            zIndex={1001}
        >
            <Create
                resource="book"
                saveButtonProps={saveButtonProps}
                goBack={false}
                contentProps={{
                    style: {
                        boxShadow: "none",
                    },
                    bodyStyle: {
                        padding: 0,
                    },
                }}
            >
                <Form
                    {...formProps}
                    layout="vertical"
                    initialValues={{
                    }}
                >
                    <Form.Item
                        label={t("books.fields.title")}
                        name="title"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("books.fields.description")}
                        name="shortDescription"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input.TextArea rows={6} />
                    </Form.Item>
                    <Form.Item
                        label={t("books.fields.stock")}
                        name="stock"
                        rules={[
                            {
                                required: true,
                                type: "number",
                            },
                        ]}
                    >
                        <InputNumber
                            formatter={(value) => `${value}`}
                            style={{ width: "150px" }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={t("books.fields.category")}
                        name={["name", "id"]}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select {...categorySelectProps} />
                    </Form.Item>
                    <Form.Item
                        label={t("books.fields.status")}
                        name="status"
                    >
                        <Radio.Group>
                            <Radio value={'available'}>{t("enum.bookStatuses.available")}</Radio>
                            <Radio value={'outofstock'}>{t("enum.bookStatuses.outofstock")}</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Create>
        </Drawer>
    );
};
