import {
    CloseCircleOutlined,
    EditOutlined,
    MoreOutlined,
    RollbackOutlined,
    SnippetsOutlined,
} from "@ant-design/icons";
import { List, useTable, DateField } from "@refinedev/antd";
import {
    IResourceComponentsProps,
    useDelete,
    useNavigation,
    useTranslate,
    useUpdate,
} from "@refinedev/core";
import { Dropdown, Menu, Table } from "antd";

import { IBorrow } from "../../interfaces";
import { BorrowStatus } from "../../components/borrowStatus";


export const BorrowList: React.FC<IResourceComponentsProps> = () => {
    const { show, edit } = useNavigation();
    const t = useTranslate();

    const { tableProps } = useTable<IBorrow>({
        // initialSorter: [
        //     {
        //         field: "id",
        //         order: "desc",
        //     },
        // ],
    });

    const { mutate: mutateUpdate } = useUpdate();

    const moreMenu = (id: string) => (
        <Menu
            mode="vertical"
            onClick={({ domEvent }) => domEvent.stopPropagation()}
        >

            <Menu.Item
                key="return"
                style={{
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                }}
                icon={
                    <RollbackOutlined
                        style={{
                            color: "#508fee",
                            fontSize: 17,
                        }}
                    />
                }
                onClick={() => {
                    mutateUpdate({
                        resource: "borrows",
                        values: {
                            status: 'returned',
                        },
                        id,
                        mutationMode: "optimistic",
                    });
                }}
            >
                {t("buttons.return")}
            </Menu.Item>

            <Menu.Item
                key="archive"
                style={{
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                }}
                icon={
                    <SnippetsOutlined 
                        style={{
                            color: "#ef982d",
                            fontSize: 17,
                        }}
                    />
                }
                onClick={() => {
                    mutateUpdate({
                        resource: "borrows",
                        values: {
                            status: 'archived',
                        },
                        id,
                        mutationMode: "optimistic",
                    });
                }}
            >
                {t("buttons.archive")}
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
                    dataIndex={["member", "name"]}
                    title={t("borrows.fields.studentName")}
                />
                <Table.Column
                    dataIndex={["book", "title"]}
                    title={t("borrows.fields.bookTitle")}
                />
                <Table.Column
                    dataIndex="status"
                    title={t("borrows.fields.status")}
                    render={(value) => {
                        return <BorrowStatus status={value} />;
                    }}
                />
                <Table.Column
                    dataIndex="duedate"
                    title={t("borrows.fields.duedate")}
                    render={(value) => <DateField value={value} format="LLL" />}

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
