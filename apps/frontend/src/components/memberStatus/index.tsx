import { useTranslate } from "@refinedev/core";
import { Tag } from "antd";

type MemberStatusProps = {
    status: "active" | "blocked" | "expired";
};

export const MemberStatus: React.FC<MemberStatusProps> = ({ status }) => {
    const t = useTranslate();
    let color;

    switch (status) {
        case "active":
            color = "green";
            break;
        case "blocked":
            color = "red";
            break;
        case "expired":
            color = "orange";
            break;
    }

    return <Tag color={color}>{t(`enum.memberStatuses.${status}`)}</Tag>;
};
