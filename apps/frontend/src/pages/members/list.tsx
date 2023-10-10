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

import { IMember } from "../../interfaces";
import { MemberStatus } from "../../components";
import styled from "@emotion/styled";

const StyledAvatar = styled(Avatar)`
  width: 46px;
  height: 46px;
  font-size: 18px;
  display: flex !important;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  .ant-avatar-string {
    position: absolute;
    left: 50%;
    transform-origin: 0 center;
  }
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  .avatar-anonymous {
    width: 46px !important;
    height: 46px !important;
  }
`;

export const MemberList: React.FC<IResourceComponentsProps> = () => {
    const { show, edit } = useNavigation();
    const t = useTranslate();

    const { tableProps } = useTable<IMember>({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
    });

    const transformShortName = (name: string) => {
        let shortName = '';
        let nameArr = name.split(' ');
        if (nameArr.length > 1) {
          nameArr = [nameArr[0], nameArr[nameArr.length - 1]];
        }
        shortName = nameArr.reduce((rs, name) => {
          return (rs += name.charAt(0).toUpperCase());
        }, '');
        return shortName;
      };

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
                    edit("members", id);
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
                        resource: "members",
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
                            show("members", record.id);
                        },
                    };
                }}
            >
                <Table.Column
                    key="name"
                    title={t("members.fields.name")}
                    render={(record) => (
                        <Space>
                            <StyledAvatar size={74} src={record.avatar?.[0]?.url} >
                                {transformShortName(record.name)}
                            </StyledAvatar>
                            <Typography.Text style={{ wordBreak: "inherit" }}>
                                {record.name} {record.surname}
                            </Typography.Text>
                        </Space>
                    )}
                />
                <Table.Column
                    dataIndex="studentId"
                    title={t("members.fields.studentId")}
                />
                <Table.Column
                    dataIndex="status"
                    title={t("members.fields.status")}
                    render={(value) => {
                        return <MemberStatus status={value} />;
                    }}
                />
                <Table.Column<IMember>
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
