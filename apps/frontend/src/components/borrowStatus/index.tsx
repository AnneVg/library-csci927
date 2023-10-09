import { useTranslate } from "@refinedev/core";
import { Tag } from "antd";

type BorrowStatusProps = {
    status: "onloan" | "returned" | "overdue";
};

export const BorrowStatus: React.FC<BorrowStatusProps> = ({ status }) => {
    const t = useTranslate();
    let color;

    switch (status) {
        case "onloan":
            color = "green";
            break;
        case "overdue":
            color = "red";
            break;
        case "returned":
            color = "blue";
            break;
    }

    return <Tag color={color}>{t(`enum.borrowStatuses.${status}`)}</Tag>;
};
