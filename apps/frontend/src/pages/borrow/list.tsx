import {
    useTranslate,
    IResourceComponentsProps,
    useDelete,
    useNavigation,
} from "@refinedev/core";
import { List, useTable } from "@refinedev/antd";
import {
    EditOutlined,
    CloseCircleOutlined,
    MoreOutlined,
} from "@ant-design/icons";
import { Table, Avatar, Dropdown, Menu, Space, Typography } from "antd";

import { IBorrow} from "../../interfaces";
import styled from "@emotion/styled";
import { BorrowStatus } from "@components/borrowStatus";


export const BorrowList: React.FC<IResourceComponentsProps> = () => {
    const { show, edit } = useNavigation();
    const t = useTranslate();

    const { tableProps } = useTable<IBorrow>({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
    });

    const { mutate: mutateDelete } = useDelete();

    const moreMenu = (id: string) => (
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
                    <EditOutlined
                        style={{
                            color: "#52c41a",
                            fontSize: 17,
                            fontWeight: 500,
                        }}
                    />
                }
                onClick={() => {
                    edit("borrows", id);
                }}
            >
                {t("buttons.edit")}
            </Menu.Item>
            <Menu.Item
                key="delete"
                style={{
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                }}
                icon={
                    <CloseCircleOutlined
                        style={{
                            color: "#EE2A1E",
                            fontSize: 17,
                        }}
                    />
                }
                onClick={() => {
                    mutateDelete({
                        resource: "borrows",
                        id,
                        mutationMode: "optimistic",
                    });
                }}
            >
                {t("buttons.delete")}
            </Menu.Item>
        </Menu>
    );

    return (
        <List>
            <Table
                {...tableProps}
                rowKey="id"
                onRow={(record) => {
                    return {
                        onClick: () => {
                            show("borrows", record.id);
                        },
                    };
                }}
            >
                <Table.Column
                    dataIndex="memberId"
                    title={t("borrows.fields.memberId")}
                />
                <Table.Column
                    dataIndex="bookId"
                    title={t("borrows.fields.bookId")}
                />
                <Table.Column
                    dataIndex="status"
                    title={t("members.fields.status")}
                    render={(value) => {
                        return <BorrowStatus status={value} />;
                    }}
                />
                <Table.Column<IBorrow>
                    fixed="right"
                    title={t("table.actions")}
                    dataIndex="actions"
                    key="actions"
                    render={(_, record) => (
                        <Dropdown
                            overlay={moreMenu(record.id)}
                            trigger={["click"]}
                        >
                            <MoreOutlined
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    fontSize: 24,
                                }}
                            />
                        </Dropdown>
                    )}
                />
            </Table>
        </List>
    );
};
