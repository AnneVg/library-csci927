import { useTranslate, BaseKey } from "@refinedev/core";
import { NumberField } from "@refinedev/antd";
import {
    CloseCircleOutlined,
    FormOutlined,
    MoreOutlined,
} from "@ant-design/icons";
import {
    Avatar,
    Card,
    Divider,
    InputNumber,
    Dropdown,
    Menu,
    Typography,
    Image,
} from "antd";

import { IBook, IProduct } from "../../interfaces";

const { Text, Paragraph } = Typography;

type BookItemProps = {
    item: IBook;
    updateStock?: (changedValue: number, clickedBook: IBook) => void;
    editShow: (id?: BaseKey) => void;
};

export const BookItem: React.FC<BookItemProps> = ({
    item,
    updateStock,
    editShow,
}) => {
    const t = useTranslate();

    return (
        <Card
            style={{
                margin: "8px",
                opacity: item.stock <= 0 ? 0.5 : 1,
            }}
            bodyStyle={{ height: "420px" }}
        >
            <div style={{ position: "absolute", top: "10px", right: "5px" }}>
                <Dropdown
                    overlay={
                        <Menu mode="vertical">
                            {updateStock && (
                                <Menu.Item
                                    key="1"
                                    disabled={item.stock <= 0}
                                    style={{
                                        fontWeight: 500,
                                    }}
                                    icon={
                                        <CloseCircleOutlined
                                            style={{
                                                color: "red",
                                            }}
                                        />
                                    }
                                    onClick={() => updateStock(0, item)}
                                >
                                    {t("stores.buttons.outOfStock")}
                                </Menu.Item>
                            )}
                            <Menu.Item
                                key="2"
                                style={{
                                    fontWeight: 500,
                                }}
                                icon={
                                    <FormOutlined
                                        style={{
                                            color: "green",
                                        }}
                                    />
                                }
                                onClick={() => editShow(item.id)}
                            >
                                {t("stores.buttons.edit")}
                            </Menu.Item>
                        </Menu>
                    }
                    trigger={["click"]}
                >
                    <MoreOutlined
                        style={{
                            fontSize: 24,
                        }}
                    />
                </Dropdown>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                }}
            >
                <div style={{ textAlign: "center" }}>
                    <Image
                        width={128}
                        src={`/images/default_book_cover.png`}
                        alt={item.title}
                    />
                </div>
                <Divider />
                <Paragraph
                    ellipsis={{ rows: 2, tooltip: true }}
                    style={{
                        fontSize: "18px",
                        fontWeight: 800,
                        marginBottom: "8px",
                    }}
                >
                    {item.title}
                </Paragraph>
                <Paragraph
                    ellipsis={{ rows: 3, tooltip: true }}
                    style={{ marginBottom: "8px" }}
                >
                    {item.shortDescription}
                </Paragraph>
                <Text
                    className="item-id"
                    style={{
                        fontSize: "12px",
                        color: "#999999",
                    }}
                >
                    {item.isbn}
                </Text>
                {updateStock && (
                    <div id="stock-number">
                        <InputNumber
                            size="large"
                            keyboard
                            min={0}
                            value={item.stock || 0}
                            onChange={(value: number | null) =>
                                updateStock(value ?? 0, item)
                            }
                            style={{ width: "100%" }}
                        />
                    </div>
                )}
            </div>
        </Card>
    );
};
