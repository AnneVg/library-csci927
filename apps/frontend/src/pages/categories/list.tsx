import { IResourceComponentsProps, useTranslate } from "@refinedev/core";

import {
    List,
    SaveButton,
    useEditableTable
} from "@refinedev/antd";

import { FormOutlined, MoreOutlined } from "@ant-design/icons";
import {
    Button,
    Dropdown,
    Form,
    Input,
    Menu,
    Space,
    Table
} from "antd";

import { IBookCategory } from "../../interfaces";

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
    const {
        tableProps,
        formProps,
        isEditing,
        saveButtonProps,
        cancelButtonProps,
        setId: setEditId,
    } = useEditableTable<IBookCategory>({
        initialSorter: [
            {
                field: "name",
                order: "asc",
            },
        ],
    });

    const t = useTranslate();

    const moreMenu = (record: IBookCategory) => (
        <Menu
            mode="vertical"
            onClick={({ domEvent }) => domEvent.stopPropagation()}
        >
            <Menu.Item
                key="edit"
                style={{
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                }}
                icon={
                    <FormOutlined
                        style={{
                            color: "#52c41a",
                            fontSize: 17,
                            fontWeight: 500,
                        }}
                    />
                }
                onClick={() => {
                    setEditId?.(record.id);
                }}
            >
                {t("buttons.edit")}
            </Menu.Item>
        </Menu>
    );

    return (
        <List>
            <Form {...formProps}>
                <Table
                    {...tableProps}
                    rowKey="id"
                    onRow={(record) => ({
                        // eslint-disable-next-line
                        onClick: (event: any) => {
                            if (event.target.nodeName === "TD") {
                                setEditId && setEditId(record.id);
                            }
                        },
                    })}
                >
                    <Table.Column
                        key="name"
                        dataIndex="name"
                        title={t("categories.fields.name")}
                        render={(value, data: IBookCategory) => {
                            if (isEditing(data.id)) {
                                return (
                                    <Form.Item
                                        name="name"
                                        style={{ margin: 0 }}
                                    >
                                        <Input />
                                    </Form.Item>
                                );
                            }
                            return value;
                        }}
                    />
                    <Table.Column<IBookCategory>
                        title={t("table.actions")}
                        dataIndex="actions"
                        key="actions"
                        align="center"
                        render={(_text, record) => {
                            if (isEditing(record.id)) {
                                return (
                                    <Space>
                                        <SaveButton
                                            {...saveButtonProps}
                                            size="small"
                                        />
                                        <Button
                                            {...cancelButtonProps}
                                            size="small"
                                        >
                                            {t("buttons.cancel")}
                                        </Button>
                                    </Space>
                                );
                            }
                            return (
                                <Dropdown
                                    overlay={moreMenu(record)}
                                    trigger={["click"]}
                                >
                                    <MoreOutlined
                                        onClick={(e) => e.stopPropagation()}
                                        style={{
                                            fontSize: 24,
                                        }}
                                    />
                                </Dropdown>
                            );
                        }}
                    />
                </Table>
            </Form>
        </List>
    );
};
