import { useTranslate } from "@refinedev/core";
import { Tag } from "antd";

type BookStatusProps = {
    status: "available" | "outofstock";
};

export const BookStatus: React.FC<BookStatusProps> = ({ status }) => {
    const t = useTranslate();
    let color;

    switch (status) {
        case "available":
            color = "green";
            break;
        case "outofstock":
            color = "red";
            break;
    }

    return <Tag color={color}>{t(`enum.bookStatuses.${status}`)}</Tag>;
};
