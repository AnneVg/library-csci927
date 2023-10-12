import { Edit, useSelect } from "@refinedev/antd";
import { BaseKey, useApiUrl, useTranslate } from "@refinedev/core";
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

type EditBookProps = {
    drawerProps: DrawerProps;
    formProps: FormProps;
    saveButtonProps: ButtonProps;
    editId?: BaseKey;
};

export const EditBook: React.FC<EditBookProps> = ({
    drawerProps,
    formProps,
    saveButtonProps,
    editId,
}) => {
    const t = useTranslate();
    const apiUrl = useApiUrl('books');
    const breakpoint = Grid.useBreakpoint();

    const { selectProps: categorySelectProps } = useSelect<IBookCategory>({
        resource: "categories",
        optionValue: "id",
        optionLabel: "name"
    });

    return (
        <Drawer
            {...drawerProps}
            width={breakpoint.sm ? "500px" : "100%"}
            zIndex={1001}
        >
            <Edit
                saveButtonProps={saveButtonProps}
                resource="books"
                recordItemId={editId}
                contentProps={{
                    style: {
                        boxShadow: "none",
                    },
                    bodyStyle: {
                        padding: 0,
                    },
                }}
            >
                <Form {...formProps} layout="vertical">
                <Form.Item
                        label={t("books.fields.category")}
                        name="categoryId"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select {...categorySelectProps} />
                    </Form.Item>

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
                        label={t("books.fields.isbn")}
                        name="isbn"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={t("books.fields.author")}
                        name="author"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={t("books.fields.location")}
                        name="location"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={t("books.fields.stock")}
                        name="stock"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <InputNumber
                            formatter={(value) => `${value}`}
                            style={{ width: "150px" }}
                        />
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
                        label={t("books.fields.status")}
                        name="status"
                    >
                        <Radio.Group>
                            <Radio value={'available'}>{t("enum.bookStatuses.available")}</Radio>
                            <Radio value={'outofstock'}>{t("enum.bookStatuses.outofstock")}</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Edit>
        </Drawer>
    );
};
